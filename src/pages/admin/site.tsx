import * as React from 'react'
import {EditFormBase} from '../../forms';
import * as Api from '../../api/api';
import Page from '../../components/Page'
import AdminLayout from '../../layouts/admin'
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {PatientDetailsForm} from "../../components/patient-details";
import {PatientConfirmForm} from "../../components/patient-confirm";
import {SignOutButton} from "../../components/sign-out";
import {getAuthToken} from "../../helpers/authToken";
import {navigate} from "gatsby";
import {PatientReleaseForm} from "../../components/patient-release";

interface ISiteFormState {
	hideUnavailable: boolean;
	hideAvailable: boolean;
	open: boolean;
	reservedUnconfirmed: boolean;
	confirmed: boolean;
	search: string;
	modal: 'confirm' | 'edit' | 'release' | null;
	data: Api.SlotAvailabilityDate[];
	selectedItem: Api.SlotAvailabilityTime;
}

const styles = (theme: any) => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
	},
	table: {
		minWidth: 700,
	},
});

class SitePage extends React.Component<{classes: any}, ISiteFormState>{
	constructor(props, context) {
		super(props, context);
		this.state = {
			hideUnavailable: false,
			hideAvailable: false,
			open: false,
			reservedUnconfirmed: false,
			confirmed: false,
			search: '',
			modal: null,
			data: [],
		};
	}

	public componentDidMount() {
		new Api.ScheduleApi().timeSlotsGET({
			search: '',
			authToken: getAuthToken(),
			locationId: '',
			withContrast: false,
		} as any).then((result) => {
			this.setState({data: result.value || []});
		}, (err) => {
			console.log(err);
			// TODO: loginRedirect()
		});
	}

	public doConfirm(e, selectedItem: Api.SlotAvailabilityTime) {
		if (e) {
			e.preventDefault();
		}
		this.setState({selectedItem, modal: 'confirm'});
	}

	public doEdit(e, selectedItem: Api.SlotAvailabilityTime) {
		if (e) {
			e.preventDefault();
		}
		this.setState({selectedItem, modal: 'edit'});
	}

	public doRelease(e, selectedItem: Api.SlotAvailabilityTime) {
		if (e) {
			e.preventDefault();
		}
		this.setState({selectedItem, modal: 'release'});
	}

	public closeModal() {
		this.setState({modal: null});
		this.componentDidMount();
	}

	public render() {
		return (
			<AdminLayout>
				<Page>
					{this.renderInner()}
				</Page>
			</AdminLayout>
		);
	}

	public applies(slot: Api.SlotAvailabilityTime) {
		if (this.state.open && !slot.isAvailable) {
			return false;
		}
		if (this.state.hideUnavailable && !slot.isAvailable) {
			return false;
		}
		if (this.state.hideAvailable && slot.isAvailable) {
			return false;
		}
		if (this.state.reservedUnconfirmed && slot.linkedAppointment === null) {
			return false;
		}
		if (this.state.confirmed && slot.isAvailable) {
			return false;
		}
		return true;
	}

	public renderInner() {
		const {classes} = this.props;
		return (
			<div>
				<h1>Default Location</h1>


				<div style={{display: 'flex', flexDirection: 'row', justifyItems: 'stretch'}}>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						[Date picker]
					</div>
					<button className="w-button" type="button" onClick={() => navigate('/admin/rules')}>
						Manage availability rules
					</button>

					<SignOutButton/>
				</div>
				<div style={{display: 'flex', flexDirection: 'row', justifyItems: 'stretch'}}>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						{EditFormBase.boundTextboxValue('', this.state.search, (search) => this.setState({search}), 'Search')}
					</div>
					<div style={{display: 'flex', flexDirection: 'row', justifySelf: 'flex-end'}}>
						<button>{EditFormBase.boundCheckboxValue('Hide Unavailable', this.state.hideUnavailable, (hideUnavailable) => this.setState({hideUnavailable}), false)}</button>
						<button>{EditFormBase.boundCheckboxValue('Hide Available', this.state.hideAvailable, (hideAvailable) => this.setState({hideAvailable}), false)}</button>
						<button>{EditFormBase.boundCheckboxValue('Open', this.state.open, (open) => this.setState({open, hideUnavailable: false}), false)}</button>
						<button>{EditFormBase.boundCheckboxValue('Reserved, Unconfirmed', this.state.reservedUnconfirmed, (reservedUnconfirmed) => this.setState({reservedUnconfirmed}), false)}</button>
						<button>{EditFormBase.boundCheckboxValue('Confirmed', this.state.confirmed, (confirmed) => this.setState({confirmed, hideAvailable: false}), false)}</button>
					</div>
				</div>
				{(this.state.data || []).map((date) => (
					<div key={date.friendlyBegin}>
					<h3>{date.friendlyBegin}</h3>
					<table className="blue">
						<tbody>
							{(date.times || []).map((slot) => this.applies(slot) && (
								<tr key={slot.slotId}>
									<td>{date.friendlyBegin}, {slot.time} CST</td>
									<td>{slot.isAvailable ? 'Available' : 'Unavailable'}</td>
									{this.renderSlotActionCell(slot)}
								</tr>
							))}
						</tbody>
					</table>
					</div>
				))}

				<Modal open={this.state.modal === 'release'} onClose={() => this.closeModal()}>
					<PatientReleaseForm
						selectedSlot={this.state.selectedItem}
						onConfirm={() => this.closeModal()}
						onCancel={() => this.closeModal()}
						onRequestEdit={() => this.closeModal()}
					/>
				</Modal>

				{(this.state.selectedItem || {}).linkedAppointment && (
					<Modal open={this.state.modal === 'confirm'} onClose={() => this.closeModal()}>
						<PatientConfirmForm
							selectedAppointment={this.state.selectedItem.linkedAppointment || {}}
							onConfirm={() => this.closeModal()}
							onCancel={() => this.closeModal()}
							onRequestEdit={() => this.closeModal()}
						/>
					</Modal>
				)}

				<Modal open={this.state.modal === 'edit'} onClose={() => this.closeModal()}>
				<div className="centered white-box">
					<PatientDetailsForm
						selectedAppointment={this.state.selectedItem}
						onConfirm={() => this.closeModal()}
						onCancel={() => this.closeModal()}
					/>
				</div>
				</Modal>

			</div>
		);
	}

	private renderSlotActionCell(slot: Api.SlotAvailabilityTime) {
		if (slot.isAvailable) {
			return (
				<td>
					<button className="w-button" type="button" onClick={(e) => this.doEdit(e, slot)}>
						Manual Schedule
					</button>
				</td>
			);
		}
		if (!!slot.linkedAppointment) {
			return (
				<td>
					<button className="w-button" type="button" onClick={(e) => this.doConfirm(e, slot)}>Confirm</button>
					<button className="w-button" type="button" onClick={(e) => this.doRelease(e, slot)}>Release</button>
					<button className="w-button" type="button" onClick={(e) => this.doEdit(e, slot)}>View</button>
				</td>
			);
		}
		return (
			<td>-</td>
		);
	}
}
// We need an intermediary variable for handling the recursive nesting.
const SitePageWrapped = withStyles(styles)(SitePage);
export default SitePageWrapped;
