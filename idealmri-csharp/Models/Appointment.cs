using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Common;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;

namespace SignupCenter
{
	[Table("mr_appt")]
	public class Appointment : TableEntityExt {
		public Appointment() {
			PartitionKey = "Default"; // maybe later we look up by location/year/month.
		}

		// location id is partition key

		// appointment slot id is row key

		[IgnoreProperty, JsonIgnore] public override string TableName => "Appt";

		public static string GetSlotId(DateTime appointmentDateTime, string locationId, string resourceId) {
			return $"{appointmentDateTime:s} {locationId} {resourceId}";
		}

		public string ResourceId { get; set; }

		[JsonIgnore, IgnoreProperty]
		public DateTime? AptStart { get; protected set; }

		[JsonIgnore, IgnoreProperty]
		public DateTime? AptEnd { get; protected set; }

		public void UpdateStartEnd() { 
			if (DateTime.TryParse(RowKey.Substring(0, RowKey.IndexOf(' ')), out var dt))
			{
				AptStart = dt;
				AptEnd = dt.AddMinutes(ServiceLength);
			} else {
				AptStart = null;
				AptEnd = null;
			}
		}

		public virtual IEnumerable<AppointmentLookup> GetLookups() {
			yield return new AppointmentLookup(Email);
		}

		[Column("sg_service_type")] public string ServiceType { get; set; }
		[Column("sg_service_type")] public int ServiceLength { get; set; }

		// section 1
		[Column("sg_fname")] public string FirstName { get; set; }
		[Column("sg_lname")] public string LastName { get; set; }
		[Column("sg_phone")] public string Phone { get; set; }
		[Column("sg_email")] public string Email { get; set; }
        [Column("sg_street")] public string Address1 { get; set; }
        [Column("sg_street2")] public string Address2 { get; set; }
        [Column("sg_city")] public string City { get; set; }
		[Column("sg_state")] public string State { get; set; }
		[Column("sg_zip")] public string Zip { get; set; }

		[Column("sg_height")] public string Height { get; set; }
		[Column("sg_weight")] public string Weight { get; set; }

		[Column("sg_reminder")] public int Reminder { get; set; }

		[Column("sg_dr_name")] public string DoctorName { get; set; }
		[Column("sg_dr_phone")] public string DoctorPhone { get; set; }

		[Column("sg_ins_carrier")] public string InsuranceCarrier { get; set; }
		[Column("sg_ins_group")] public string InsuranceGroupNumber { get; set; }
		[Column("sg_ins_policy")] public string InsurancePolicyNumber { get; set; }

		[Column("sg_ins_verified")] public bool InsuranceVerified { get; set; }
		[Column("sg_ins_auth")] public bool PriorAuthObtained { get; set; }
		[Column("sg_order_entered")] public bool OrderEnteredToRIS { get; set; }
		[Column("sg_patient_called")] public bool PatientWasCalled { get; set; }
		[Column("sg_conf_sent")] public bool Confirmed { get; set; }

		[Column("sg_order")] public string OrderImageUrl { get; set; }
		[Column("sg_ins_front")] public string InsuranceFrontUrl { get; set; }
		[Column("sg_ins_back")] public string InsuranceBackUrl { get; set; }
		[Column("sg_data")] public string SurveyDataJson { get; set; }
		[Column("sg_approved")] public DateTime? ApprovedDate { get; set; }
		[Column("sg_submitted")] public DateTime? SubmittedDate { get; set; }
		[Column("sg_confirmed")] public DateTime? ConfirmedDate { get; set; }
		[Column("sg_dob")] public string Birthday { get; set; }

		public static List<Appointment> GetAll() {
			var list = AzureTableHelper<Appointment>.LoadEverything(); //TODO: Cache
			foreach (var item in list)
				item.UpdateStartEnd();
			return list;
		}
	}
}