import {
	ApiBillingModelWithAuthnet, ApiResultOrderViewModel,
	ApiResultPaymentWithAddressModel,
	ApiResultUserAuthResultModel,
	NhAddressModel,
	PaymentApi,
	PaymentWithAddressModel,
	UserApi,
	UserAuthModel,
	ApiResultListPaymentWithAddressModel,
} from './api';
import {isEmpty} from './validation';

// never rejects.
export function createOrReuseAddressAndPayment(noAuthAddress, noAuthPayment, sessionId): Promise<ApiResultPaymentWithAddressModel> {
	return new Promise((resolve: (value: ApiResultPaymentWithAddressModel) => any, reject) => {
		const paymentApi = new PaymentApi();
		if (!noAuthAddress || !noAuthPayment || !sessionId) {
			resolve({value: null, success: false, message: null});
		}
		const handleError = (error) => {
			resolve({value: null, success: false, message: JSON.stringify(error)});
		};
		paymentApi.paymentGetAddressAndPayment({sessionId}).then((ea: ApiResultListPaymentWithAddressModel) => {

			// see if the payment already exists...
			for (let i = 0; i < ea.value.length; ++i) {
				if (addressEquals(ea.value[i].address, noAuthAddress, false)) {
					if (equalsApiBillingModelWithAuthnet(ea.value[i].payment, noAuthPayment, false)) {
						resolve({value: ea.value[i], success: true, message: null});
						return;
					}
				}
			}

			// not found, so try to create it...
			paymentApi.paymentPostAddressAndPayment({
				sessionId,
				model: {
					address: noAuthAddress,
					payment: noAuthPayment,
				},
			}).then((paymentResult) => {
				resolve(paymentResult);
			}, handleError);
		}, handleError);
	});
}

// never rejects.
export function createOrReuseUserAccount(model: UserAuthModel): Promise<ApiResultUserAuthResultModel> {
	return new Promise<ApiResultUserAuthResultModel>((resolve: (result: ApiResultUserAuthResultModel) => any) => {
		const api = new UserApi();
		const errorHandler = (err) => {
			return {value: null, message: JSON.stringify(err), success: false};
		};
		api.userSignup3({model}).then((signupResult) => {
			console.log('usersignup done', signupResult);
			if ((signupResult.message || '').indexOf('already exists') > -1) {
				// oh maybe we already created the account, try to log in
				api.userSignIn3({model}).then((loginResult) => resolve(loginResult), errorHandler);
			}
			resolve(signupResult);
		});
	});
}

export function cleanDisplay(name: string) {
	if (!name || isEmpty(name)) {
		return '';
	}
	return name.replace(/\bRose\b/ig, 'Rosé');
}

function eq(s1: string, s2: string) {
	if (isEmpty(s1) && !isEmpty(s2)) {
		return false;
	}
	if (isEmpty(s2) && !isEmpty(s1)) {
		return false;
	}
	if ((s1 || '').toLowerCase().trim() !== (s2 || '').toLowerCase().trim()) {
		return false;
	}
	return true;
}

function addressEquals(a1: NhAddressModel, a2: NhAddressModel, checkId: boolean) {
	if (checkId && !eq(a1.id, a2.id)) {
		return false;
	}
	if (!eq(a1.firstName, a2.firstName)) {
		return false;
	}
	if (!eq(a1.lastName, a2.lastName)) {
		return false;
	}
	if (!eq(a1.address1, a2.address1)) {
		return false;
	}
	if (!eq(a1.address2, a2.address2)) {
		return false;
	}
	if (!eq(a1.city, a2.city)) {
		return false;
	}
	// if (!eq(a1.isDefault, a2.isDefault)) {
	// 	return false;
	// }
	if (!eq(a1.cplId, a2.cplId)) {
		return false;
	}
	if (!eq(a1.state, a2.state)) {
		return false;
	}
	if (!eq(a1.carrierPreference, a2.carrierPreference)) {
		return false;
	}
	if (!eq(a1.zip, a2.zip)) {
		return false;
	}
	if (!eq(a1.phone, a2.phone)) {
		return false;
	}
	// if (!eq(a1.status, a2.status)) {
	// 	return false;
	// }
	// if (!eq(a1.dateAdded, a2.dateAdded)) {
	// 	return false;
	// }
	return true;
}

function equalsApiBillingModelWithAuthnet(p1: ApiBillingModelWithAuthnet, p2: ApiBillingModelWithAuthnet, checkId: boolean) {
	// if (checkId && !eq(p1.userGuid, p2.userGuid)) {
	// 	return false;
	// }
	// if (!eq(p1.authNetUserProfileId, p2.authNetUserProfileId)) {
	// 	return false;
	// }
	// if (!eq(p1.authNetUserId, p2.authNetUserId)) {
	// 	return false;
	// }
	// if (!eq(p1.authNetPaymentProfileId, p2.authNetPaymentProfileId)) {
	// 	return false;
	// }
	// if (!eq(p1.authNetShippingProfileId, p2.authNetShippingProfileId)) {
	// 	return false;
	// }
	// if (!eq(p1.isDeleted, p2.isDeleted)) {
	// 	return false;
	// }
	if (!eq(p1.billingAddressId, p2.billingAddressId)) {
		return false;
	}
	if (!eq(p1.cvv, p2.cvv)) {
		return false;
	}
	if (!eq(p1.firstName, p2.firstName)) {
		return false;
	}
	if (!eq(p1.lastName, p2.lastName)) {
		return false;
	}
	// if (!eq(p1.dateAdded, p2.dateAdded)) {
	// 	return false;
	// }
	// if (!eq(p1.expiryYear, p2.expiryYear)) {
	// 	return false;
	// }
	// if (!eq(p1.expiryMonth, p2.expiryMonth)) {
	// 	return false;
	// }
	if (!eq(p1.cardNumber, p2.cardNumber)) {
		return false;
	}
	if (checkId && !eq(p1.id, p2.id)) {
		return false;
	}
	// if (!eq(p1.isDefault, p2.isDefault)) {
	// 	return false;
	// }
	// if (!eq(p1.cardType, p2.cardType)) {
	// 	return false;
	// }
	return true;
}
