using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Http;
using Common;
using EZ.Base;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.AzureFunctions.Annotations;
using Swashbuckle.AspNetCore.AzureFunctions.Filters;

namespace SignupCenter {
	public static class ResourceApi {
		/// <summary>
		///     Manages the Locations available.
		/// </summary>
		/// <param name="req"></param>
		/// <param name="log"></param>
		/// <param name="context"></param>
		/// <returns></returns>
		[FunctionName(nameof(Locations))]
		[SwaggerOperation(nameof(Locations), Tags = new[] {"Resource"})]
		[SwaggerResponse(type: typeof(List<Location>), statusCode: 200)]
		[SupportedMediaType("application/json")]
		[OptionalQueryParameter(BasicQueryStrings.LocationId, typeof(string))]
		[OptionalQueryParameter(BasicQueryStrings.AuthToken, typeof(string))]
		[SwaggerOperationFilter(typeof(AppendHttpMethodToOperationIdFilter))]
		[SwaggerOperationFilter(typeof(RemoveBodyParameterFromGetFilter))]
		public static HttpResponseMessage Locations(
			[HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "locations")]
			HttpRequestMessage req, ILogger log, ExecutionContext context) {
			App.Startup(context);
			log.LogInformation($"HttpTrigger : {nameof(Locations)} [{req.Method}]");

			return Executor.ExecApiAsync(async () => {
				if (req.Method == HttpMethod.Get) {
					var locationId = req.ParseQueryString(BasicQueryStrings.LocationId);
					var allLocations = Location.GetLocations(locationId);
					return (allLocations);
				}

				if (req.Method == HttpMethod.Post) {
					//TODO: Validate admin session
					var location = JsonConvert.DeserializeObject<Location>(await req.Content.ReadAsStringAsync());
					location.SaveLocation();
					return (new List<Location> {location});
				}

				throw new RequestNotHandledException();
			}).ToJsonHttpResponseMessage();
		}


		/// <summary>
		///     Manages the rules which generate time slots.
		/// </summary>
		/// <param name="req"></param>
		/// <param name="log"></param>
		/// <returns></returns>
		[FunctionName(nameof(AvailabilityRules))]
		[SwaggerOperation(nameof(AvailabilityRules), Tags = new[] {"Resource"})]
		[SwaggerResponse(type: typeof(ApiResult<List<AvailabilityRule>>), statusCode: 200)]
		[SupportedMediaType("application/json")]
		[OptionalQueryParameter(BasicQueryStrings.AuthToken, typeof(string))]
		[SwaggerOperationFilter(typeof(AppendHttpMethodToOperationIdFilter))]
		[SwaggerOperationFilter(typeof(RemoveBodyParameterFromGetFilter))]
		public static HttpResponseMessage AvailabilityRules(
			[HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", "delete", "put", Route = "timeslot/rules")]
			[RequestBodyType(typeof(AvailabilityRule), "Rule to create, update, or delete.")]
			HttpRequestMessage req, ILogger log, ExecutionContext context) {

			App.Startup(context);

			log.LogInformation($"HttpTrigger : {nameof(AvailabilityRules)} [{req.Method}]");
			return Executor.ExecApiAsync(async () => {
				var authToken = req.ParseQueryString(BasicQueryStrings.AuthToken);
				var rules = Schedule.RulesFromStorage();

				//TODO: Validate auth token

				if (req.Method == HttpMethod.Get) return rules;

				if (req.Method == HttpMethod.Post) {
					var newPriority = rules.Count == 0 ? 0 : rules.Max(x => x.Priority) + 100;
					var ruleObj = JsonConvert.DeserializeObject<AvailabilityRule>(await req.Content.ReadAsStringAsync());

					ResourceApi.ValidateLocationId(ruleObj.PartitionKey);

					ruleObj.RowKey = DateTime.UtcNow.ToString("s");
					ruleObj.Priority = newPriority;
					await AzureTableHelper<AvailabilityRule>.SetAsync(ruleObj);
					rules.Add(ruleObj);
					return rules;
				}

				if (req.Method == HttpMethod.Delete) {
					var ruleObj =
						JsonConvert.DeserializeObject<AvailabilityRule>(await req.Content.ReadAsStringAsync());
					if (ruleObj != null) {
						await AzureTableHelper<AvailabilityRule>.DeleteAsync(ruleObj);
						rules.RemoveAll(x => x.PartitionKey == ruleObj.PartitionKey && x.RowKey == ruleObj.RowKey);
						return rules;
					}
				}

				throw new RequestNotHandledException();
			}).ToJsonHttpResponseMessage();
		}

		public static bool ValidateLocationId(string locationId) {
			var locations = Location.GetLocations().Select(x => x.PartitionKey).ToList();
			if (!locations.Contains(locationId))
				throw new ValidationException("PartitionKey must correspond to a valid location ID");
			return true;
		}
	}
}
