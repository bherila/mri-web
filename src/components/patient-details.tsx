import * as React from 'react';
import {EditFormBase} from "../forms";
import {Appointment, ScheduleApi, SlotAvailabilityTime} from "../api/api";
import {getAuthToken} from "../helpers/authToken";
import copyAppointment from "../helpers/copyAppointment";

export interface PatientDetailsFormProps {
	selectedAppointment: SlotAvailabilityTime;
	onConfirm: () => any;
	onCancel: () => any;
}

export class PatientDetailsForm extends React.Component<PatientDetailsFormProps, Appointment> {
	constructor(props, context) {
		super(props, context);
		this.state = this.props.selectedAppointment.linkedAppointment || {};
	}

	public componentWillReceiveProps(nextProps: Readonly<PatientDetailsFormProps>): void {
		const {selectedAppointment} = nextProps;
		if (selectedAppointment !== this.props.selectedAppointment) {
			this.setState(selectedAppointment.linkedAppointment || {});
		}
	}

	public render() {
		const isReadOnly = false;
		const isDisabled = false;
		return (
			<div>
				<h3>View Details</h3>
				<table>
					<tbody>
					<tr>
						<td>{EditFormBase.boundTextboxValue('First', this.state.firstName || '', (firstName) => this.setState({firstName}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Last', this.state.lastName || '', (lastName) => this.setState({lastName}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('DOB', this.state.birthday || '', (birthday) => this.setState({birthday}), '', isReadOnly, isDisabled)}</td>
					</tr>
					<tr>
						<td>{EditFormBase.boundTextboxValue('Phone', this.state.phone || '', (phone) => this.setState({phone}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Email', this.state.email || '', (email) => this.setState({email}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Weight', this.state.weight || '', (weight) => this.setState({weight}), '', isReadOnly, isDisabled)}</td>
					</tr>
					<tr>
						<td>{EditFormBase.boundTextareaValue('Address', this.state.address1 || '', (address1) => this.setState({address1}))}</td>
						<td>{EditFormBase.boundTextboxValue('City', this.state.city || '', (city) => this.setState({city}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('State', this.state.state || '', (state) => this.setState({state}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Zip', this.state.zip || '', (zip) => this.setState({zip}), '', isReadOnly, isDisabled)}</td>
					</tr>
					</tbody>
				</table>
				<hr />
				<table>
					<tbody>
					<tr>
						<td>{EditFormBase.boundTextboxValue('Physician', this.state.doctorName || '', (doctorName) => this.setState({doctorName}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Contact', this.state.doctorPhone || '', (doctorPhone) => this.setState({doctorPhone}), '', isReadOnly, isDisabled)}</td>
						{/*<td>{EditFormBase.boundTextboxValue('View Order', view, (view) => this.setState({view}), '', isReadOnly, isDisabled)}</td>*/}
					</tr>
					</tbody>
				</table>
				<hr />
				<table>
					<tbody>
					<tr>
						<td>{EditFormBase.boundTextboxValue('Carrier', this.state.insuranceCarrier || '', (insuranceCarrier) => this.setState({insuranceCarrier}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Group', this.state.insuranceGroupNumber || '', (insuranceGroupNumber) => this.setState({insuranceGroupNumber}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Policy', this.state.insurancePolicyNumber || '', (insurancePolicyNumber) => this.setState({insurancePolicyNumber}), '', isReadOnly, isDisabled)}</td>
					</tr>
					</tbody>
				</table>

				<div className="centered">
					<button type="button" onClick={(e) => this.doUpdate(e)}>Update</button>
					<button type="button" onClick={(e) => this.doPrint(e)}>Print Data</button>
					<button type="button" onClick={(e) => this.doCancel(e)}>Nevermind</button>
				</div>
			</div>
		);
	}

	private doUpdate(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		new ScheduleApi().appointmentHandlerPUT({
			authToken: getAuthToken(),
			locationId: '',
			req: copyAppointment(this.state),
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

	private doPrint(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		window.print();
	}

	private doCancel(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		if (this.props.onCancel instanceof Function) {
			this.props.onCancel();
		}
	}

}