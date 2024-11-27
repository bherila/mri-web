using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Common;
using ServiceStack;

namespace SignupCenter {
	public static class Schedule {
		public static IEnumerable<AvailabilityRule> Prioritize(this List<AvailabilityRule> items) {
			var i = 0;
			foreach (var item in items.OrderBy(x => x.Priority)) {
				item.Priority = ++i * 100;
				yield return item;
			}
		}

		public static bool MatchesTime(this AvailabilityRule rule, DateTime dt) {
			var start = TimeSpan.Parse(rule.StartTime);
			var end = TimeSpan.Parse(rule.EndTime);
			var time = dt.TimeOfDay;
			return time >= start && time <= end;
		}

		public static bool MatchesDate(this AvailabilityRule rule, DateTime dt) {
			if (rule.OnThisDay == "Mon" && dt.DayOfWeek == DayOfWeek.Monday) return true;
			if (rule.OnThisDay == "Tue" && dt.DayOfWeek == DayOfWeek.Tuesday) return true;
			if (rule.OnThisDay == "Wed" && dt.DayOfWeek == DayOfWeek.Wednesday) return true;
			if (rule.OnThisDay == "Thu" && dt.DayOfWeek == DayOfWeek.Thursday) return true;
			if (rule.OnThisDay == "Fri" && dt.DayOfWeek == DayOfWeek.Friday) return true;
			if (rule.OnThisDay == "Sat" && dt.DayOfWeek == DayOfWeek.Saturday) return true;
			if (rule.OnThisDay == "Sun" && dt.DayOfWeek == DayOfWeek.Sunday) return true;
			if (rule.OnThisDay == "Any Weekday" &&
			    !(dt.DayOfWeek == DayOfWeek.Saturday || dt.DayOfWeek == DayOfWeek.Sunday)) return true;
			if (rule.OnThisDay == "Weekend" &&
			    (dt.DayOfWeek == DayOfWeek.Saturday || dt.DayOfWeek == DayOfWeek.Sunday)) return true;
			if (DateTime.TryParse(rule.OnThisDay, out var matchDt)) {
				if (matchDt.Date == dt.Date) return true;
			} else {
				try {
					var regex = new Regex(rule.OnThisDay, RegexOptions.IgnoreCase);
					if (regex.IsMatch(dt.ToString("s"))) return true;
				} catch {
					// syntax error in regex
					return false;
				}
			}

			return false;
		}

		public static bool MatchesSlot(this AvailabilityRule rule, DateTime dt) {
			if (!rule.MatchesDate(dt))
				return false;
			if (!rule.MatchesTime(dt))
				return false;
			return true;
		}

		public static AvailabilityRule Match(List<AvailabilityRule> rules, SignupSlot slot) {
			foreach (var rule in rules)
				if (rule.MatchesSlot(slot.SlotBegin))
					return rule;

			return null;
		}

		/// <summary>
		///     Gets the list of availability rules from Storage.
		/// </summary>
		/// <returns></returns>
		public static List<AvailabilityRule> RulesFromStorage() {
			// TODO: Cache rules list
			var allRules = AzureTableHelper<AvailabilityRule>.LoadEverything();
			return allRules.OrderBy(x => x.Priority).ToList();
		}

		public static void SortRulesAndSave(List<AvailabilityRule> data) {
			var sorted = data.Prioritize();
			foreach (var row in sorted) AzureTableHelper<AvailabilityRule>.Set(row);
		}

		public static IEnumerable<SignupSlot> GenerateSlots() {
			var currentLocalTime = DateTime.UtcNow.AddHours(-6); // CST - Central Time
			var startDate = currentLocalTime.Date.AddDays(1);
			var endDate = startDate.AddDays(14);
			return GenerateSlots(startDate, endDate);
		}

		public static IEnumerable<SignupSlot> GenerateSlots(DateTime startDate, DateTime endDate) {
			var current = startDate;
			while (current < endDate) {
				var ss = new SignupSlot {
					SlotBegin = current, UtcOffsetBegin = -6, UtcOffsetEnd = -6
				};
				current = current.AddMinutes(30);
				ss.SlotEnd = current;
				yield return ss;
			}
		}

		public static IEnumerable<SignupSlot> ApplyResourceRules(this IEnumerable<SignupSlot> slots,
			List<AvailabilityRule> ruleSet) {
			var resourceIds = ruleSet.Select(x => new {x.ResourceID, x.PartitionKey}).Distinct();
			foreach (var res in resourceIds)
			foreach (var slot in slots) {
				var applicableRule = Match(ruleSet, slot);
				if (applicableRule == null) continue;

				slot.ResourceId = res.ResourceID;
				slot.SlotLocationId = res.PartitionKey;

				slot.SlotId = Appointment.GetSlotId(slot.SlotBegin, applicableRule.PartitionKey,
					applicableRule.ResourceID);

				slot.IsAvailable = applicableRule.Status != "Blocked";
				slot.IsHidden = applicableRule.Status != "Hidden";

				slot.IsContrastAvailable = applicableRule.Status != "Contrast Unavailable";
				slot.IsContrastRequired = applicableRule.Status == "Contrast Required";

				if (!slot.IsAvailable) {
					slot.IsContrastAvailable = false;
					slot.IsContrastRequired = false;
				}

				yield return slot.Clone();
			}
		}

		public static bool IsOverlap(SignupSlot a, Appointment b) {
			// bool overlap = a.start < b.end && b.start < a.end;
			// https://stackoverflow.com/questions/13513932/algorithm-to-detect-overlapping-periods
			// Beautiful! It answers "could two people have met" with "yes if both were born before the other died". The reason this works becomes clear when you express the opposite: "no if either died before the other was born." In effect, testing for case 5 only: overlap = !(a.start > b.end || b.start > a.end) – Bob Stein Mar 10 '15 at 22:43
			if (a.SlotLocationId != b.PartitionKey) return false;
			if (a.ResourceId != b.ResourceId) return false;

			return a.SlotBegin < b.AptEnd && b.AptStart < a.SlotEnd;
		}

		public static Appointment FindAppointmentIntersectingSlot(SignupSlot slot,
			IEnumerable<Appointment> appointments) {
			return appointments.FirstOrDefault(a => IsOverlap(slot, a));
		}

		public static IEnumerable<SignupSlot> ApplyAppointments(this IEnumerable<SignupSlot> slots,
			List<Appointment> appointments) {
			var sl = slots.GroupBy(s => new {s.SlotLocationId, s.ResourceId});
			var al = appointments.ToList();

			foreach (var slotGroup in sl)
			foreach (var slot in slotGroup) {
				slot.ExistingAppointment = FindAppointmentIntersectingSlot(slot, al);
				if (slot.ExistingAppointment != null) {
					al.Remove(slot.ExistingAppointment);
					slot.IsAvailable = false;
				}

				yield return slot;
			}
		}

		// block out time slots which would generate a conflict if booked
		public static IEnumerable<SignupSlot> ApplyAppointmentLength(this IEnumerable<SignupSlot> slots,
			int newAppointmentLength) {

			var appointments = slots.Select(x => x.ExistingAppointment).Where(x => x != null).ToList();

			appointments.RemoveAll(a => a.PartitionKey == null || a.RowKey == null);

			foreach (var slot in slots) {
				var pendingAppointment = new SignupSlot() {
					SlotBegin = slot.SlotBegin,
					SlotEnd = slot.SlotBegin.AddMinutes(newAppointmentLength),
					ResourceId = slot.ResourceId,
					SlotLocationId = slot.SlotLocationId,
				};
				var conflict = FindAppointmentIntersectingSlot(pendingAppointment, appointments);
				if (conflict != null) {
					slot.IsAvailable = false; // not available due to conflict
				}
				yield return slot;
			}
		}

		public static IEnumerable<SlotAvailabilityDate> MakeDateTree(IEnumerable<SignupSlot> slots) {
			foreach (var group in slots.GroupBy(x => x.SlotBegin.Date)) {
				var slotDate = new SlotAvailabilityDate {
					Date = group.Key,
					Times = group.OrderBy(slotObj => slotObj.SlotBegin)
						.Select(slotObj => new SlotAvailabilityTime {
							IsAvailable = slotObj.IsAvailable,
							Time = slotObj.FriendlyBegin,
							SlotId = slotObj.SlotId,
							ResourceId = slotObj.ResourceId,
							LinkedAppointment = slotObj.ExistingAppointment,
							IsHidden = slotObj.IsHidden,
							IsContrastAvailable = slotObj.IsContrastAvailable,
							IsContrastRequired = slotObj.IsContrastRequired
						}).ToList()
				};
				yield return slotDate;
			}
		}
	}
}
