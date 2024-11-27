using System.ComponentModel.DataAnnotations.Schema;
using Common;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;

namespace SignupCenter {
	public class CustomerLead : TableEntityExt {
		[Column("sg_fname")] public string FirstName { get; set; }
		[Column("sg_lname")] public string LastName { get; set; }
		[Column("sh_dob")] public string DOB { get; set; }
		[Column("sg_phone")] public string Phone { get; set; }
		[Column("sg_email")] public string Email { get; set; }
		[Column("sg_email")] public string ServiceType { get; set; }
		[Column("sg_email")] public string TimeSlot { get; set; }
		[Column("sg_email")] public bool WithContrast { get; set; }
		[JsonIgnore, IgnoreProperty] public override string TableName => "MriLead";
	}
}