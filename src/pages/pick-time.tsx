import * as React from 'react'
import * as Api from '../api/api'
import IndexLayout from '../layouts'
import {Ez123, MriTypeBreadcrumb} from "../components/breadcrumb";
import {navigate} from "gatsby";
import {SafetyState} from "../models/SafetyState";
import ReactModal from 'react-modal';

const take = 4;

interface IState
{
	err: any,
	offset: number;
	total: number;
	qna: SafetyState;
	times: Api.SlotAvailabilityDate[];
	showModal: boolean;
}

class PickTimePage extends React.Component<{}, IState> {
	constructor(props, context) {
		super(props, context);
		this.state = {
			qna: SafetyState.loadState(),
			times: [],
			err: null,
			offset: 0,
			total: 0,
			showModal: false,
		};
	}

	public componentDidMount() {
		if (typeof sessionStorage !== 'undefined') {
			const scan = this.state.qna.scan;
			if (!scan) {
				location.href = '/?err=no-scan';
				return;
			}
			new Api.ScheduleApi().timeSlotsGET({
				withContrast: scan.contrast === 'with and without contrast',
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
	}

	public renderSlotAvailabilityDate(dt: Api.SlotAvailabilityDate, needConfirm: boolean) {
		return (
			<div className="timeslotcolumn">
				<h3>{dt.friendlyBegin}</h3>
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
				<p>We won't have enough time to verify your insurance. Are you sure you want to select this time?</p>
				<p>
					<button type="button"
							className="button w-button"
							onClick={() => navigate('/addl-info')}>
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
			<IndexLayout>
				<section id="Q2" className="vspace80 w-container">
					<div>
						<Ez123 num={2}/>
						<div className="breadcrumb-stack animated zoomIn">
							<MriTypeBreadcrumb value={this.state.qna.scan}/>
						</div>
					</div>
					<div className="w-row">
						<div className="centered w-col w-col-3">
							<img
								src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"
								width={150}
								height={150}
							/>
						</div>
						<div className="w-col w-col-9">
							<h2>Almost done {this.state.qna.fname}!</h2>
							<h3>Choose an available time slot to book
								your {this.state.qna.scan && this.state.qna.scan.time} appointment.</h3>
							<p>If you're interested in a same day appointment, please call us for same day availability
								at <a href="tel:+18334332567">1 833-IDEAL-MR</a>.</p>
							{err && <p>Oops! {err.toString()}</p>}
						</div>
					</div>
					<div className="w-row">
						<div className="w-col w-col-2">
							<div className="timeslotcolumn">
								{offset > 0 && (
									<a href="#"
									   onClick={() => this.setState({offset: offset - 1})}
									   className="buttontimeslot w-button">
										Later Dates &gt;&gt;
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
				</section>
				{this.renderModal()}
			</IndexLayout>
		);
	}

	private pickTime(timeSlot: Api.SlotAvailabilityTime, needConfirm: boolean) {
		if (timeSlot.isAvailable) {
			sessionStorage.setItem('timeSlot', JSON.stringify(timeSlot));
			if (needConfirm) {
				this.setState({showModal: true});
			} else {
				navigate('/addl-info');
			}
		}
	}
}

export default PickTimePage;
