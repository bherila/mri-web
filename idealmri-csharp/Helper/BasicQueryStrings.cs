using System;
using System.Linq;
using System.Net.Http;
using Microsoft.AspNetCore.WebUtilities;

namespace SignupCenter {
	public static class BasicQueryStrings {
		public const string AuthToken = "authToken";
		public const string LocationId = "locationId";
		public const string Search = "search";
		public const string WithContrast = "withContrast";
		public const string Length = "length";

		/// <summary>
		///     Parse a GUID value from the query string. Returns Guid.Empty if query string key is not set.
		/// </summary>
		/// <param name="req">Request to parse from</param>
		/// <param name="key">Query string key</param>
		/// <returns></returns>
		public static Guid ParseQueryGuid(this HttpRequestMessage req, string key) {
			var guidValue = Guid.Empty;
			try {
				var queryDictionary = QueryHelpers.ParseQuery(req.RequestUri.Query);
				if (queryDictionary.TryGetValue(key, out var locationIds))
					Guid.TryParse(locationIds.First(), out guidValue);
			} catch { }

			return guidValue;
		}

		/// <summary>
		///     Parse a boolean value from the query string. Returns false if query string key is not set.
		/// </summary>
		/// <param name="req">Request to parse from</param>
		/// <param name="key">Query string key</param>
		/// <returns></returns>
		public static bool ParseQueryBool(this HttpRequestMessage req, string key) {
			var boolValue = false;
			try {
				var queryDictionary = QueryHelpers.ParseQuery(req.RequestUri.Query);
				if (queryDictionary.TryGetValue(key, out var locationIds))
					bool.TryParse(locationIds.First(), out boolValue);
			} catch { }

			return boolValue;
		}

		/// <summary>
		///     Parse a int32 value from the query string. Returns 0 if query string key is not set.
		/// </summary>
		/// <param name="req">Request to parse from</param>
		/// <param name="key">Query string key</param>
		/// <returns></returns>
		public static int ParseQueryInt(this HttpRequestMessage req, string key) {
			var intValue = 0;
			try {
				var queryDictionary = QueryHelpers.ParseQuery(req.RequestUri.Query);
				if (queryDictionary.TryGetValue(key, out var locationIds))
					int.TryParse(locationIds.First(), out intValue);
			} catch { }

			return intValue;
		}

		/// <summary>
		///     Parse a string value from the query string.
		/// </summary>
		/// <param name="req">Request to parse from</param>
		/// <param name="key">Query string key</param>
		/// <returns></returns>
		public static string ParseQueryString(this HttpRequestMessage req, string key) {
			try {
				var queryDictionary = QueryHelpers.ParseQuery(req.RequestUri.Query);
				if (queryDictionary.TryGetValue(key, out var res)) return res.FirstOrDefault();
			} catch { }

			return string.Empty;
		}
	}
}
