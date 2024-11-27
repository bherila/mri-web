let defaultFormat = /(\d{1,4})/g;

export class CardUtility {
	public static cardFromNumber(num) {
		let card, p, pattern, _i, _j, _len, _len1, _ref;
		num = (num + '').replace(/\D/g, '');
		for (_i = 0, _len = cards.length; _i < _len; _i++) {
			card = cards[_i];
			_ref = card.patterns;
			for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
				pattern = _ref[_j];
				p = pattern + '';
				if (num.substr(0, p.length) === p) {
					return card;
				}
			}
		}
	}

	public static cardFromType(type) {
		let card, _i: number, _len: number;
		for (_i = 0, _len = cards.length; _i < _len; _i++) {
			card = cards[_i];
			if (card.type === type) {
				return card;
			}
		}
	};

	public static luhnCheck(num) {
		let digit, digits, odd, sum, _i, _len;
		odd = true;
		sum = 0;
		digits = (num + '').split('').reverse();
		for (_i = 0, _len = digits.length; _i < _len; _i++) {
			digit = digits[_i];
			digit = parseInt(digit, 10);
			if ((odd = !odd)) {
				digit *= 2;
			}
			if (digit > 9) {
				digit -= 9;
			}
			sum += digit;
		}
		return sum % 10 === 0;
	};

	public static replaceFullWidthChars(str: string): string {
		let chars, chr, fullWidth, halfWidth, idx, value, _i, _len;
		if (str == null) {
			str = '';
		}
		fullWidth = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
		halfWidth = '0123456789';
		value = '';
		chars = str.split('');
		for (_i = 0, _len = chars.length; _i < _len; _i++) {
			chr = chars[_i];
			idx = fullWidth.indexOf(chr);
			if (idx > -1) {
				chr = halfWidth[idx];
			}
			value += chr;
		}
		return value;
	};

	public static reFormatNumeric(inputValue: string): string {
		let value = inputValue;
		value = CardUtility.replaceFullWidthChars(value);
		value = value.replace(/\D/g, '');
		return value;
	};

	public static reFormatCardNumber(value) {
		value = CardUtility.replaceFullWidthChars(value);
		value = CardUtility.formatCardNumber(value, '');
		return value;
	};

	public static formatCardNumber(value: string, digit: string): string {
		let card, length, re, upperLength;
		// digit = String.fromCharCode(e.which);
		// if (!/^\d+$/.test(digit)) {
		// 	return value;
		// }
		card = CardUtility.cardFromNumber(value + digit);
		length = (value.replace(/\D/g, '') + digit).length;
		upperLength = 16;
		if (card) {
			upperLength = card.length[card.length.length - 1];
		}
		if (length >= upperLength) {
			return value;
		}
		if (card && card.type === 'amex') {
			re = /^(\d{4}|\d{4}\s\d{6})$/;
		} else {
			re = /(?:^|\s)(\d{4})$/;
		}
		if (re.test(value)) {
			return (value + ' ' + digit);
		} else if (re.test(value + digit)) {
			return (value + digit + ' ');
		} else {
			return value;
		}
	};

	public static handleCCNumberInput(event) {
		let target = event.currentTarget,
			targetVal = target.value,
			charCode = String.fromCharCode(event.which),
			charCodeLen = (targetVal.replace(/\D/g, '') + charCode).length,
			card = CardUtility.cardFromNumber(targetVal + charCode),
			maxLength = 16;

		// if (CardUtility.state.cardNumber.length >= 2)
		// 	CardUtility.setState({cardType: card.type});

		if (card && (maxLength = card.length), !/^\d+$/.test(charCode) || charCodeLen > maxLength) {
			return void event.preventDefault();
		}

		const cardTest = card && "amex" === card.type ? /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/;

		return cardTest.test(targetVal) && target.selectionStart === targetVal.length ?
			(event.preventDefault(), void(target.value = targetVal + " " + charCode)) : void 0;
	}

	public static formatBackCardNumber(value) {
		// if (e.which !== 8) {
		// 	return;
		// }
		// if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
		// 	return;
		// }
		if (/\d\s$/.test(value)) {
			// e.preventDefault();
			// return setTimeout(function() {
			// 	return $target.val(value.replace(/\d\s$/, ''));
			// });
			return value.replace(/\d\s$/, '');
		} else if (/\s\d?$/.test(value)) {
			// e.preventDefault();
			// return setTimeout(function() {
			// 	return $target.val(value.replace(/\d$/, ''));
			// });
			return value.replace(/\d$/, '');
		} else {
			return value;
		}
	};

	public static reFormatExpiry(value) {
		value = CardUtility.replaceFullWidthChars(value);
		value = CardUtility.formatExpiry(value, '');
		return value;
	};

	public static formatExpiry(val: string, digit: string): string {
		// var $target, digit, val;
		// digit = String.fromCharCode(e.which);
		// if (!/^\d+$/.test(digit)) {
		// 	return;
		// }
		// $target = e.currentTarget;
		// val = $target.value + digit;
		val = val + digit;
		if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
			return "0" + val + " / ";
			// e.preventDefault();
			// return setTimeout(function() {
			// 	return $target.val("0" + val + " / ");
			// });
		} else if (/^\d\d$/.test(val)) {
			// e.preventDefault();
			// return setTimeout(function() {
			let m1, m2;
			m1 = parseInt(val[0], 10);
			m2 = parseInt(val[1], 10);
			if (m2 > 2 && m1 !== 0) {
				return ("0" + m1 + " / " + m2);
			} else {
				return ("" + val + " / ");
			}
			// });
		}
	};

	public static reFormatCVC(value) {
		value = CardUtility.replaceFullWidthChars(value);
		value = value.replace(/\D/g, '').slice(0, 4);
		return value;
	};

	public static restrictNumeric(e) {
		var input;
		if (e.metaKey || e.ctrlKey) {
			return true;
		}
		if (e.which === 32) {
			return false;
		}
		if (e.which === 0) {
			return true;
		}
		if (e.which < 33) {
			return true;
		}
		input = String.fromCharCode(e.which);
		return !!/[\d\s]/.test(input);
	};

	public static restrictCardNumber(e) {
		var $target, card, digit, value;
		$target = e.currentTarget;
		digit = String.fromCharCode(e.which);
		if (!/^\d+$/.test(digit)) {
			return;
		}
		value = ($target.value + digit).replace(/\D/g, '');
		card = CardUtility.cardFromNumber(value);
		if (card) {
			return value.length <= card.length[card.length.length - 1];
		} else {
			return value.length <= 16;
		}
	};

	public static restrictExpiry(e) {
		var $target, digit, value;
		$target = e.currentTarget;
		digit = String.fromCharCode(e.which);
		if (!/^\d+$/.test(digit)) {
			return false;
		}
		value = $target.value + digit;
		value = value.replace(/\D/g, '');
		if (value.length > 6) {
			return false;
		}
		return true;
	};

	public static restrictCVC(e) {
		var $target, digit, val;
		$target = e.currentTarget;
		digit = String.fromCharCode(e.which);
		if (!/^\d+$/.test(digit)) {
			return;
		}
		val = $target.value + digit;
		return val.length <= 4;
	};

	// public static setCardType(e) {
	// 	var $target, allTypes, card, cardType, val;
	// 	$target = e.currentTarget;
	// 	val = $target.value;
	// 	cardType = $.payment.cardType(val) || 'unknown';
	// 	if (!$target.hasClass(cardType)) {
	// 		allTypes = (function() {
	// 			var _i, _len, _results;
	// 			_results = [];
	// 			for (_i = 0, _len = cards.length; _i < _len; _i++) {
	// 				card = cards[_i];
	// 				_results.push(card.type);
	// 			}
	// 			return _results;
	// 		})();
	// 		$target.removeClass('unknown');
	// 		$target.removeClass(allTypes.join(' '));
	// 		$target.addClass(cardType);
	// 		$target.toggleClass('identified', cardType !== 'unknown');
	// 		return $target.trigger('payment.cardType', cardType);
	// 	}
	// };
}

export const cards = [
	{
		type: 'maestro',
		patterns: [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
		format: defaultFormat,
		length: [12, 13, 14, 15, 16, 17, 18, 19],
		cvcLength: [3],
		luhn: true
	}, {
		type: 'forbrugsforeningen',
		patterns: [600],
		format: defaultFormat,
		length: [16],
		cvcLength: [3],
		luhn: true
	}, {
		type: 'dankort',
		patterns: [5019],
		format: defaultFormat,
		length: [16],
		cvcLength: [3],
		luhn: true
	}, {
		type: 'visa',
		patterns: [4],
		format: defaultFormat,
		length: [13, 16],
		cvcLength: [3],
		luhn: true
	}, {
		type: 'mastercard',
		patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
		format: defaultFormat,
		length: [16],
		cvcLength: [3],
		luhn: true
	}, {
		type: 'amex',
		patterns: [34, 37],
		format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
		length: [15],
		cvcLength: [3, 4],
		luhn: true
	}, {
		type: 'dinersclub',
		patterns: [30, 36, 38, 39],
		format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
		length: [14],
		cvcLength: [3],
		luhn: true
	}, {
		type: 'discover',
		patterns: [60, 64, 65, 622],
		format: defaultFormat,
		length: [16],
		cvcLength: [3],
		luhn: true
	}, {
		type: 'unionpay',
		patterns: [62, 88],
		format: defaultFormat,
		length: [16, 17, 18, 19],
		cvcLength: [3],
		luhn: false
	}, {
		type: 'jcb',
		patterns: [35],
		format: defaultFormat,
		length: [16],
		cvcLength: [3],
		luhn: true
	}
];
