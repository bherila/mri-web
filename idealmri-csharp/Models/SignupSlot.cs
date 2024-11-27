using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;

namespace SignupCenter
{
	/// <summary>
	/// Show which dates are available/not.
	/// </summary>
	public sealed class SlotAvailabilityDate
	{
		public DateTime Date { get; set; }
		[IgnoreProperty] public string FriendlyBegin => Date.ToString("ddd, MMM d");
		public List<SlotAvailabilityTime> Times { get; set; }
	}

	/// <summary>
	/// Shows which times of day are available/not.
	/// </summary>
	public sealed class SlotAvailabilityTime
	{
		public string Time { get; set; }
		public string ResourceId { get; set; }
		public bool IsHidden { get; set; }
		public bool IsAvailable { get; set; }
		public bool IsContrastAvailable { get; set; }
		public bool IsContrastRequired { get; set; }
		public Appointment LinkedAppointment { get; set; }
		public string SlotId { get; set; }
	}

	public class SignupSlot
	{
		[Key] [Column("slot_id"), JsonIgnore] public string SlotId { get; set; }

		[Column("slot_loc_id"), JsonIgnore] public string SlotLocationId { get; set; }

		public string ResourceId { get; set; }

		[Column("slot_begin")] public DateTime SlotBegin { get; set; }
		[Column("slot_end")] public DateTime SlotEnd { get; set; }
		[Column("offset_begin")] public double UtcOffsetBegin { get; set; }
		[Column("offset_end")] public double UtcOffsetEnd { get; set; }

		[IgnoreProperty] public string FriendlyBegin => SlotBegin.ToString("hh:mm tt");
		[IgnoreProperty] public bool IsHidden { get; set; }
		[IgnoreProperty] public bool IsAvailable { get; set; }
		[IgnoreProperty] public bool IsContrastAvailable { get; set; }
		[IgnoreProperty] public bool IsContrastRequired { get; set; }

		[IgnoreProperty, JsonIgnore] public Appointment ExistingAppointment { get; set; }

		public SignupSlot Clone() {
			var o = (SignupSlot) this.MemberwiseClone();
			return o;
		}
	}
}