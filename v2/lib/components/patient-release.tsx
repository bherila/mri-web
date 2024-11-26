import * as React from 'react';
import {ScheduleApi, SlotAvailabilityTime} from "../api/api";
import {getAuthToken} from "../helpers/authToken";
import copyAppointment from "../helpers/copyAppointment";

export interface PatientReleaseFormProps {
	selectedSlotAvailabilityTime: SlotAvailabilityTime;
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
			req: copyAppointment(this.props.selectedSlotAvailabilityTime.linkedAppointment),
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
		const appt = this.props.selectedSlotAvailabilityTime.linkedAppointment || {};
		return appt && (
			<div className="centered">
				<h3>Release Reservation?</h3>
				<h3>{this.props.selectedSlotAvailabilityTime.slotId}</h3>
				<h3>{appt.firstName} {appt.lastName}</h3>
				<p>This will open the time slot for future booking.</p>
				<p>Patient data will be removed from this time slot.</p>
				<p>
					<label style={{fontWeight: 'bold'}}>
						<input
						type="checkbox"
						onChange={(e) => this.setState({isConfirmed: e.currentTarget.checked})}
					/>
					Please make sure this time slot is also open in the RIS!
					</label>
				</p>
				<div className="centered">
					{(
						<button
							disabled={!this.state.isConfirmed}
							className={(!this.state.isConfirmed ? 'disabled' : 'button') + ' w-button'}
							type="button"
							onClick={() => this.doRelease()}>Release</button>
					)}
					<button className="button w-button" type="button" onClick={() => this.props.onCancel()}>Nevermind</button>
				</div>
			</div>
		);
	}
}
