using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Common;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.AzureFunctions.Annotations;
using Swashbuckle.AspNetCore.AzureFunctions.Filters;

namespace SignupCenter {
	public static class LeadsApi {
		/// <summary>
		///     API for customer leads
		/// </summary>
		/// <param name="req"></param>
		/// <param name="log"></param>
		/// <returns></returns>
		[FunctionName(nameof(Run))]
		[SwaggerOperation(nameof(Run), Tags = new[] {"LeadGen"})]
		[SwaggerResponse(type: typeof(CustomerLead), statusCode: 200)]
		[SupportedMediaType("application/json")]
		[SwaggerOperationFilter(typeof(AppendHttpMethodToOperationIdFilter))]
		[OptionalQueryParameter(BasicQueryStrings.AuthToken, typeof(string))]
		public static async Task<HttpResponseMessage> Run(
			ExecutionContext context,
			[HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "leadGen")]
			[RequestBodyType(typeof(CustomerLead), "Rule to create, update, or delete appointment.")]
			HttpRequestMessage req, ILogger log) {
			App.Startup(context);
			log.LogInformation($"HttpTrigger : {nameof(Run)} [{req.Method}]");

			CustomerLead model = null;
			if (req.Method == HttpMethod.Post || req.Method == HttpMethod.Put) {
				try {
					var content = await req.Content.ReadAsStringAsync();

					if (!string.IsNullOrEmpty(content)) model = JsonConvert.DeserializeObject<CustomerLead>(content);
				} catch (Exception) {
					// ignore
				}

				if (model == null) {
					log.LogInformation("Bad request: Model should not be null (or failed to deserialize model)");
					return new HttpResponseMessage(HttpStatusCode.BadRequest);
				}
			}

			model.PartitionKey = DateTime.UtcNow.ToString("yyyy-MM");
			model.RowKey = Guid.NewGuid().ToString("D");
			await AzureTableHelper<CustomerLead>.SetAsync(model);

			return App.JsonOkResponse(model);
		}
	}
}
