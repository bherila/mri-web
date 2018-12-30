import * as React from 'react';
import {SafetyState} from "../models/SafetyState";
import {Appointment} from "../api/api";

export abstract class FormBasePage extends React.Component<{}, SafetyState> {
	constructor(props, context) {
		super(props, context);
		this.state = SafetyState.loadState();
	}

	public static setAppointment(appt: Appointment | null) {
		if (typeof sessionStorage !== 'undefined') {
			sessionStorage.setItem('appointmentEntity', JSON.stringify(appt || null));
		}
	}

	public static getAppointment(): Appointment {
		if (typeof sessionStorage !== 'undefined') {
			const json = sessionStorage.getItem('appointmentEntity') || '{}';
			return JSON.parse(json);
		}
		return {};
	}

	public getAns(q) {
		return this.state.answers[q];
	}

	public componentDidMount() {
		const state = SafetyState.loadState();
		this.setState(state);
		console.log('Loaded SafetyState', state);
	}

	public ans(q, val) {
		const answers = Object.assign(new SafetyState(), this.state.answers);
		answers[q] = val;
		console.log(q, val, answers);
		this.setState({answers}, () => this.saveState());
	}

	public saveState() {
		if (typeof sessionStorage !== 'undefined') {
			sessionStorage.setItem('wizard', JSON.stringify({
				answers: this.state.answers,
				implants: this.state.implants,
				currentImplant: this.state.currentImplant,
				fname: this.state.fname,
				lname: this.state.lname,
				email: this.state.email,
				phone: this.state.phone,
				height: this.state.height,
				weight: this.state.weight,
				doctorName: this.state.doctorName,
				doctorContact: this.state.doctorContact,
				insFront: this.state.insFront,
				insBack: this.state.insBack,
				mriOrder: this.state.mriOrder,
				scan: this.state.scan || null,
				haveOrder: this.state.haveOrder,
				dob: this.state.dob,
			}));
		}
	}

	abstract render();
}