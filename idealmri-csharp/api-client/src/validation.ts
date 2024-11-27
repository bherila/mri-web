import * as cc from 'credit-card-type';
import * as Api from './api';

export interface IFormDataItem {
	name: string;
	value: string;
}

export interface IValidation {
	name: string;
	validIf: string;
}

export interface IPrizeStatus {
	prizeLetters: any[];
	buttonStatus: IButtonStatus;
}

export interface IButtonStatus {
	message: string;
	isActive: boolean;
}

export function isEmpty(str: string|any[]|undefined) {
	if (typeof str === 'undefined') { return true; }
	if (str === null) { return true; }
	if (typeof str === 'string') {
		if (str.trim().length < 1) { return true; }
	}
	return str.length === 0;
}

export function isValidEmail(email: string): boolean {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(email)) {
		return false;
	}
	for (let i = 0; i < disposableDomains.length; ++i) {
		if (email.indexOf(disposableDomains[i]) !== -1) {
			return false;
		}
	}
	return true;
}

export function formatCurrency(input: any): string {
	let s1 = '$' + parseFloat(input).toFixed(2).toString();
	if (s1.lastIndexOf('.00') === s1.length - 3) {
		s1 = s1.substring(0, s1.length - 3);
	}
	return s1;
}

export function sortOffers(offers) {
	return offers.sort((a, b) => {
		const price = (x) => x.retailPrice || x.displayPrice || x.groupValue;
		if (price(a) < price(b)) {
			return 1;
		}
		if (price(a) > price(b)) {
			return -1;
		}
		return 0;
	});
}

export function object2formData(object: any): IFormDataItem[] {
	const result = [];
	const keys = Object.keys(object);
	for (const key in keys) {
		if (keys.hasOwnProperty(key)) {
			result.push({name: key, value: object[key]});
		}
	}
	return result;
}

export const validationTypes = {
	NOT_EMPTY: 'NOT_EMPTY',
	IS_EMAIL: 'IS_EMAIL',
	IS_PHONE_NUMBER: 'IS_PHONE_NUMBER',
	IS_ZIP_CODE: 'IS_ZIP_CODE',
	IS_CC_NUMBER: 'IS_CC_NUMBER',
	IS_CCV_CODE: 'IS_CCV_CODE',
	IS_EXPIRY_DATE: 'IS_EXPIRY_DATE',
};

export const validationPatterns = {
	IS_EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	IS_PHONE_NUMBER: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
	IS_ZIP_CODE: /^\d{5}(?:[-\s]\d{4})?$/,
	IS_CCV_CODE: /^[0-9]{3,4}$/,
};

export function formatPhone(value: string) {
	return value.replace(/^(\+(\d{1,2})\s)?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/g, '$2 ($3) $4-$5').trim();
}

export function dedupeAddressList(addressList: Api.NhAddressModel[]): Api.NhAddressModel[] {
	const aList: string[] = [];
	const result: Api.NhAddressModel[] = [];
	for (let i = 0; i < addressList.length; ++i) {
		const a = addressList[i];
		a.firstName = (a.firstName || '').trim();
		a.lastName = (a.lastName || '').trim();
		a.address1 = (a.address1 || '').trim();
		a.address2 = (a.address2 || '').trim();
		a.city = (a.city || '').trim();
		a.state = (a.state || '').trim();
		a.zip = (a.zip || '').trim();
		a.phone = (a.phone || '').trim();
		const hash = JSON.stringify([a.firstName, a.lastName, a.address1, a.address2, a.city, a.state, a.zip, a.phone]).toLowerCase();
		if (aList.indexOf(hash) < 0) {
			aList.push(hash);
			result.push(a);
		}
	}
	return result;
}

export function formIsValid(formData: IFormDataItem[], requiredFields: IValidation[]) {
	const validity = {invalidFields: [], isValid: true};

	formData.map((field) => {
		// const reqField = _.find(requiredFields, (req: IValidation) => {
		// 	return req.name === field.name;
		// });
		const reqField = requiredFields.filter((req: IValidation) => req.name === field.name)[0];
		let invalid = false;

		if (reqField) {
			switch (reqField.validIf) {
				case validationTypes.NOT_EMPTY:
					if (field.value === '') {
						invalid = true;
					}
					break;
				case validationTypes.IS_CC_NUMBER:
					const val = (field.value || '');
					const temp: string = val.replace(/ /g, '').toString();
					const ct = cc(temp);
					if (!ct || ct.length < 1) {
						invalid = true;
						break;
					}
					const regex = new RegExp(ct[0] ? ct[0].exactPattern.toString() : '');
					if (field.value === '' || !regex.test(field.value.replace(/ /g, ''))) {
						invalid = true;
					}
					break;
				case validationTypes.IS_EXPIRY_DATE:
					const match = field.value.match(/^(\d\d)\s*\/\s*(\d\d(\d\d)?)$/);
					if (match) {
						const month = parseInt(match[1], 10);
						let year = parseInt(match[2], 10);
						if (year < 100) {
							year += 2000;
						}
						if (!(month >= 1 && month <= 12)) {
							invalid = true;
						} else if (
							year < new Date().getFullYear() ||
							(
								year === new Date().getFullYear() &&
								month < new Date().getMonth() + 1
							)
						) {
							invalid = true;
						}
					} else {
						invalid = true;
					}
					break;
				case validationTypes.IS_EMAIL:
				case validationTypes.IS_PHONE_NUMBER:
				case validationTypes.IS_ZIP_CODE:
				case validationTypes.IS_CCV_CODE:
					if (!validationPatterns[reqField.validIf].test(field.value)) {
						invalid = true;
					}
					break;
			}

			if (invalid) {
				validity.invalidFields.push(field.name);
				validity.isValid = false;
				invalid = false;
			}
		}
	});

	return validity;
}

export class ExpiryDate {

	public static getValidValue(value) {
		const match = value.match(/^(\d\d)\s*\/\s*(\d\d(\d\d)?)$/);
		return match ? match[1] + '/' + match[2] : '';
	}

	public static getFormatted(str) {
		const digits = str.replace(/[^\d]/g, '');
		const endsWithSlash = str.substring(str.length - 1) === '/';
		if (digits.length === 0) {
			return '';
		} else if (digits.length === 1) {
			if (digits[0] === '0') {
				return '0';
			} else if (digits[0] === '1') {
				return endsWithSlash ? '01 / ' : '1';
			} else {
				return '0' + digits[0] + ' / ';
			}
		} else if (digits.length >= 2) {
			if (digits[0] === '0') {
				if (digits[1] === '0') {
					return '0';
				} else {
					return digits.substring(0, 2) + ' / ' + digits.substring(2);
				}
			} else if (digits[0] === '1') {
				if (parseInt(digits[1], 10) <= 2) {
					return digits.substring(0, 2) + ' / ' + digits.substring(2);
				} else {
					return '0' + digits[0] + ' / ' + digits.substring(1);
				}
			} else if (parseInt(digits[0], 10) >= 2) {
				return '0' + digits[0] + ' / ' + digits.substring(1);
			}
		}
	}
}

const disposableDomains = [
	'0-mail.com',
	'0815.ru',
	'0clickemail.com',
	'10minutemail.co.za',
	'10minutemail.com',
	'20minutemail.com',
	'2prong.com',
	'30minutemail.com',
	'33mail.com',
	'3d-painting.com',
	'4warding.com',
	'4warding.net',
	'60minutemail.com',
	'6ip.us',
	'anonbox.net',
	'anonymbox.com',
	'antispam.de',
	'armyspy.com',
	'beefmilk.com',
	'binkmail.com',
	'bobmail.info',
	'bofthew.com',
	'boun.cr',
	'brefmail.com',
	'brennendesreich.de',
	'bsnow.net',
	'bugmenot.com',
	'bumpymail.com',
	'bund.us',
	'cachedot.net',
	'cashforcarsbristol.co.uk',
	'ce.mintemail.com',
	'chammy.info',
	'clrmail.com',
	'courrieltemporaire.com',
	'cubiclink.com',
	'curryworld.de',
	'cust.in',
	'cuvox.de',
	'dacoolest.com',
	'dandikmail.com',
	'dayrep.com',
	'deadaddress.com',
	'despam.it',
	'devnullmail.com',
	'discard.email',
	'discardmail.com',
	'discardmail.de',
	'dispomail.eu',
	'disposemail.com',
	'dispostable.com',
	'dodgeit.com',
	'dodgit.com',
	'donemail.ru',
	'dontreg.com',
	'dontsendmespam.de',
	'drdrb.com',
	'drdrb.net',
	'dump-email.info',
	'e4ward.com',
	'eelmail.com',
	'einrot.com',
	'email60.com',
	'emailinfive.com',
	'emailmiser.com',
	'emailproxsy.com',
	'emailsensei.com',
	'emailtemporario.com.br',
	'emailwarden.com',
	'emailx.at.hm',
	'fakeinbox.com',
	'fakeinformation.com',
	'fastacura.com',
	'feeltrip.co',
	'filzmail.com',
	'fleckens.hu',
	'fr33mail.info',
	'get1mail.com',
	'get2mail.fr',
	'getairmail.com',
	'getonemail.com',
	'gishpuppy.com',
	'grr.la',
	'guerillamail.com',
	'guerrillamail.biz',
	'guerrillamail.com',
	'guerrillamail.de',
	'guerrillamail.net',
	'guerrillamail.org',
	'guerrillamailblock.com',
	'gustr.com',
	'haltospam.com',
	'harakirimail.com',
	'hochsitze.com',
	'hotpop.com',
	'hulapla.de',
	'hushmail.com',
	'imails.info',
	'imgof.com',
	'imgv.de',
	'inboxproxy.com',
	'incognitomail.com',
	'incognitomail.net',
	'incognitomail.org',
	'insorg-mail.info',
	'ipoo.org',
	'jetable.com',
	'jetable.net',
	'jetable.org',
	'jnxjn.com',
	'jourrapide.com',
	'keepmymail.com',
	'klzlk.com',
	'kulturbetrieb.info',
	'letthemeatspam.com',
	'lhsdv.com',
	'litedrop.com',
	'lookugly.com',
	'lopl.co.cc',
	'mail-temporaire.fr',
	'mail.by',
	'mail4trash.com',
	'mailcatch.com',
	'maildrop.cc',
	'maileater.com',
	'mailexpire.com',
	'mailforspam.com',
	'mailimate.com',
	'mailin8r.com',
	'mailinater.com',
	'mailinator.com',
	'mailinator.net',
	'mailinator2.com',
	'mailme.ir',
	'mailme.lv',
	'mailmetrash.com',
	'mailnator.com',
	'mailnesia.com',
	'mailnull.com',
	'mailproxsy.com',
	'mailslite.com',
	'mailtothis.com',
	'mailzilla.org',
	'mbx.cc',
	'meltmail.com',
	'messagebeamer.de',
	'mierdamail.com',
	'mintemail.com',
	'monemail.fr.nf',
	'mt2009.com',
	'my10minutemail.com',
	'mypartyclip.de',
	'myphantomemail.com',
	'mytrashmail.com',
	'nepwk.com',
	'no-spam.ws',
	'nobulk.com',
	'noclickemail.com',
	'nogmailspam.info',
	'nomorespamemails.com',
	'nonspam.eu',
	'nospam4.us',
	'nospamfor.us',
	'notmailinator.com',
	'nowmymail.com',
	'nwldx.com',
	'onewaymail.com',
	'opayq.com',
	'owlpic.com',
	'pjjkp.com',
	'politikerclub.de',
	'pookmail.com',
	'prtnx.com',
	'qoika.com',
	'qq.com',
	'quickinbox.com',
	'reallymymail.com',
	'recode.me',
	'reconmail.com',
	'rhyta.com',
	'rppkn.com',
	'rtrtr.com',
	's0ny.net',
	'safe-mail.net',
	'safetymail.info',
	'safetypost.de',
	'sandelf.de',
	'saynotospams.com',
	'selfdestructingmail.com',
	'sendspamhere.com',
	'sharedmailbox.org',
	'sharklasers.com',
	'shitmail.me',
	'slopsbox.com',
	'smellfear.com',
	'snakemail.com',
	'sofimail.com',
	'sofort-mail.de',
	'sogetthis.com',
	'soodonims.com',
	'spam.la',
	'spam.su',
	'spam4.me',
	'spamavert.com',
	'spambob.net',
	'spambob.org',
	'spambog.com',
	'spambog.de',
	'spambog.ru',
	'spambooger.com',
	'spambox.info',
	'spambox.us',
	'spamcero.com',
	'spamday.com',
	'spamfree24.de',
	'spamfree24.eu',
	'spamfree24.org',
	'spamgourmet.com',
	'spamherelots.com',
	'spamhereplease.com',
	'spamhole.com',
	'spamify.com',
	'spaminator.de',
	'spaml.com',
	'spaml.de',
	'spammotel.com',
	'spamobox.com',
	'spamspot.com',
	'spamstack.net',
	'spamthis.co.uk',
	'spamthisplease.com',
	'stonerfans.com',
	'streetwisemail.com',
	'supergreatmail.com',
	'supermailer.jp',
	'superrito.com',
	'suremail.info',
	'tafmail.com',
	'teewars.org',
	'teleworm.com',
	'teleworm.us',
	'tempalias.com',
	'tempe-mail.com',
	'tempemail.com',
	'tempemail.net',
	'tempinbox.co.uk',
	'tempinbox.com',
	'tempmail.it',
	'tempomail.fr',
	'temporaryemail.net',
	'temporaryinbox.com',
	'thanksnospam.info',
	'thankyou2010.com',
	'thehighlands.co.uk',
	'thisisnotmyrealemail.com',
	'throwawayemailaddress.com',
	'tmailinator.com',
	'tradermail.info',
	'trash-mail.com',
	'trash-mail.de',
	'trash2009.com',
	'trashemail.de',
	'trashmail.at',
	'trashmail.com',
	'trashmail.net',
	'trashmail.ws',
	'trashmailer.com',
	'trashymail.com',
	'trbvm.com',
	'trillianpro.com',
	'tyldd.com',
	'uggsrock.com',
	'value-mycar.co.uk',
	'veryrealemail.com',
	'wegwerfemail.de',
	'wh4f.org',
	'whyspam.me',
	'willselfdestruct.com',
	'wuzupmail.net',
	'yopmail.com',
	'yuurok.com',
	'zehnminutenmail.de',
	'zippymail.info',
	'zxcvbnm.co.uk',
	'yahoo.co'
];
