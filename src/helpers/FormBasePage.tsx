import * as React from 'react';
import {SafetyState} from "../models/SafetyState";

export abstract class FormBasePage extends React.Component<{}, SafetyState> {
	constructor(props, context) {
		super(props, context);
		this.state = SafetyState.loadState();
	}

	public componentDidMount() {
		const state = SafetyState.loadState();
		this.setState(state);
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