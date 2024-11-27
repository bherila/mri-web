using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Common;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.WindowsAzure.Storage;
using Newtonsoft.Json;
using SignupCenter;
using Swashbuckle.AspNetCore.AzureFunctions.Filters;

namespace FunctionsCodeGenerator {
	
	/// <summary>POSTED data for an uploaded file.</summary>
	public class CreateBlobStoreFileBody {
		// ReSharper disable InconsistentNaming
		
		/// <summary>Name of the uploaded file.</summary>
		public string fileName { get; set; }

		/// <summary>Extension of the uploaded file.</summary>
		public string fileExtension { get; set; }

		/// <summary>Contents of the uploaded file.</summary>
		public string fileContents { get; set; }

		// ReSharper restore InconsistentNaming

		public virtual bool IsValid() {
			if (string.IsNullOrEmpty(fileName)
			    || string.IsNullOrEmpty(fileExtension)
			    || string.IsNullOrEmpty(fileContents)
			) return false;
			return true;
		}
	}

	/// <summary>
	/// Azure Function to handle a File Upload
	/// </summary>
	public static class CreateBlobStoreFile {
		[FunctionName("FileUpload")]
		public static async Task<HttpResponseMessage> Run(
			[HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "file")]
			HttpRequestMessage req, TraceWriter log, ExecutionContext context) {
			log.Info("Create Blob Storage File Azure Function Called.");
			App.Startup(context);

			//var locationId = req.ParseQueryString("type");
			//if (locationId == "order") {
			//	// TODO
			//} else if (locationId == "ins front") {
			//	// TODO
			//} else if (locationId == "ins back") {
			//	// TODO
			//} else {
			//	return req.CreateErrorResponse(HttpStatusCode.BadRequest, "'type' was not one of the allowed values");
			//}

			var requestBody = new CreateBlobStoreFileBody();
			string sourceFile = null;
			const string containerName = "uploads";

			var fileIds = new List<string>();
			var storageAccount = AzureConfiguration.StorageAccount;
			try {
				var blobClient = storageAccount.CreateCloudBlobClient();
				var blobContainer = blobClient.GetContainerReference(containerName);
				var parts = await req.Content.ReadAsMultipartAsync();
				foreach (var content in parts.Contents) {
					try {
						var id = Guid.NewGuid();
						var fileName = content?.Headers?.ContentDisposition?.FileName?.ToLower() ?? "file.dat";
						fileName = fileName.StripNonAlphaNumericDashDot();
						var baseName = Path.GetFileNameWithoutExtension(fileName);
						var extension = Path.GetExtension(fileName);
						fileName = id.ToString("d") + extension;
						var cloudBlockBlob = blobContainer.GetBlockBlobReference(fileName);
						cloudBlockBlob.Properties.ContentType = "image/" + extension?.Trim('.') ?? "jpeg";
						await cloudBlockBlob.UploadFromStreamAsync(await content.ReadAsStreamAsync());

						fileIds.Add(fileName);
					}
					catch (Exception x) {
						log.Warning("Failed to read multipart content");
					}
				}

				//return req.CreateResponse(HttpStatusCode.OK, "File created successfully.");
			} catch (StorageException ex) {
				return req.CreateResponse(HttpStatusCode.BadRequest, ex);
			} catch (Exception ex) {
				return req.CreateResponse(HttpStatusCode.BadRequest, ex);
			}
			return req.CreateResponse(HttpStatusCode.OK, JsonConvert.SerializeObject(fileIds));
		}
	}
}
