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
using MRI;
using Newtonsoft.Json;
using Nito.AsyncEx;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.AzureFunctions.Annotations;
using Swashbuckle.AspNetCore.AzureFunctions.Filters;

namespace SignupCenter {
	public static class ScheduleApi {
		/// <summary>
		///     Manages the time slots available.
		/// </summary>
		/// <param name="req"></param>
		/// <param name="log"></param>
		/// <returns></returns>
		[FunctionName(nameof(TimeSlots))]
		[SwaggerOperation(nameof(TimeSlots), Tags = new[] {"Schedule"})]
		[SwaggerResponse(type: typeof(ApiResult<List<SlotAvailabilityDate>>), statusCode: 200)]
		[SupportedMediaType("application/json")]
		[OptionalQueryParameter(BasicQueryStrings.AuthToken, typeof(string))]
		[OptionalQueryParameter(BasicQueryStrings.WithContrast, typeof(bool))]
		[OptionalQueryParameter(BasicQueryStrings.Length, typeof(int))]
		[OptionalQueryParameter(BasicQueryStrings.LocationId, typeof(string))]
		[SwaggerOperationFilter(typeof(AppendHttpMethodToOperationIdFilter))]
		[SwaggerOperationFilter(typeof(RemoveBodyParameterFromGetFilter))]
		public static HttpResponseMessage TimeSlots(
			[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "timeslots")]
			HttpRequestMessage req, ILogger log, ExecutionContext context) {
			App.Startup(context);
			log.LogInformation($"HttpTrigger : {nameof(TimeSlots)} [{req.Method}]");

			var contrast = req.ParseQueryBool(BasicQueryStrings.WithContrast);
			var locationId = req.ParseQueryString(BasicQueryStrings.LocationId);
			var length = req.ParseQueryInt(BasicQueryStrings.Length);
			var authToken = req.ParseQueryString(BasicQueryStrings.AuthToken);

			return Executor.ExecApi(() => {
				var slots = GetAvailability(length);

				var tree = Schedule.MakeDateTree(slots).ToList();
				if (string.IsNullOrEmpty(authToken))
					foreach (var date in tree)
					foreach (var time in date.Times) {
						var origAppt = time.LinkedAppointment;
						if (origAppt != null) {
							var anonAppt = new Appointment {
								PartitionKey = origAppt.PartitionKey,
								RowKey = origAppt.RowKey,
								ResourceId = origAppt.ResourceId,
								ServiceLength = origAppt.ServiceLength,
							};
							anonAppt.UpdateStartEnd();
							time.LinkedAppointment = anonAppt;
						}
					}

				return tree;
			}).ToJsonHttpResponseMessage();
		}

		private static List<SignupSlot> GetAvailability(int length) {
			var appointments = Appointment.GetAll();
			var rules = Schedule.RulesFromStorage();
			var slots = Schedule.GenerateSlots()
				.ApplyResourceRules(rules)
				.ApplyAppointments(appointments)
				.ApplyAppointmentLength(length)
				.ToList();
			return slots;
		}

		private static bool TryParseAppointment(string content, ILogger logger, out Appointment appt) {
			try {
				if (!string.IsNullOrEmpty(content)) {
					appt = JsonConvert.DeserializeObject<Appointment>(content);
					if (appt != null)
						return true;
				} else {
					logger.LogWarning($"Warning thrown in {nameof(TryParseAppointment)}: content is null or empty");
				}
			} catch (Exception ex) {
				// ignore
				logger.LogWarning($"Exception thrown in {nameof(TryParseAppointment)}: {ex.Message}");
			}

			throw new ValidationException(
				"Bad request: Model should not be null (or failed to deserialize model)");
		}

		/// <summary>
		///     Manages the rules which generate time slots.
		/// </summary>
		/// <param name="req"></param>
		/// <param name="log"></param>
		/// <returns></returns>
		[FunctionName(nameof(AppointmentHandler))]
		[SwaggerOperation(nameof(AppointmentHandler), Tags = new[] {"Schedule"})]
		[SwaggerResponse(type: typeof(ApiResult<List<Appointment>>), statusCode: 200)]
		[SupportedMediaType("application/json")]
		[SwaggerOperationFilter(typeof(AppendHttpMethodToOperationIdFilter))]
		[SwaggerOperationFilter(typeof(RemoveBodyParameterFromGetFilter))]
		[OptionalQueryParameter(BasicQueryStrings.AuthToken, typeof(string))]
		[OptionalQueryParameter(BasicQueryStrings.WithContrast, typeof(bool))]
		[OptionalQueryParameter(BasicQueryStrings.LocationId, typeof(string))]
		[OptionalQueryParameter(BasicQueryStrings.Search, typeof(string))]
		public static HttpResponseMessage AppointmentHandler(
			[HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", "delete", "put", Route = "appointment")]
			[RequestBodyType(typeof(Appointment), "Rule to create, update, or delete appointment.")]
			HttpRequestMessage req, ILogger log, ExecutionContext context) {
			App.Startup(context);
			log.LogInformation($"HttpTrigger : {nameof(AppointmentHandler)} [{req.Method}]");

			var contrast = req.ParseQueryBool(BasicQueryStrings.WithContrast);
			var locationId = req.ParseQueryString(BasicQueryStrings.LocationId);
			var length = req.ParseQueryInt(BasicQueryStrings.Length);
			var authToken = req.ParseQueryString(BasicQueryStrings.AuthToken);
            var search = req.ParseQueryString(BasicQueryStrings.Search);
            if (length == 0) length = 45;

			return Executor.ExecApiAsync(async () => {

				// create appointment
				if (req.Method == HttpMethod.Post) {
					log.LogInformation("Saving appointment as end user");
					if (TryParseAppointment(await req.Content.ReadAsStringAsync(), log, out var model)) {
						ResourceApi.ValidateLocationId(model.PartitionKey);

						if (model.ServiceLength < 1)
							model.ServiceLength = 45;

						model.UpdateStartEnd();

						if (model.AptStart < DateTime.UtcNow.AddHours(-6))
							throw new ValidationException("Start time is in the past");

						if (model.AptEnd <= model.AptStart)
							throw new ValidationException("Invalid end time");

						if (model.AptStart == null)
							throw new ValidationException("Invalid start time requested");

						// TODO: Check again that the slot is not occupied

						SaveAppointment(model);

						log.LogInformation("Sending welcome email");
						await EmailApi.EnqueueEmail(new EmailModel() {
							ToEmail = model.Email,
							HtmlBody = TransactionalEmail.ConfirmationEmailHtml(model.FirstName, model.AptStart.Value),
							Subject = "Your appointment with ideal MRI",
							TextBody = null,
							ToName = model.FirstName + " " + model.LastName
						});

						return new List<Appointment> {model};
					}
				}

				// update appointment
				if (req.Method == HttpMethod.Put) {
					log.LogInformation("Saving appointment as admin");
					// TODO: validate admin credentials if passing beyond this point
					if (TryParseAppointment(await req.Content.ReadAsStringAsync(), log, out var model)) {
						SaveAppointment(model);
						return new List<Appointment> {model};
					}
				}

				// get appointment list
				if (req.Method == HttpMethod.Get) {
					// TODO: validate admin credentials if passing beyond this point
					log.LogInformation("Loading appointments");
					var appointments = Appointment.GetAll();
					return appointments;
				}

				// delete appointment
				if (req.Method == HttpMethod.Delete) {
					// TODO: validate admin credentials if passing beyond this point
					log.LogInformation("Canceling appointment");
					if (TryParseAppointment(await req.Content.ReadAsStringAsync(), log, out var model)) {
						DeleteAppointment(model);
						return new List<Appointment> {model};
					}
				}

				throw new RequestNotHandledException();
			}).ToJsonHttpResponseMessage();
		}

		private static void SaveAppointment(Appointment model) {
			AzureTableHelper<Appointment>.Set(model);
		}

		private static void DeleteAppointment(Appointment model) {
			AsyncContext.Run(() => AzureTableHelper<Appointment>.DeleteAsync(model));
		}
	}
}
