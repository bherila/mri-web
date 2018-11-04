import * as React from 'react';
import {EditFormBase} from "../forms";

export interface PatientConfirmFormProps {
	onConfirm: () => any;
	onRequestEdit: () => any;
	onCancel: () => any;
}

export class PatientConfirmForm extends React.Component<PatientConfirmFormProps, any> {
	public render() {
		return (
			<div className="centered white-box radiologist">
				<h3>Confirm Reservation</h3>
				<p>John Doe</p>
				<p>Brain MRI <b>without</b> contrast</p>
				<p>Insurance verified, if applicable</p>
				<p>Prior authorization obtained, if applicable</p>
				<p>Order and Demographics entered into RIS</p>
				<p>Patient called, if applicable</p>
				<p>Confirmation email sent</p>
				<div className="centered">
					<button className="button w-button" type="button">Confirm</button>
					<button className="button w-button" type="button">View/Edit Details</button>
					<button className="button w-button" type="button">Nevermind</button>
				</div>
			</div>
		);
	}
}
