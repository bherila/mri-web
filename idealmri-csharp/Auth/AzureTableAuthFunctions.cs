using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SignupCenter;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.AzureFunctions.Annotations;

namespace FunctionsCodeGenerator {
	public static class AzureTableAuthFunctions {
		/// <summary>
		///     API for customer leads
		/// </summary>
		/// <param name="req"></param>
		/// <param name="log"></param>
		/// <returns></returns>
		[FunctionName(nameof(Auth))]
		[SwaggerOperation(nameof(Auth), Tags = new[] {"Auth"})]
		[SwaggerResponse(type: typeof(AzureTableAuth.User), statusCode: 200)]
		[SupportedMediaType("application/json")]
		[OptionalQueryParameter(BasicQueryStrings.AuthToken, typeof(string))]
		public static async Task<HttpResponseMessage> Auth(
			[HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "auth")]
			[RequestBodyType(typeof(AzureTableAuth.User), "Rule to authenticate a user")]
			HttpRequestMessage req, ILogger log, ExecutionContext context) {
			App.Startup(context);
			log.LogInformation($"HttpTrigger : {nameof(Auth)} [{req.Method}]");

			AzureTableAuth.User model = null;
			if (req.Method == HttpMethod.Post) {
				try {
					var content = await req.Content.ReadAsStringAsync();

					if (!string.IsNullOrEmpty(content))
						model = JsonConvert.DeserializeObject<AzureTableAuth.User>(content);

					if (model == null) {
						var er = "Bad request: Model should not be null (or failed to deserialize model)";
						log.LogInformation(er);
						return req.CreateErrorResponse(HttpStatusCode.BadRequest, er);
					}

					var user = AzureTableAuth.GetUserByName(model.PartitionKey);
					if (user != null)
						if (user.ValidateUser(model.ApiKey)) {
							user.BeginSession();
							return App.JsonOkResponse(user);
						}
				} catch (Exception ex) {
					// ignore
					return req.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
				}

			}

			return new HttpResponseMessage(HttpStatusCode.BadRequest);
		}
	}
}
