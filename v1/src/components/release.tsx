import * as React from 'react';
import {EditFormBase} from "../forms";
import {Appointment, ScheduleApi} from "../api/api";
import {getAuthToken} from "../helpers/authToken";

export interface ReleaseFormProps {
	appointment: Appointment;
	onConfirm: () => any;
	onRequestEdit: () => any;
	onCancel: () => any;
}

export class ReleaseForm extends React.Component<ReleaseFormProps, any> {

	public render() {
		const a = this.props.appointment;
		return (
			<div className="centered white-box radiologist">
				<h3>Release Reservation</h3>
				<p>{a.firstName} {a.lastName}</p>
				<p>{a.serviceType} {a.serviceLength}</p>
				<p>
					{a.insuranceVerified ? <span>Insurance verified</span> : <span>Insurance Not verified</span>}
				</p>
				<p>Prior authorization obtained, if applicable</p>
				<p>
					{a.orderEnteredToRIS ? <span>Order and Demographics entered into RIS</span> : <span>RIS entry needed</span>}
				</p>
				<p>
					{a.patientWasCalled ? <span>Patient called, if applicable</span> : <span>Patient not called</span>}
				</p>
				<p>
					{a.confirmed ? <span>Confirmation email sent</span> : <span>Not yet confirmed</span>}
				</p>
				<div className="centered">
					<button className="button w-button" type="button" onClick={(e) => this.doRelease(e)}>Confirm</button>
					<button className="button w-button" type="button" onClick={(e) => this.doCancel(e)}>Nevermind</button>
				</div>
			</div>
		);
	}

	private doRelease(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		new ScheduleApi().appointmentHandlerDELETE({
			authToken: getAuthToken(),
			locationId: '',
			req: this.props.appointment,
			search: '',
			withContrast: false,
		}).then((releaseResp) => {
			if (releaseResp.success) {
				if (this.props.onConfirm instanceof Function) {
					this.props.onConfirm();
				}
			} else {
				alert(releaseResp.message || 'Error');
			}
		});
	}

	private doCancel(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		if (this.props.onCancel instanceof Function) {
			this.props.onCancel();
		}
	}

}
