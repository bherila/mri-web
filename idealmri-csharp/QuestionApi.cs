using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Common;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.AzureFunctions.Annotations;

namespace SignupCenter {
	public static class QuestionApi {
		[FunctionName("QuestionGet")]
		[SwaggerOperation("GetQuestions", Tags = new[] {"Question"})]
		[SwaggerResponse(type: typeof(List<SurveyQuestion>), statusCode: 200)]
		public static HttpResponseMessage GetQuestions(
			[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "question")]
			HttpRequestMessage req, ILogger log, ExecutionContext context) {
			App.Startup(context);
			log.LogInformation($"Trigger : Question [{req.Method}]");
			var list = AzureTableHelper<SurveyQuestion>.LoadEverything();
			return new HttpResponseMessage(HttpStatusCode.OK)
				{Content = new StringContent(JsonConvert.SerializeObject(list))};
		}

		[FunctionName("QuestionPost")]
		[SwaggerOperation("GetQuestions", Tags = new[] {"PostQuestion"})]
		[SwaggerResponse(type: typeof(TableResult), statusCode: 200)]
		public static async Task<HttpResponseMessage> PostQuestion(
			[HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "question")]
			[RequestBodyType(typeof(SurveyQuestion), "Survey question")]
			SurveyQuestion req, ILogger log, ExecutionContext context) {
			App.Startup(context);
			log.LogInformation($"Trigger : Question [POST] : {JsonConvert.SerializeObject(req)}");
			var tableOperationResult = AzureTableHelper<SurveyQuestion>.SetAsync(req);
			return new HttpResponseMessage(HttpStatusCode.OK)
				{Content = new StringContent(JsonConvert.SerializeObject(await tableOperationResult))};
		}
	}
}
