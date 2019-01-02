import * as React from 'react'
import {EditFormBase} from '../../forms';
import * as Api from '../../api/api';
import Page from '../../components/Page'
import AdminLayout from '../../layouts/admin'
import {PatientDetailsForm} from "../../components/patient-details";
import {PatientConfirmForm} from "../../components/patient-confirm";
import {SignOutButton} from "../../components/sign-out";
import {getAuthToken} from "../../helpers/authToken";
import {navigate} from "gatsby";
import {PatientReleaseForm} from "../../components/patient-release";
import ReactModal from 'react-modal';
import {isEmpty} from 'ucshared';
import {SlotAvailabilityTime} from "../../api/api";
import copyAppointment from "../../helpers/copyAppointment";

interface ISiteFormState {
	hideUnavailable: boolean;
	hideAvailable: boolean;
	open: boolean;
	reservedUnconfirmed: boolean;
	confirmed: boolean;
	search: string;
	modal: 'confirm' | 'edit' | 'release' | null;
	data: Api.SlotAvailabilityDate[];
	selectedItem: Api.SlotAvailabilityTime | null;
}

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
			selectedItem: null,
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

	private doManualSchedule(e: React.MouseEvent<HTMLButtonElement>, slot: SlotAvailabilityTime) {
		if (e) {
			e.preventDefault();
		}
		if (!slot.slotId) {
			alert('no slotId!');
			return;
		}
		this.setState({
			modal: 'edit',
			selectedItem: {
				slotId: slot.slotId,
				linkedAppointment: {
					partitionKey: slot.slotId.split(' ')[1],
					rowKey: slot.slotId,
					resourceId: slot.resourceId,
					serviceLength: 30,
				},
				isAvailable: false,
				isContrastAvailable: true,
				isContrastRequired: false,
				isHidden: false,
				resourceId: slot.resourceId,
				time: slot.time,
			},
		});
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
		if (this.state.confirmed) {
			if (!slot.linkedAppointment || !slot.linkedAppointment.confirmed) {
				return false;
			}
		}
		return true;
	}

	public renderInner() {
		return (
			<div>
				<h1>Waco Location</h1>
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
						<button>{EditFormBase.boundCheckboxValue('Confirmed', this.state.confirmed, (confirmed) => this.setConfirmed(confirmed), false)}</button>
					</div>
				</div>
				{(this.state.data || []).map((date) => (
					<div key={date.friendlyBegin}>
					<h3>{date.friendlyBegin}</h3>
					<table className="blue" style={{fontSize: '12pt'}}>
						<tbody>
							{(date.times || []).map((slot) => {
								if (!this.applies(slot)) {
									return false;
								}
								let warnState = '';
								if (!!slot.linkedAppointment) {
									if (!slot.linkedAppointment.surveyDataJson) {
										warnState = '⚠️';
									}
									if (slot.linkedAppointment.confirmed) {
										warnState = '✅';
									}
									if (!isEmpty(slot.linkedAppointment.safetyWarnings)) {
										warnState = '🛑';
									}
								}
								return(
									<tr key={slot.slotId}>
										<td>{date.friendlyBegin}, {slot.time} CST</td>
										<td>{warnState}</td>
										<td>{slot.isAvailable ? 'Available' : 'Unavailable'}</td>
										{this.renderSlotActionCell(slot)}
									</tr>
								)
							})}
						</tbody>
					</table>
					</div>
				))}
				{this.renderModals()}
			</div>
		);
	}

	private renderSlotActionCell(slot: Api.SlotAvailabilityTime) {
		if (slot.isAvailable) {
			return (
				<td>
					<button className="button sm w-button" type="button" onClick={(e) => this.doManualSchedule(e, slot)}>
						Manual Schedule
					</button>
				</td>
			);
		}
		if (!!slot.linkedAppointment) {
			return (
				<td>
					<button className="button sm w-button" type="button" onClick={(e) => this.doConfirm(e, slot)}>Confirm</button>
					<button className="button sm w-button" type="button" onClick={(e) => this.doRelease(e, slot)}>Release</button>
					<button className="button sm w-button" type="button" onClick={(e) => this.doEdit(e, slot)}>View</button>
				</td>
			);
		}
		return (
			<td>&nbsp;</td>
		);
	}

	private setConfirmed(confirmed: boolean) {
		this.setState({confirmed, hideAvailable: false});
		if (confirmed) {
			this.setState({reservedUnconfirmed: false, open: false});
		}
	}

	private renderModals() {
		if (!this.state.selectedItem) {
			return false;
		}
		return (
			<React.Fragment>
				<ReactModal isOpen={this.state.modal === 'release'} onRequestClose={() => this.closeModal()}
							className="modal-content animated fadeInUp"
							overlayClassName="modal-wrapper">
					<PatientReleaseForm
						selectedSlot={this.state.selectedItem}
						onConfirm={() => this.closeModal()}
						onCancel={() => this.closeModal()}
						onRequestEdit={() => this.closeModal()}
					/>
				</ReactModal>

				{this.state.selectedItem.linkedAppointment && (
					<ReactModal isOpen={this.state.modal === 'confirm'} onRequestClose={() => this.closeModal()}
								className="modal-content animated fadeInUp"
								overlayClassName="modal-wrapper">
						<PatientConfirmForm
							selectedAppointment={this.state.selectedItem.linkedAppointment}
							onConfirm={() => this.closeModal()}
							onCancel={() => this.closeModal()}
							onRequestEdit={() => this.setState({modal: 'edit'})}
						/>
					</ReactModal>
				)}

				<ReactModal isOpen={this.state.modal === 'edit'} onRequestClose={() => this.closeModal()}
							className="modal-content-full animated fadeInUp"
							overlayClassName="modal-wrapper">
					<div className="centered white-box">
						<PatientDetailsForm
							selectedAppointment={this.state.selectedItem}
							onConfirm={() => this.closeModal()}
							onCancel={() => this.closeModal()}
						/>
					</div>
				</ReactModal>
			</React.Fragment>
		);
	}
}

// We need an intermediary variable for handling the recursive nesting.
const SitePageWrapped = SitePage;
export default SitePageWrapped;
