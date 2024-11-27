import * as Api from './api';

export const GuidEmpty = '00000000-0000-0000-0000-000000000000';

export class Defaults {

	static wineGeniusData(copyFromExisting?: Api.WineGeniusData): Api.WineGeniusData {
		return {
			coffeeBlack: copyFromExisting ? copyFromExisting.coffeeBlack : false,
			coffeeCream: copyFromExisting ? copyFromExisting.coffeeCream : false,
			coffeeCreamSugar: copyFromExisting ? copyFromExisting.coffeeCreamSugar : false,
			coffeeFrappuccino: copyFromExisting ? copyFromExisting.coffeeFrappuccino : false,
			saltyPopcorn: copyFromExisting ? copyFromExisting.saltyPopcorn : false,
			charcuterie: copyFromExisting ? copyFromExisting.charcuterie : false,
			applesAndPeanutButter: copyFromExisting ? copyFromExisting.applesAndPeanutButter : false,
			fruitSmoothie: copyFromExisting ? copyFromExisting.fruitSmoothie : false,
			teriyaki: copyFromExisting ? copyFromExisting.teriyaki : false,
			mushroom: copyFromExisting ? copyFromExisting.mushroom : false,
			risotto: copyFromExisting ? copyFromExisting.risotto : false,
			pastaWithArugula: copyFromExisting ? copyFromExisting.pastaWithArugula : false,
			lemonSorbet: copyFromExisting ? copyFromExisting.lemonSorbet : false,
			caramelIceCream: copyFromExisting ? copyFromExisting.caramelIceCream : false,
			darkChocolateMousse: copyFromExisting ? copyFromExisting.darkChocolateMousse : false,
			olives: copyFromExisting ? copyFromExisting.olives : false,
			level: copyFromExisting ? copyFromExisting.level : '',
			redWhitePosition: copyFromExisting ? copyFromExisting.redWhitePosition : 0,
			redMin: copyFromExisting ? copyFromExisting.redMin : '',
			redMax: copyFromExisting ? copyFromExisting.redMax : '',
			whiteMin: copyFromExisting ? copyFromExisting.whiteMin : '',
			whiteMax: copyFromExisting ? copyFromExisting.whiteMax : '',
			bottlesPerWeek: copyFromExisting ? copyFromExisting.bottlesPerWeek : 0,
			sparkling: copyFromExisting ? copyFromExisting.sparkling : false,
			largeFormat: copyFromExisting ? copyFromExisting.largeFormat : false,
			rare: copyFromExisting ? copyFromExisting.rare : false,
			autographed: copyFromExisting ? copyFromExisting.autographed : false,
			highValue: copyFromExisting ? copyFromExisting.highValue : false,
			smallProduction: copyFromExisting ? copyFromExisting.smallProduction : false,
			cult: copyFromExisting ? copyFromExisting.cult : false,
			international: copyFromExisting ? copyFromExisting.international : false,
			overallSweet: copyFromExisting ? copyFromExisting.overallSweet : 0,
			overallSour: copyFromExisting ? copyFromExisting.overallSour : 0,
			overallSalty: copyFromExisting ? copyFromExisting.overallSalty : 0,
			overallBitter: copyFromExisting ? copyFromExisting.overallBitter : 0,
			overallTexture: copyFromExisting ? copyFromExisting.overallTexture : 0,
			firstTrait: copyFromExisting ? copyFromExisting.firstTrait : '',
			secondTrait: copyFromExisting ? copyFromExisting.secondTrait : '',
			lastTrait: copyFromExisting ? copyFromExisting.lastTrait : '',
			budget: copyFromExisting ? copyFromExisting.budget : 0,
			paymentGuid: copyFromExisting ? copyFromExisting.paymentGuid : '',
			surveyDate: copyFromExisting ? copyFromExisting.surveyDate : new Date(),
			traits: copyFromExisting ? copyFromExisting.traits : [],
		};
	}

	static shipOrderResult(): Api.ShipOrderResult {
		return {
			cplId: '',
			shippingCaseGuid: '',
			bottles: [],
			totalTax: 0,
			taxAlreadyPaid: 0,
			taxChargedOrRefunded: 0,
			protectShipmentValue: 0,
			shipMethods: [],
			iceAvailable: true,
			promotionsUsed: [],
			promoValue: 0,
			accountBalanceUsed: 0,
			accountBalanceAvailable: 0,
			taxComputed: {orderTaxAmt: 0, regionName: '', taxRate: 0},
			totalPrice: 0,
			subtotal: 0,
		};
	}

	static cloudCheckoutModel(): Api.CloudCheckoutModel {
		return {
			shippingMethod: '0',
			icePack: false,
			giftMessage: '',
			bottles: [],
			additionalItems: [],
			protectShipment: false,
			protectShipmentValue: 0,
			protectShipmentPercent: 0,
			userGuid: '',
			creditCardId: '',
			shippingAddressId: '',
			promoCode: [],
			appId: '',
			useAccountCredit: true,
			result: null,
			sessionUtmSource: '',
			sessionUtmMedium: '',
			sessionUtmCampaign: '',
			noAuthAddress: {},
			validationWarnings: [],
			validationErrors: [],
		};
	}
	
	static changePasswordState(): IChangePasswordState {
		return {
			isLoading: false,
			passwordError: false,
			passwordMessage: '',
			oldPassword: '',
			newPassword: '',
			confirmPassword: ''
		};
	}
	
	static changePasswordStateUpdated(): IChangePasswordState {
		return {
			passwordMessage: 'Your password has been updated.',
			newPassword: '',
			oldPassword: '',
			confirmPassword: '',
			passwordError: false,
			isLoading: false,
		};
	}
	
	static changePasswordStateDoesNotMatch() {
		return {
			passwordMessage: 'Old password does not match with our database records, try again.',
			passwordError: true,
			oldPassword: '',
			isLoading: false,
		};
	}
	
	static itemDetail(): Api.ItemDetailEntity {
		return {
			itemDetailGuid: '',
			region: '',
			abv: 14.1,
			appel: '',
			bottleImg: [],
			bottleImgCsv: '',
			brand: '',
			countryCode: 'US',
			ctCommunityScore: 0,
			ctLikes: 0,
			ctProducerId: 0,
			ctQty: 0,
			ctReview: 0,
			ctTastingNotes: 0,
			ctWineId: 0,
			displayDesc: '',
			displayName: '',
			isBeer: false,
			isLiquor: false,
			isSmallProduction: false,
			isSparkling: false,
			isWine: true,
			labelImg: [],
			labelImgCsv: '',
			ml: 0,
			redirectTo: '',
			retailPrice: 0,
			upc: '',
			urlKey: '',
			varietal: '',
			vintage: 0,
			wineDrinkEnd: 0,
			wineDrinkStart: 0,
			winemakerNotes: '',
			wineryGuid: '',
			wineTastingNotes: '',
			wineVineyard: '',
		};
	}
}

export interface IChangePasswordState {
	isLoading: boolean;
	passwordError: boolean;
	passwordMessage: string;
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}
