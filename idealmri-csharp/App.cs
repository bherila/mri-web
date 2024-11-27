using System;
using System.Net;
using System.Net.Http;
using Common;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SignupCenter {
	public static class App {
		private static bool IsStarted;
		private static readonly object _syncLock = new object();

		public static HttpResponseMessage JsonOkResponse<T>(T value) {
			var content = new StringContent(JsonConvert.SerializeObject(value));
			return new HttpResponseMessage(HttpStatusCode.OK)
				{Content = content};
		}

		/// <summary>
		///     Sets up the app before running any other code
		/// </summary>
		public static void Startup(ExecutionContext context) {
			if (!IsStarted)
				lock (_syncLock) {
					if (!IsStarted) {
						IsStarted = true;
						var config = new ConfigurationBuilder()
							.SetBasePath(context.FunctionAppDirectory)
							.AddJsonFile("local.settings.json", true, true)
							.AddEnvironmentVariables()
							.Build();
						try {
							var cstr = config["PersistentStorage"] ?? "DefaultEndpointsProtocol=https;AccountName=mrischedba06;AccountKey=T3uvollYnKL0Rlymkj1CkHbqcZKEg0lsXW29ecy4O1V4MWWNWDjtbp9fS1CXqUFPxSbx5/g3tGAgUQUGdV2WOw==;EndpointSuffix=core.windows.net";
							AzureConfiguration.StorageAccount = CloudStorageAccount.Parse(cstr);
						} catch (Exception ex) {
							throw new Exception("Failed to configure Azure Tables Connection, " + ex);
						}

						JsonConvert.DefaultSettings = () => new JsonSerializerSettings {
							ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
							ContractResolver = new CamelCasePropertyNamesContractResolver()
						};
					}
				}
		}
	}
}
