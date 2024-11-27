using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Common;

namespace SignupCenter
{
	public class Resource : TableEntityExt
	{
		public override string TableName => "Agent";

		public Resource() {
			PartitionKey = "Resource";
			RowKey = Guid.NewGuid().ToString("D");
		}

		public DateTime EffectiveDate { get; set; }

		public DateTime ExpiryDate { get; set; }

		public string ResourceName { get; set; }

		public string MatchExpression { get; set; }

		public string DateExpression { get; set; }

		public int Priority { get; set; }
		
		public bool ContrastEnabled { get; set; }

	}
}