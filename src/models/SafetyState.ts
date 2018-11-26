import {SlotAvailabilityTime} from "../api/api";
import {IScan} from "./Scan";

export class SafetyState {
	constructor() {
		this.fname =  '';
		this.lname =  '';
		this.answers =  {};
		this.implants =  [];
		this.currentImplant =  '';
		this.scan =  null;
		this.haveOrder =  false;
		this.overrideSafetyWarning =  false;
		this.email = '';
		this.phone = '';
		this.height = '';
		this.weight = '';
		this.doctorName = '';
		this.insFront = '';
		this.insBack = '';
		this.mriOrder = '';
		this.timeSlot = JSON.parse(sessionStorage.getItem('timeSlot') || '{}');
		this.err = '';
		this.dob = '';
		this.carrierNumber = '';
		this.groupNumber = '';
		this.policyNumber = '';
	}
	public fname: string;
	public lname: string;
	public email: string;
	public phone: string;
	public answers: any;
	public implants: string[];
	public currentImplant: string;
	public haveOrder: boolean;
	public scan: IScan | null;
	public overrideSafetyWarning: boolean;
	public height: string;
	public weight: string;
	public doctorName: string;
	public insFront: string;
	public insBack: string;
	public mriOrder: string;
	public carrierNumber: string;
	public groupNumber: string;
	public policyNumber: string;
	public timeSlot: SlotAvailabilityTime | null;
	public err: string;
	public dob: string;

	public static loadState(): SafetyState {
		if (typeof sessionStorage !== 'undefined') {
			const jsonState = JSON.parse(sessionStorage.getItem('wizard') || '{}');
			const o = {
				// fname: sessionStorage.getItem('fname') || '',
				// lname: sessionStorage.getItem('lname') || '',
				// email: sessionStorage.getItem('email') || '',
				// phone: sessionStorage.getItem('phone') || '',
				// height: sessionStorage.getItem('height') || '',
				// weight: sessionStorage.getItem('weight') || '',
				// doctorName: sessionStorage.getItem('doctorName') || '',
				// insFront: sessionStorage.getItem('insFront') || '',
				// insBack: sessionStorage.getItem('insBack') || '',
				// mriOrder: sessionStorage.getItem('mriOrder') || '',
				scan: JSON.parse(sessionStorage.getItem('scan') || '{}'),
				haveOrder: sessionStorage.getItem('haveOrder') === 'true',
			};
			return Object.assign(new SafetyState(), jsonState, o);
		}
		return new SafetyState();
	}
}
