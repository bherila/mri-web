import * as React from 'react'
import { Link } from 'gatsby'
import {EditFormBase} from '../../forms';
import * as Api from '../../api/api';
import {isEmpty} from "ucshared";

import Page from '../../components/Page'
import Container from '../../components/Container'
import IndexLayout from '../../layouts'

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {PatientDetailsForm} from "../../components/patient-details";
import {PatientConfirmForm} from "../../components/patient-confirm";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {SignOutButton} from "../../components/sign-out";
import {getAuthToken} from "../../helpers/authToken";

interface ISiteFormState {
	hideUnavailable: boolean;
	hideAvailable: boolean;
	open: boolean;
	reservedUnconfirmed: boolean;
	confirmed: boolean;
	search: string;
	modal: 'confirm' | 'edit' | 'release' | null;
	data: Api.SlotAvailabilityDate[];
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
		new Api.ScheduleApi().userScheduleGET({
			search: '',
			authToken: getAuthToken(),
			locationId: '',
			withContrast: false,
		} as any).then((result) => {
			this.setState({data: result});
		}, (err) => {
			console.log(err);
			// TODO: loginRedirect()
		});
	}

	public doConfirm(e) {
		if (e) {
			e.preventDefault();
		}
		this.setState({modal: 'confirm'});
	}

	public doEdit(e) {
		if (e) {
			e.preventDefault();
		}
		this.setState({modal: 'edit'});
	}

	public doRelease(e) {
		if (e) {
			e.preventDefault();
		}
		this.setState({modal: 'release'});
	}

	public closeModal() {
		this.setState({modal: null});
	}

	public render() {
		return (
			<IndexLayout>
				<Page>
					{this.renderInner()}
				</Page>
			</IndexLayout>
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
		if (this.state.reservedUnconfirmed && slot.isAvailable) {
			return false;
		}
		if (this.state.confirmed && slot.isAvailable) {
			return false;
		}
		return true;
	}

	public renderInner() {
		const {hideUnavailable, hideAvailable, open, reservedUnconfirmed, confirmed, search, data} = this.state;
		const {classes} = this.props;
		return (
			<div>
				<div style={{display: 'flex', flexDirection: 'row', justifyItems: 'stretch'}}>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						[Date picker]
					</div>
				</div>
				<div style={{display: 'flex', flexDirection: 'row', justifyItems: 'stretch'}}>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						{EditFormBase.boundTextboxValue('', search, (search) => this.setState({search}), 'Search')}
					</div>
					<div style={{display: 'flex', flexDirection: 'row', justifySelf: 'flex-end'}}>
						<button>{EditFormBase.boundCheckboxValue('Hide Unavailable', hideUnavailable, (hideUnavailable) => this.setState({hideUnavailable}), false)}</button>
						<button>{EditFormBase.boundCheckboxValue('Hide Available', hideAvailable, (hideAvailable) => this.setState({hideAvailable}), false)}</button>
						<button>{EditFormBase.boundCheckboxValue('Open', open, (open) => this.setState({open, hideUnavailable: false}), false)}</button>
						<button>{EditFormBase.boundCheckboxValue('Reserved, Unconfirmed', reservedUnconfirmed, (reservedUnconfirmed) => this.setState({reservedUnconfirmed}), false)}</button>
						<button>{EditFormBase.boundCheckboxValue('Confirmed', confirmed, (confirmed) => this.setState({confirmed, hideAvailable: false}), false)}</button>
					</div>
				</div>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell component="th">Time Slot</TableCell>
							<TableCell component="th">Status</TableCell>
							<TableCell component="th">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(data || []).map((date) => (date.times || []).map((slot) => this.applies(slot) && (
							<TableRow key={slot.slotId}>
								<TableCell>{date.friendlyBegin}, {slot.time} CST</TableCell>
								<TableCell>{slot.isAvailable ? 'Available' : 'Unavailable'}</TableCell>
								{slot.isAvailable ? (
									<TableCell>
										<button className="w-button" type="button" onClick={(e) => this.doConfirm(e)}>Schedule</button>
									</TableCell>
								):(
                                    <TableCell>
                                        <button className="w-button" type="button" onClick={(e) => this.doConfirm(e)}>Confirm</button>
                                        <button className="w-button" type="button" onClick={(e) => this.doRelease(e)}>Release</button>
                                        <button className="w-button" type="button" onClick={(e) => this.doEdit(e)}>View</button>
                                    </TableCell>
								)}
							</TableRow>
						)))}
					</TableBody>
				</Table>

				<Modal open={this.state.modal === 'release'} onClose={() => this.closeModal()}>
					<div className="centered white-box radiologist">
						<h3>Release Reservation?</h3>
						<h3>12 May 2016 8:00 am John Doe</h3>
						<p>This will open the time slot for future booking.</p>
						<p>Patient data will be removed from this time slot.</p>
						<p><b>Please make sure this time slot is also open in the RIS!</b></p>
						<div className="centered">
							<button className="button w-button" type="button">Release</button>
							<button className="button w-button" type="button">Nevermind</button>
						</div>
					</div>
				</Modal>

				<Modal open={this.state.modal === 'confirm'} onClose={() => this.closeModal()}>
					<PatientConfirmForm
						onConfirm={() => this.closeModal()}
						onCancel={() => this.closeModal()}
						onRequestEdit={() => this.closeModal()}
					/>
				</Modal>

				<Modal open={this.state.modal === 'edit'} onClose={() => this.closeModal()}>
				<div className="centered white-box">
					<PatientDetailsForm
						onConfirm={() => this.closeModal()}
						onCancel={() => this.closeModal()}
					/>
				</div>
				</Modal>

				<SignOutButton/>
			</div>
		);
	}
}
// We need an intermediary variable for handling the recursive nesting.
const SitePageWrapped = withStyles(styles)(SitePage);
export default SitePageWrapped;
