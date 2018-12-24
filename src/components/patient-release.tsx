import * as React from 'react';
import {EditFormBase} from "../forms";
import {Appointment, ScheduleApi, SlotAvailabilityTime} from "../api/api";
import {getAuthToken} from "../helpers/authToken";
import copyAppointment from "../helpers/copyAppointment";

export interface PatientReleaseFormProps {
	selectedSlot: SlotAvailabilityTime;
	onConfirm: () => any;
	onRequestEdit: () => any;
	onCancel: () => any;
}

export class PatientReleaseForm extends React.Component<PatientReleaseFormProps, {isConfirmed: boolean}> {

	constructor(props, context) {
		super(props, context);
		this.state = {isConfirmed: false};
	}

	public doRelease() {
		new ScheduleApi().appointmentHandlerDELETE({
			authToken: getAuthToken(),
			req: copyAppointment(this.props.selectedSlot.linkedAppointment),
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
		const appt = this.props.selectedSlot.linkedAppointment || {};
		return appt && (
			<div className="centered white-box radiologist">
				<h3>Release Reservation?</h3>
				<h3>{this.props.selectedSlot.slotId}</h3>
				<h3>{appt.firstName} {appt.lastName}</h3>
				<p>This will open the time slot for future booking.</p>
				<p>Patient data will be removed from this time slot.</p>
				<p><b>
					<input
						type="checkbox"
						onChange={(e) => this.setState({isConfirmed: e.currentTarget.checked})}
					/>
					Please make sure this time slot is also open in the RIS!</b></p>
				<div className="centered">
					{(
						<button
							disabled={!this.state.isConfirmed}
							className={'button w-button ' + (!this.state.isConfirmed && 'disabled')}
							type="button"
							onClick={() => this.doRelease()}>Release</button>
					)}
					<button className="button w-button" type="button" onClick={() => this.props.onCancel()}>Nevermind</button>
				</div>
			</div>
		);
	}
}
