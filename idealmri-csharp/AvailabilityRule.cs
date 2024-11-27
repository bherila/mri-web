using System;
using Common;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;

namespace SignupCenter {
	/// <summary>
	/// PartitionKey is the LocationId
	/// RowKey is a Guid
	/// </summary>
	public class AvailabilityRule : TableEntityExt {
		[JsonIgnore, IgnoreProperty]public override string TableName => "AvailabilityRule";

		public AvailabilityRule() {
			PartitionKey = "DefaultLocation";
			RowKey = Guid.NewGuid().ToString("D");
		}

		public double Priority { get; set; }
		public string ResourceID { get; set; }
		public string OnThisDay { get; set; }
		public string StartTime { get; set; }
		public string EndTime { get; set; }
		public string Comment { get; set; }
		public string Status { get; set; }
		
	}
}