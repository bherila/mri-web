using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Common;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage.Queue;
using Newtonsoft.Json;
using Nito.AsyncEx;
using SignupCenter;
using SparkPost;

namespace MRI
{
	public class EmailModel
	{
		public string ToName { get; set; }
		public string ToEmail { get; set; }
		public string Subject { get; set; }
		public string HtmlBody { get; set; }
		public string TextBody { get; set; }
	}

	public static class EmailApi
	{
		[FunctionName(nameof(EmailQueueTrigger))]
		public static void EmailQueueTrigger(
			[QueueTrigger("outbox")] string myQueueItem,
			ILogger log)
		{
			log.LogInformation($"C# function processed: {myQueueItem}");
			var emailModel = JsonConvert.DeserializeObject<EmailModel>(myQueueItem);
			if (emailModel != null) {
				var transmission = new Transmission();
				transmission.Content.From.Email = "info@idealmri.com";
				transmission.Content.Subject = emailModel.Subject;
				transmission.Content.Text = emailModel.TextBody;
				transmission.Content.Html = emailModel.HtmlBody;

				var recipient = new Recipient
				{
					Address = new Address { Email = emailModel.ToEmail }
				};
				transmission.Recipients.Add(recipient);

				var client = new Client("5097a90d8d76a083ddc016326d5c3c928324dfcb"); // idealmri
				var resp = AsyncContext.Run(() => client.Transmissions.Send(transmission));
				
				log.LogInformation("Sent email with response " + JsonConvert.SerializeObject(resp, Formatting.Indented));
			}
		}

		/// <summary>
		/// Write an email to the Azure Storage queue for later sending
		/// </summary>
		/// <param name="message"></param>
		/// <returns></returns>
		public static async Task<bool> EnqueueEmail(EmailModel message) {
			var client = AzureConfiguration.StorageAccount.CreateCloudQueueClient();
			var queue = client.GetQueueReference("outbox");
			await queue.AddMessageAsync(new CloudQueueMessage(JsonConvert.SerializeObject(message)));
			return true;
		}
	}
}
