using System;
using System.Collections.Generic;
using System.Text;

namespace MRI
{
	static class TransactionalEmail
	{
        public const string EmailHead = @"
<div style=""background: #111; padding: 10px; width: 100%;"">
  <img alt=""ideal MRI"" style=""height: 50px"" src=""https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5c204c159a157580928138da_Logo%20Dark.png"" />
</div>

<div style=""padding: 10px; font-family: Arial; color: #000;"">";

        public const string EmailFoot = @"</div>";

		public static string ConfirmationEmailHtml(string firstName, DateTime appointmentTime) {
			return $@"{EmailHead}
    
    <p>{firstName},</p>
    
    <p>Thank you for reserving your MRI on {appointmentTime:D} at {appointmentTime:h:mm tt}!</p>
    
    <p>We’ve received your information, but we may contact you for more details.</p>
    
    <p>If you have any questions, please call us at:
    <a href=""tel:+18334332567"">833-IDEAL-MR</a></p>
    
    <p>If you need to cancel your slot, <a href=""tel:+18334332567"">call us</a>.</p>
    
    <p>On the day of your scan:</p>
    
    <ul>
    
    <li>Please arrive 15 minutes before your scan time. (That’s {(appointmentTime.AddMinutes(-15)): h:mm tt})</li>
    
    <li>If you have a doctor’s order, don’t forget to bring it.</li>
    
    <li>If you are using health insurance, remember to bring your card.</li>
    
    <li>Wear comfortable clothes without zippers, underwire, or metal of any kind.</li>
    
    <li>Don’t worry! We’ve got you.</li>
    
    </ul>
    
    <p>Talk to you soon!</p>
    <p>Your ideal MRI Team</p>

</div>";
		}
	}
}
