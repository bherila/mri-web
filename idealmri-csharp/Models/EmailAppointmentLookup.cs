using System;
using Common;

namespace SignupCenter
{
	public class AppointmentLookup : TableEntityExt
	{
		public override string TableName => "EmailToAppointment";

		public AppointmentLookup() : base() { }

		public AppointmentLookup(string lookupBy) : base()
		{
			PartitionKey = lookupBy;
			RowKey = "*";
		}

		public Guid AppointmentPartition { get; set; }

		public Guid AppointmentRow { get; set; }

		public DateTime AppointmentDate { get; set; }
	}
}