import {validationTypes} from './validation';

export type AuthMode = 'email' | 'signup' | 'signin' | 'forgot' | 'confirmation' | 'none';
export type ValidAuthState = 'signin' | 'signup' | 'none' | 'forgot';

export const modes = {
	LOGIN: 'LOGIN',
	FORGOT: 'FORGOT',
};

export class AuthBaseState {
	constructor() {
		this.authMode = 'none';
		this.showAgeGate = true;
		this.signUpEmail = '';
		this.is21 = false;
		this.loginFormData = {};
		this.forgotFormData = {};
		this.error = '';
		this.isLoading = false;
		this.currentMode = modes.LOGIN;
		this.invalidFields = [];
		this.requiredFields = [
			{name: 'loginEmail', validIf: validationTypes.IS_EMAIL},
			{name: 'loginPassword', validIf: validationTypes.NOT_EMPTY},
			{name: 'forgotEmail', validIf: validationTypes.IS_EMAIL},
		];
		this.reward = '';
	}
	public authMode: ValidAuthState;
	public showAgeGate: boolean | null;
	public signUpEmail: string;
	public is21: boolean;
	public loginFormData: any;
	public forgotFormData: any;
	public error: string;
	public isLoading: boolean;
	public currentMode: string;
	public invalidFields: any[];
	public requiredFields: Array<{name: string; validIf: string}>;
	public reward: string;
}

export interface IAuthBaseProps {
	signUpEmail?: string;
}

export interface ISignUpProps {
	email: string;
	onHide: () => {};
	show: boolean;
	signupPromo: string;
}

export interface ISignUpState {
	error: string;
	isLoading: boolean;
	formData: any;
	invalidFields: any[];
	requiredFields: any[];
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
