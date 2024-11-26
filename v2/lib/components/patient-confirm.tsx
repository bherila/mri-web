import * as React from 'react';
import {EditFormBase} from "../forms";
import {Appointment, ScheduleApi} from "../api/api";
import {getAuthToken} from "../helpers/authToken";
import copyAppointment from "../helpers/copyAppointment";

export interface PatientConfirmFormProps {
	selectedAppointment: Appointment;
	onConfirm: () => any;
	onRequestEdit: () => any;
	onCancel: () => any;
}

export class PatientConfirmForm extends React.Component<PatientConfirmFormProps, Appointment> {

	constructor(props, context) {
		super(props, context);
		this.state = props.selectedAppointment || {};
	}

	public setInsurance(insuranceVerified: boolean) {
		this.setState({insuranceVerified});
		if (!insuranceVerified) {
			this.setState({confirmed: false});
		}
	}

	public setPriorAuth(priorAuthObtained: boolean) {
		this.setState({priorAuthObtained});
		if (!priorAuthObtained) {
			this.setState({confirmed: false});
		}
	}

	public setRIS(orderEnteredToRIS: boolean) {
		this.setState({orderEnteredToRIS});
		if (!orderEnteredToRIS) {
			this.setState({confirmed: false});
		}
	}

	public setCalled(patientWasCalled: boolean) {
		this.setState({patientWasCalled});
		if (!patientWasCalled) {
			this.setState({confirmed: false});
		}
	}

	public setConfirm(confirmed: boolean) {
		this.setState({confirmed});
	}

	public doUpdate() {
		new ScheduleApi().appointmentHandlerPUT({
			authToken: getAuthToken(),
			req: copyAppointment(this.state),
		}).then((updateResp) => {

			// finish
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
			<div className="centered">
				<h3>Confirm Reservation</h3>
				<h3>{this.props.selectedAppointment.rowKey}</h3>
				<h3>{appt.firstName} {appt.lastName}</h3>
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
					<button className="button w-button" type="button" onClick={(e) => this.confirm(e)}>
						{this.isValid() ? 'Confirm' : 'Save'}
					</button>
					<button className="button w-button" type="button" onClick={(e) => this.viewEdit(e)}>View/Edit Details</button>
					<button className="button w-button" type="button" onClick={(e) => this.cancel(e)}>Nevermind</button>
				</div>
			</div>
		);
	}

	private isValid() {
		if (!this.state.insuranceVerified) {
			return false;
		}
		if (!this.state.priorAuthObtained) {
			return false;
		}
		if (!this.state.orderEnteredToRIS) {
			return false;
		}
		if (!this.state.patientWasCalled) {
			return false;
		}
		if (!this.state.confirmed) {
			return false;
		}
		return true;
	}

	private confirm(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		this.doUpdate();
	}

	private cancel(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		if (this.props.onCancel instanceof Function) {
			this.props.onCancel();
		}
	}

	private viewEdit(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		if (this.props.onRequestEdit instanceof Function) {
			this.props.onRequestEdit();
		}
	}
}
