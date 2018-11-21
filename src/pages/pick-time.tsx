import * as React from 'react'
import * as Api from '../api/api'
import IndexLayout from '../layouts'
import {Ez123, MriTypeBreadcrumb} from "../components/breadcrumb";
import {navigate} from "gatsby";
import {SafetyState} from "../models/SafetyState";

const take = 4;

interface IState
{
	err: any,
	offset: number;
	total: number;
	qna: SafetyState;
	times: Api.SlotAvailabilityDate[];
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
		};
	}

	public componentDidMount() {
		if (typeof sessionStorage !== 'undefined') {
			const scan = this.state.qna.scan;
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

	public renderSlotAvailabilityDate(dt: Api.SlotAvailabilityDate) {
		return (
			<div className="timeslotcolumn">
				<h3>{dt.friendlyBegin}</h3>
				{dt.times ? dt.times.map((timeSlot) => (
					<a key={timeSlot.time}
					   href="#"
					   className={`buttontimeslot ${timeSlot.isAvailable ? '' : 'unavailable '}w-button`}
					   onClick={() => this.pickTime(timeSlot)}
					>
						{timeSlot.time}
					</a>
				)) : <div>dt.times is {typeof dt.times}</div>}
			</div>
		);
	}

	public render() {
		const {offset, total, err, times} = this.state;
		return (
			<IndexLayout>
			<section id="Q2" className="vspace80 w-container">
				<div>
					<Ez123 num={2} />
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
						<h3>Choose an available time slot to book your {this.state.qna.scan && this.state.qna.scan.time} appointment.</h3>
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
								{this.renderSlotAvailabilityDate(date)}
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
			</IndexLayout>
		);
	}

	private pickTime(timeSlot: Api.SlotAvailabilityTime) {
		if (timeSlot.isAvailable) {
			sessionStorage.setItem('timeSlot', JSON.stringify(timeSlot));
			navigate('/addl-info');
		}
	}
}

export default PickTimePage;
