import * as React from 'react';
import {Appointment, ScheduleApi, SlotAvailabilityTime} from "../api/api";
import {getAuthToken} from "../helpers/authToken";
import copyAppointment from "../helpers/copyAppointment";
import {isEmpty} from "ucshared";
import ReactModal from 'react-modal';
import {TimePickWidget} from "./pick-time-component";
import {IScan, scanTypes} from "../models/Scan";

export interface PatientDetailsFormProps {
	selectedSlotAvailabilityTime: SlotAvailabilityTime;
	onConfirm: () => any;
	onCancel: () => any;
}

export class PatientDetailsForm extends React.Component<PatientDetailsFormProps, Appointment & {isPickTime?: boolean}> {
	constructor(props, context) {
		super(props, context);
		const appointment = this.props.selectedSlotAvailabilityTime.linkedAppointment;
		if (appointment) {
			// standardize json format
			appointment.serviceType = JSON.stringify(JSON.parse(appointment.serviceType || '{}'));
		}
		this.state = appointment || {};
	}

	public componentWillReceiveProps(nextProps: Readonly<PatientDetailsFormProps>): void {
		const {selectedSlotAvailabilityTime} = nextProps;
		if (selectedSlotAvailabilityTime !== this.props.selectedSlotAvailabilityTime) {
			this.setState(selectedSlotAvailabilityTime.linkedAppointment || {});
		}
	}

	public renderSafetyAnswers() {
		if (!this.props.selectedSlotAvailabilityTime) {
			console.log('!this.props.selectedSlotAvailabilityTime');
			return false;
		}
		if (!this.props.selectedSlotAvailabilityTime.linkedAppointment) {
			console.log('!this.props.selectedSlotAvailabilityTime.linkedAppointment');
			return false;
		}
		const json = this.props.selectedSlotAvailabilityTime.linkedAppointment.surveyDataJson;
		const isComplete = !isEmpty(json);
		const q = JSON.parse(json || '{}');
		const safetyItems = {
			"Cardiac pacer": q.pacemaker ? 'yes' : 'no',
			"Stimulator": q.spinalStimulator ? 'yes' : 'no',
			"Brain implant": !!q.neurostimulator,
			"Loop recorder": !!q.loopRecorder,
			"Defibrillator implant": !!q.defibrillatorImplant,
			"Other implants": q.implants ? (`yes:${q.currentImplant}` || 'no detail') : 'no',
			"Metal in eye": q.eye ? 'yes' : 'no',
			"Metal removed": q.eye ? (q.e1 ? 'yes' : 'no') : 'N/A',
			"claustrophobic?": !!q.p1,
			"Contrast allergy": q.AllergicToContrast ? 'yes' : 'no',
			"kidney disease?": !!q.p2,
			"diabetes?": !!q.p3,
		};
		const keys = Object.keys(safetyItems);
		return (
			<React.Fragment>
				<div style={{color: isComplete ? 'black' : 'red'}}>
					Safety form completed: {isComplete ? 'yes' : 'no'}
				</div>
				<div className="qa-container" style={{opacity: isComplete ? 1 : 0.5}}>
					{keys.map((key) => (
						<div key={key} className="qa-item">
							<div className="qa-label">{key}</div>
							<div className="qa-answer">{typeof safetyItems[key] === 'boolean'
								? (safetyItems[key] === true ? 'yes' : 'no')
								: (safetyItems[key])
							}</div>
						</div>
					))}
				</div>
			</React.Fragment>
		)
	}

	private field(name: string, display: string, value: string|undefined, onChange: any) {
		return (
			<React.Fragment>
				<label htmlFor={name} className="flexlabel" style={{textAlign: 'right'}}>
					{display}&nbsp;
				</label>
				<input
					type="text"
					className="flexinput w-input"
					maxLength={256}
					name={name}
					data-name={name}
					id={name}
					value={value || ''}
					onChange={(e) => onChange(e.currentTarget.value)}
				/>
			</React.Fragment>
		);
	}

	public render() {
		// const scan: IScan = JSON.parse(this.state.serviceType || '{}') || {};
		return (
			<div>
				<div className="centered">
					<select onChange={(e) => this.setState({serviceType: e.currentTarget.value})}
							value={this.state.serviceType}>
						{scanTypes.map((tt) => {
							const val = JSON.stringify(tt);
							return (
								<option key={val} value={val}>{tt.name} {tt.contrast} ({tt.time})</option>
							);
						})}
					</select>
				</div>
				<button onClick={(e) => this.pickNewTime(e)} className="link centered">
					{this.state.rowKey}
				</button>
				<div className="inputrow">
					{this.field('first', 'First', this.state.firstName, (firstName) => this.setState({firstName}))}
					{this.field('last', 'Last', this.state.lastName, (lastName) => this.setState({lastName}))}
					{this.field('dob', 'DOB', this.state.birthday, (birthday) => this.setState({birthday}))}
				</div>
				<div className="inputrow">
					{this.field('phone', 'Phone', this.state.phone, (phone) => this.setState({phone}))}
					{this.field('Email', 'Email', this.state.email, (email) => this.setState({email}))}
					{this.field('Weight', 'Weight', this.state.weight, (weight) => this.setState({weight}))}
				</div>
				<div className="inputrow">
					{this.field('Address1', 'Address1', this.state.address1, (address1) => this.setState({address1}))}
					{this.field('Address2', 'Address2', this.state.address2, (address2) => this.setState({address2}))}
					{this.field('City', 'City', this.state.city, (city) => this.setState({city}))}
					{this.field('State', 'State', this.state.state, (state) => this.setState({state}))}
					{this.field('Zip', 'Zip', this.state.zip, (zip) => this.setState({zip}))}
				</div>
				<hr/>
				<div className="inputrow">
					{this.field('doctorName', 'doctorName', this.state.doctorName, (doctorName) => this.setState({doctorName}))}
					{this.field('doctorPhone', 'doctorPhone', this.state.doctorPhone, (doctorPhone) => this.setState({doctorPhone}))}

					View order image below
					{/*<button className="w-button">*/}
						{/*View Order*/}
					{/*</button>*/}
				</div>

				<hr/>
				<div className="inputrow">
					{this.field('insuranceCarrier', 'insuranceCarrier', this.state.insuranceCarrier, (insuranceCarrier) => this.setState({insuranceCarrier}))}
					{this.field('insuranceGroupNumber', 'insuranceGroupNumber', this.state.insuranceGroupNumber, (insuranceGroupNumber) => this.setState({insuranceGroupNumber}))}
					{this.field('insurancePolicyNumber', 'insurancePolicyNumber', this.state.insurancePolicyNumber, (insurancePolicyNumber) => this.setState({insurancePolicyNumber}))}
					{/*<a className="w-button" href="#">View Card Front</a>*/}
					{/*<button className="w-button">View Card Back</button>*/}
				</div>
				<hr/>
				{this.renderSafetyAnswers()}
				<hr/>
				<div className="centered">
					<button type="button" className="button w-button" onClick={(e) => this.doUpdate(e)}>Update</button>
					<button type="button" className="button w-button" onClick={(e) => this.doPrint(e)}>Print Data</button>
					<button type="button" className="button w-button" onClick={(e) => this.doCancel(e)}>Nevermind</button>
				</div>
				{this.renderTimePickModal()}
				<hr />
				<div className="inputrow">
					<img style={{maxWidth: '700px', maxHeight: '500px'}} src={`https://mrischedba06.blob.core.windows.net/uploads/${this.state.orderImageUrl}`}/>
				</div>
				<div className="inputrow">
					<img style={{maxWidth: '700px', maxHeight: '500px'}} src={`https://mrischedba06.blob.core.windows.net/uploads/${this.state.insuranceFrontUrl}`}/>
				</div>
				<div className="inputrow">
					<img style={{maxWidth: '700px', maxHeight: '500px'}} src={`https://mrischedba06.blob.core.windows.net/uploads/${this.state.insuranceBackUrl}`}/>
				</div>
				<hr />
				<h3>Extended Safety Form Data</h3>
				{this.renderSafetyFormTable()}
			</div>
		);
	}

	private doUpdate(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		new ScheduleApi().appointmentHandlerPOST({
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

	private renderTimePickModal() {
		return (this.state.isPickTime && (
			<ReactModal isOpen={true} onRequestClose={() => this.setState({isPickTime: false})}
						className="modal-content-full animated fadeInUp"
						overlayClassName="modal-wrapper">
				<div className="centered white-box">
					<TimePickWidget
						scan={{
							contrast: this.state.serviceType || '',
							name: this.state.serviceType || 'Unknown',
							name2: '',
							name3: '',
							name4: '',
							time: '30'
						}}
						onPick={(slotAvailabilityTime) => this.setTime(slotAvailabilityTime)}
					/>
				</div>
			</ReactModal>
		))
	}

	private setTime(slotAvailabilityTime: SlotAvailabilityTime) {
		if (typeof slotAvailabilityTime.slotId !== 'string') {
			alert('No slotId was specified!');
			return;
		}
		this.setState({
			partitionKey: slotAvailabilityTime.slotId.split(' ')[1],
			rowKey: slotAvailabilityTime.slotId
		});
	}

	private pickNewTime(e) {
		if (e) {
			e.preventDefault();
		}
		this.setState({
			isPickTime: true,
		});
	}

	private renderSafetyFormTable() {
		const sd = JSON.parse(this.state.surveyDataJson || '{}');
		return (
			<table>
				<tbody>
				{Object.keys(sd).map((row) => {
					if (excluded.indexOf(row) > -1) {
						return false;
					}
					return (
						<tr key={row}>
							<td>{row}</td>
							<td>{(typeof sd[row] === 'boolean' ? (sd[row] === true ? <span style={{color: 'red', fontWeight: 'bold'}}>Yes</span> : 'No') : sd[row].toString())}</td>
						</tr>
					);
				})}
				</tbody>
			</table>
		);
	}
}

const excluded = [
	'fname',
	'lname',
	'email',
	'phone',
	'answers',
	'implants',
	'currentImplant',
	'haveOrder',
	'scan',
	'overrideSafetyWarning',
	'height',
	'weight',
	'doctorName',
	'doctorContact',
	'insFront',
	'insBack',
	'mriOrder',
	'carrierNumber',
	'groupNumber',
	'policyNumber',
	'timeSlot',
	'err',
	'dob',
	'address1',
	'address2',
	'city',
	'state',
	'zip',
	'optedIn',
	'validationResult',
];
