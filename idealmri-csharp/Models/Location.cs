using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Common;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;

namespace SignupCenter {
	/// <summary>
	/// Represents a location where a signup can be created. PartitionKey = Location ID, RowKey = Resource ID
	/// </summary>
	public class Location : TableEntityExt {
		public Location() {
			PartitionKey = Guid.NewGuid().ToString("D");
			RowKey = "A";
		}

		[JsonIgnore, IgnoreProperty] public override string TableName => "Location";

		#region Azure Storage
		public void SaveLocation() {
			AzureTableHelper<Location>.Set(this);
		}
		
		public static List<Location> GetLocations(string locationId = null) {
			var allLocations = AzureTableHelper<Location>.LoadEverything();
			if (!string.IsNullOrEmpty(locationId))
				allLocations.RemoveAll(loc => loc.PartitionKey != locationId);
			return allLocations; // ordered by partition key, row key
		}
		#endregion

	}
}

