export function getFriendlyError(error: string): string {

	const errString = error && typeof(error) === 'string' ? error.toLowerCase() : '';

	if (errString.indexOf('card type') > -1) {
		return 'Uh oh! There seems to be a problem with the credit card number you used. Please check the number and try entering it again. We\'ll happily take this order by email or phone, just contact us at support@undergroundcellar.com or 888-977-9899.';
	}
	if (errString.indexOf('cardcode') > -1) {
		return 'Uh oh! There seems to be a problem with CVV code you used (the 3 digit code on the back of the card). Please try entering the CVV code again. We\'ll happily take this order by email or phone, just contact us at support@undergroundcellar.com or 888-977-9899.';
	}
	if (errString.indexOf('e00104') > -1) {
		return 'Sorry, your request did not go through due to system maintenance. Please try again.';
	}
	if (errString.indexOf('code 2') > -1) {
		return 'Uh oh! There seems to be a problem with the credit card you used. Please try using a different card or contact your bank for more information. We\'ll happily take this order by email or phone, just contact us at support@undergroundcellar.com or 888-977-9899.';
	}
	if (errString.indexOf('putshipmentfrom') > -1) {
		return 'Oops! Our system had a hiccup preparing your shipment. Please contact us by phone and we\'d be happy to put through your shipment manually...  support@undergroundcellar.com or 888-977-9899.';
	}
	if (errString.indexOf('system.net.sockets.socketexception') > -1) {
		return 'Oh no! Your internet connection pooped out while we were processing your request. Make sure your internet connection is working and then try refreshing the page. If it still doesn\'t work contact us at support@undergroundcellar.com or 888-977-9899.';
	}
	if (errString.indexOf('E0027') > -1 || errString.indexOf('declined') > -1) {
		return 'Whoops! Your order did not go through and we did not charge your credit card because it was declined. Please check if there are enough funds available, or contact your bank/lending institution.';
	}
	if (errString.indexOf('user email not found') > -1 || errString.indexOf('Email address doesn\'t exist.') > -1) {
		return 'We couldn\'t find a user with this email address. We can help! Feel free to contact us at support@undergroundcellar.com or 888-977-9899.';
	}

	// todo: add login errors here

	// todo: add signup errors

	// todo: add checkout errors

	// todo: add gift card errors

	if (errString.indexOf('[') > -1) {
		return 'Our server might be a little tipsy, but your request did not go through. We can help! Feel free to contact us at support@undergroundcellar.com or 888-977-9899.';
	}
	return error;
}
