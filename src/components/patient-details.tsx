import * as React from 'react';
import {EditFormBase} from "../forms";

export interface PatientDetailsFormProps {
	onConfirm: () => any;
	onCancel: () => any;
}

export class PatientDetailsForm extends React.Component<PatientDetailsFormProps, any> {
	constructor(props, context) {
		super(props, context);
		this.state = {
			first: '',
			last: '',
			dob: '',
			phone: '',
			email: '',
			weight: '',
			address: '',
			city: '',
			state: '',
			zip: '',
			physician: '',
			contact: '',
			view: '',
			carrier: '',
			group: '',
			policy: '',
		};
	}

	public render() {
		const isReadOnly = false;
		const isDisabled = false;
		const {
			first,
			last,
			dob,
			phone,
			email,
			weight,
			address,
			city,
			state,
			zip,
			physician,
			contact,
			view,
			carrier,
			group,
			policy,
		} = this.state;
		return (
			<div>
				<h3>View Details</h3>
				<table>
					<tr>
						<td>{EditFormBase.boundTextboxValue('First', first, (first) => this.setState({first}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Last', last, (last) => this.setState({last}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('DOB', dob, (dob) => this.setState({dob}), '', isReadOnly, isDisabled)}</td>
					</tr>
					<tr>
						<td>{EditFormBase.boundTextboxValue('Phone', phone, (phone) => this.setState({phone}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Email', email, (email) => this.setState({email}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Weight', weight, (weight) => this.setState({weight}), '', isReadOnly, isDisabled)}</td>
					</tr>
					<tr>
						<td>{EditFormBase.boundTextareaValue('Address', address, (address) => this.setState({address}))}</td>
						<td>{EditFormBase.boundTextboxValue('City', city, (city) => this.setState({city}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('State', state, (state) => this.setState({state}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Zip', zip, (zip) => this.setState({zip}), '', isReadOnly, isDisabled)}</td>
					</tr>
				</table>
				<hr />
				<table>
					<tr>
						<td>{EditFormBase.boundTextboxValue('Physician', physician, (physician) => this.setState({physician}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Contact', contact, (contact) => this.setState({contact}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('View', view, (view) => this.setState({view}), '', isReadOnly, isDisabled)}</td>
					</tr>
				</table>
				<hr />
				<table>
					<tr>
						<td>{EditFormBase.boundTextboxValue('Carrier', carrier, (carrier) => this.setState({carrier}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Group', group, (group) => this.setState({group}), '', isReadOnly, isDisabled)}</td>
						<td>{EditFormBase.boundTextboxValue('Policy', policy, (policy) => this.setState({policy}), '', isReadOnly, isDisabled)}</td>
					</tr>
				</table>

				<div className="centered">
					<button type="button">Update</button>
					<button type="button">Print Data</button>
					<button type="button">Nevermind</button>
				</div>
			</div>
		);
	}
}