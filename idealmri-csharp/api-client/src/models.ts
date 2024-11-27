import {validationTypes} from "./validation";
import {ApiBillingModelWithCardNumber, NhAddressModel} from "./api";

export type IAddressChangeHandler = (newId: string) => void;

export interface IAddressPickerProps {
	onChange?: IAddressChangeHandler;
	onAdded?: IAddressChangeHandler;
	allowAdd?: boolean;
	inLine?: boolean;
	addresses: AddressState[];
	defaultAddressId?: string;
}

export type IPaymentUpdater = (data: PaymentState) => void;

export interface IPaymentPickerProps {
	onChange?: IAddressChangeHandler;
	onAdded?: IAddressChangeHandler;
	allowAdd?: boolean;
	inLine?: boolean;
	initialPayments?: PaymentState[];
	defaultCardId?: string;
}

export interface IPaymentPickerState {
	loading: boolean;
	isAdding: boolean;
	payments: PaymentState[];
	creditCardId: string;
	isSignedIn: boolean;
}

export interface IPaymentProps {
	onChange: IPaymentUpdater;
	accountBalance: number;
	isCompact: boolean;
	disabled: boolean;
	newUser: boolean;
	onClose?: () => void;
	showClose?: boolean;
	invalidFields: any[];
	requiredFields: any[];
	setInvalidFields: (invalidFields: {invalidFields: string[]}) => void;
	autoFocus: boolean;
}

export class PaymentState implements ApiBillingModelWithCardNumber {
	constructor() {
		this.name = '';
		this.cardNumber = '';
		this.cardNumberFormatted = '';
		this.firstName = '';
		this.lastName = '';
		this.expiryDate = '';
		this.expiryMonth = 0;
		this.expiryYear = 0;
		this.cvv = '';
		this.isDefault = false;
		this.password = '';
	}

	public id?: string;
	public name?: string;
	public cardNumber?: string;
	public cardNumberFormatted?: string;
	public firstName: string;
	public lastName: string;
	public expiryDate?: string;
	public expiryMonth?: number;
	public expiryYear?: number;
	public isDefault?: boolean;
	public cvv: string;
	public password?: string;

	public cardType?: string;
}


export type IAddressUpdater = (data: AddressState) => void;
export type IAddressAndPaymentComplete = (state: AddressAndPaymentState) => any;
export type IAddressComplete = (state: AddressState) => any;

export interface IAddressProps {
	onChange: IAddressUpdater;
	disabled: boolean;
	isCompact: boolean;
	validStates: any[];
	invalidFields: any[];
	onError: (error: string) => void;
	requiredFields: any[];
	setInvalidFields: (invalidFieldsObject) => void;
	autoFocus: boolean;
}

export interface IAddressAndPaymentProps {
	onComplete?: IAddressAndPaymentComplete;
	canGoBack: boolean;
	onGoBack?: () => void;
	isCompact: boolean;
	newUser?: boolean;
	noSave?: boolean;
	isCloudCheckout?: boolean;
	onSubmit?: (payment: PaymentState) => void;
	defaultCardId?: string;
	blockingOverride: {blocking: boolean};
	hasError?: boolean;
	validStates: any[];
	onError?: (error: string) => void;
	children?: any;
}

export interface IAddressFormProps {
	noSave?: boolean;
	onSubmit?: (address: AddressState) => void;
	onError?: (error: string) => void;
	validStates: any[];
	address?: IAddressProps;
	hasError?: boolean;
	blockingOverride?: any;
	onComplete?: IAddressComplete;
	isCompact?: boolean;
	canGoBack?: boolean;
}

export interface IAddressFormState {
	address: AddressState;
	busy: boolean;
	errors: string[];
	requiredFields: Array<{name: string, validIf: any}>;
	invalidFields: any[];
}

export class AddressAndPaymentState {
	constructor(props, context) {
		this.busy = false;
		this.address = new AddressState();
		this.payment = new PaymentState();
		this.errors = [];
		this.creditCardId = props.defaultCardId || '';
		this.requiredFields = [
			{name: 'cardNumber', validIf: validationTypes.IS_CC_NUMBER},
			{name: 'name', validIf: validationTypes.NOT_EMPTY},
			{name: 'cardExp', validIf: validationTypes.IS_EXPIRY_DATE},
			{name: 'cardCode', validIf: validationTypes.IS_CCV_CODE},
			{name: 'password', validIf: validationTypes.NOT_EMPTY},
			{name: 'billFirstName', validIf: validationTypes.NOT_EMPTY},
			{name: 'billLastName', validIf: validationTypes.NOT_EMPTY},
			{name: 'billStreetAddress1', validIf: validationTypes.NOT_EMPTY},
			{name: 'billCity', validIf: validationTypes.NOT_EMPTY},
			{name: 'billState', validIf: validationTypes.NOT_EMPTY},
			{name: 'billZip', validIf: validationTypes.IS_ZIP_CODE},
			{name: 'billPhone', validIf: validationTypes.IS_PHONE_NUMBER},
		];
		this.invalidFields = [];
	}

	public busy: boolean;
	public address: AddressState;
	public payment: PaymentState;
	public errors: string[];
	public creditCardId: string;
	public requiredFields: any[];
	public invalidFields: any[];
}
export class AddressState implements NhAddressModel {
	constructor() {
		if (typeof document !== 'undefined') {
			const firstName = document.cookie.replace(/(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/, '$1');
			const lastName = document.cookie.replace(/(?:(?:^|.*;\s*)lastName\s*\=\s*([^;]*).*$)|^.*$/, '$1');
			this.firstName = firstName || '';
			this.lastName = lastName || '';
		} else {
			this.firstName = this.lastName = '';
		}
		this.address1 = '';
		this.address2 = '';
		this.city = '';
		this.state = '';
		this.zip = '';
		this.phone = '';
		this.status = null;
		this.isDefault = false;
	}

	public id?: string;
	public firstName?: string;
	public lastName?: string;
	public address1?: string;
	public address2?: string;
	public city?: string;
	public state?: string;
	public zip?: string;
	public phone?: string;
	public status?: number;
	public isDefault?: boolean;
}
