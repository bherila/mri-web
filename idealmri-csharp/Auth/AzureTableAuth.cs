using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Threading.Tasks;
using Common;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;
using Nito.AsyncEx;

namespace SignupCenter {
	/// <summary>
	/// Lightweight API which authenticates a user against Azure Table Storage.
	/// </summary>
	public static class AzureTableAuth {

		/// <summary>
		/// User entity for use with AuthenticationHelper
		/// </summary>
		public class User : TableEntityExt {
			[JsonIgnore, IgnoreProperty] public override string TableName => "User";
			public string ApiKey { get; set; }
			public Guid ImmutableId { get; set; }
			public string ReferenceRowKey { get; set; }
		}

		public static User CreateUser(string userName, string userKeyPlaintext) {
			var user = new User() {
				PartitionKey = "User",
				RowKey = userName,
			};
			user.ImmutableId = Guid.NewGuid();
			user.ApiKey = userKeyPlaintext.Sha2(user.ImmutableId);
			AzureTableHelper<User>.Set(user);
			return user;
		}

		/// <summary>
		/// Changes a user's login name (email) while keeping the same unique ID.
		/// </summary>
		/// <param name="userName"></param>
		/// <param name="newUserName"></param>
		/// <returns></returns>
		public static async Task<User> RenameUser(string userName, string newUserName) {
			EnsureUserDoesNotExist(newUserName);
			var oldUser = AzureTableHelper<User>.Get("User", userName);
			var userRef = AzureTableHelper<User>.Get("UserRef", oldUser.ImmutableId.ToString("D"));

			var newUser = new User() {
				PartitionKey = "User",
				RowKey = userName,
				ImmutableId = oldUser.ImmutableId,
				ApiKey = oldUser.ApiKey
			};

			var tbl = oldUser.GetCloudTable();

			var insertOp = TableOperation.Insert(newUser);
			await tbl.ExecuteAsync(insertOp);

			var deleteOp = TableOperation.Delete(oldUser);
			await tbl.ExecuteAsync(deleteOp);

			if (userRef != null) {
				userRef.ApiKey = newUserName;
				var updateOp = TableOperation.Replace(userRef);
				await tbl.ExecuteAsync(updateOp);
			}

			return newUser;
		}

		private static void EnsureUserDoesNotExist(string newUserName) {
			var userEntityCheck = AzureTableHelper<User>.Get("User", newUserName);
			if (userEntityCheck != null)
				throw new DuplicateNameException($"User {newUserName} already exists");
		}

		public static User GetUserBySessionId(Guid sessionId) {
			var userEntity = AzureTableHelper<User>.Get("UserRef", sessionId.ToString("D"));
			if (userEntity == null) {
				throw new ValidationException("User not found");
			}

			if (userEntity.Timestamp < DateTimeOffset.UtcNow.AddDays(-7)) {
				throw new ValidationException("Session expired");
			}

			return GetUserByName(userEntity.ReferenceRowKey);
		}

		public static User GetUserByName(string userName) {
			var userEntity = AzureTableHelper<User>.Get("User", userName);
			if (userEntity == null) {
				throw new ValidationException($"User {userName} not found");
			}

			return userEntity;
		}

		public static bool ValidateUser(this User userEntity, string userKeyPlaintext) {

			// first time user with no password, or temporary password
			if (string.IsNullOrEmpty(userEntity.ApiKey) || userEntity.ApiKey == userKeyPlaintext) {
				if (userEntity.ImmutableId == default(Guid))
					userEntity.ImmutableId = Guid.NewGuid();
				userEntity.ApiKey = userKeyPlaintext.Sha2(userEntity.ImmutableId);
				AzureTableHelper<User>.Set(userEntity);

				return true;
			}

			return userEntity.ApiKey == userKeyPlaintext.Sha2(userEntity.ImmutableId);
		}

		public static Guid BeginSession(this User user) {
			var id = Guid.NewGuid();
			var userRef = new User() {
				PartitionKey = "UserRef",
				RowKey = id.ToString("D"),
				ReferenceRowKey = user.RowKey
			};
			AzureTableHelper<User>.Set(userRef);
			user.ApiKey = id.ToString("D");
			return id;
		}

		public static bool ResetPassword(this User userEntity, string userKeyPlaintext) {
			if (userEntity.ImmutableId == default(Guid))
				userEntity.ImmutableId = Guid.NewGuid();
			//	CreateUniqueIdForUser(userEntity);
			var hash = userKeyPlaintext.Sha2(userEntity.ImmutableId);
			userEntity.ApiKey = hash;
			AzureTableHelper<User>.Set(userEntity);
			return true;
		}
	}
}