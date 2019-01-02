import * as React from 'react'
import * as Api from '../api/api'
import IndexLayout from '../layouts'
import {Ez123, MriTypeBreadcrumb} from "../components/breadcrumb";
import {navigate} from "gatsby";
import {SafetyState} from "../models/SafetyState";
import ReactModal from 'react-modal';
import {IScan} from "../models/Scan";

const take = 4;

interface TimePickState {
	err: any,
	offset: number;
	total: number;
	qna: SafetyState;
	times: Api.SlotAvailabilityDate[];
	showModal: boolean;
}

export class TimePickWidget extends React.Component<{scan: IScan, onPick: (time: Api.SlotAvailabilityTime) => any}, TimePickState> {
	constructor(props, context) {
		super(props, context);
		this.state = {
			err: '',
			offset: 0,
			total: 14,
			qna: SafetyState.loadState(),
			times: [],
			showModal: false,
		};
	}

	public componentDidMount() {
		new Api.ScheduleApi().timeSlotsGET({
			withContrast: this.props.scan.contrast === 'with and without contrast',
			locationId: ''
		}).then((result) => {
			if (result.value) {
				this.setState({
					times: result.value || [],
					total: result.value.length || 0,
					qna: SafetyState.loadState(),
				});
			} else {
				this.setState({
					err: result.message || 'Error',
					qna: SafetyState.loadState(),
				});
			}
		}, (err) => this.setState({
			err,
			qna: SafetyState.loadState(),
		}));
	}

	public renderSlotAvailabilityDate(dt: Api.SlotAvailabilityDate, needConfirm: boolean) {
		return (
			<div className="timeslotcolumn">
				<h3 style={{whiteSpace: 'nowrap'}}>{dt.friendlyBegin}</h3>
				{dt.times ? dt.times.map((timeSlot) => (
					<a key={timeSlot.time}
					   href="#"
					   className={`buttontimeslot ${timeSlot.isAvailable ? '' : 'unavailable '}w-button`}
					   onClick={() => this.pickTime(timeSlot, needConfirm)}
					>
						{timeSlot.time}
					</a>
				)) : <div>dt.times is {typeof dt.times}</div>}
			</div>
		);
	}

	public renderModal() {
		return (
			<ReactModal
				isOpen={this.state.showModal}
				className="modal-content animated fadeInUp"
				overlayClassName="modal-wrapper"
			>
				<p><b>The time you selected is tomorrow.</b></p>
				<p>We won't have time to obtain prior authorization from your insurance carrier. If you aren't using insurance, this won't be a problem.</p>
				<p>Are you sure you want to select this time?</p>
				<p>
					<button type="button"
							className="button w-button"
							onClick={() => this.props.onPick(this.state.selectedTime)}>
						Yes, continue
					</button>
					<button type="button"
							className="button w-button"
							onClick={() => this.setState({showModal: false})}>
						No, change time
					</button>
				</p>
			</ReactModal>
		);
	}

	public render() {
		const {offset, total, err, times} = this.state;
		return (
			<React.Fragment>
				<div className="w-row">
					<div className="w-col w-col-2">
						<div className="timeslotcolumn">
							{offset > 0 && (
								<a href="#"
								   onClick={() => this.setState({offset: offset - 1})}
								   className="buttontimeslot w-button">
									&laquo; Earlier Dates
								</a>
							)}
						</div>
					</div>
					{times && times.map((date, i) => (
						(i >= offset && (i - offset) < take) && (
							<div key={JSON.stringify(date || i)} className="w-col w-col-2">
								{this.renderSlotAvailabilityDate(date, i < 1)}
							</div>
						)
					))}
					{offset + take < total && (
						<div className="w-col w-col-2">
							<div className="timeslotcolumn">
								<a href="#"
								   onClick={() => this.setState({offset: offset + 1})}
								   className="buttontimeslot w-button">
									Later Dates &gt;&gt;
								</a>
							</div>
						</div>
					)}
				</div>
				{this.renderModal()}
			</React.Fragment>
		);
	}

	private pickTime(timeSlot: Api.SlotAvailabilityTime, needConfirm: boolean) {
		if (timeSlot.isAvailable) {
			if (needConfirm) {
				this.setState({showModal: true});
			} else {
				this.props.onPick(timeSlot);
			}
		}
	}
}