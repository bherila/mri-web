import * as React from 'react';
import {EditFormBase} from "../forms";
import {Appointment, ScheduleApi} from "../api/api";
import {getAuthToken} from "../helpers/authToken";

export interface PatientConfirmFormProps {
	appointment: Appointment;
	onConfirm: () => any;
	onRequestEdit: () => any;
	onCancel: () => any;
}

export class PatientConfirmForm extends React.Component<PatientConfirmFormProps, Appointment> {

	constructor(props, context) {
		super(props, context);
		this.state = props.appointment || {};
	}

	public setInsurance(insuranceVerified: boolean) {
		this.setState({insuranceVerified});
	}

	public setPriorAuth(priorAuthObtained: boolean) {
		this.setState({priorAuthObtained});
	}

	public setRIS(orderEnteredToRIS: boolean) {
		this.setState({orderEnteredToRIS});
	}

	public setCalled(patientWasCalled: boolean) {
		this.setState({patientWasCalled});
	}

	public setConfirm(confirmed: boolean) {
		this.setState({confirmed});
	}

	public doUpdate() {
		new ScheduleApi().appointmentHandlerPUT({
			authToken: getAuthToken(),
			req: this.state,
		}).then((updateResp) => {
			if (updateResp.success) {
				if (this.props.onConfirm instanceof Function) {
					this.props.onConfirm();
				}
			} else {
				alert(updateResp.message || 'Error');
			}
		});
	}

	public render() {
		const appt = this.state || {};
		return (
			<div className="centered white-box radiologist">
				<h3>Confirm Reservation</h3>
				<p>John Doe</p>
				<p>Brain MRI <b>without</b> contrast</p>
				{EditFormBase.boundCheckboxValue(
					'Insurance verified, if applicable',
					appt.insuranceVerified || false,
					(v) => this.setInsurance(v)
				)}
				{EditFormBase.boundCheckboxValue(
					'Prior authorization obtained, if applicable',
					appt.priorAuthObtained || false,
					(v) => this.setPriorAuth(v)
				)}
				{EditFormBase.boundCheckboxValue(
					'Order and Demographics entered into RIS',
					appt.orderEnteredToRIS || false,
					(v) => this.setRIS(v)
				)}
				{EditFormBase.boundCheckboxValue(
					'Patient called, if applicable',
					appt.patientWasCalled || false,
					(v) => this.setCalled(v)
				)}
				{EditFormBase.boundCheckboxValue(
					'Confirmed',
					appt.confirmed || false,
					(v) => this.setConfirm(v)
				)}
				<div className="centered">
					<button className="button w-button" type="button">Confirm</button>
					<button className="button w-button" type="button">View/Edit Details</button>
					<button className="button w-button" type="button">Nevermind</button>
				</div>
			</div>
		);
	}
}
