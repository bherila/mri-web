import * as React from 'react'
import * as Api from '../api/api'
import IndexLayout from '../layouts'
import {Ez123, MriTypeBreadcrumb} from "../components/breadcrumb";

const take = 4;

interface IState
{
	fname: string, times: Api.SlotAvailabilityDate[] | null, err: any, offset: number;
	lname: string;
	scan: string;
	haveOrder?: boolean;
	total: number;
}

class PickTimePage extends React.Component<{}, IState> {
	constructor(props, context) {
		super(props, context);
		this.state = {
			fname: '',
			lname: '',
			scan: '',
			times: null,
			err: null,
			offset: 0,
			total: 0,
		};
	}

	public componentDidMount() {
		if (typeof sessionStorage !== 'undefined') {
			const fname = sessionStorage.getItem('fname') || '';
			const lname = sessionStorage.getItem('lname') || '';
			const scan = JSON.parse(sessionStorage.getItem('scan') || '{}');
			const haveOrder = sessionStorage.getItem('haveOrder') === 'true';
			this.setState({fname, lname, haveOrder, scan});
		}
		new Api.ScheduleApi().timeSlotsGET({contrast: 'false', locationId: ''}).then((result) => {
			this.setState({times: result, total: result.length});
		}, (err) => this.setState({err}));
	}

	public renderSlotAvailabilityDate(dt: Api.SlotAvailabilityDate) {
		return (
			<div className="timeslotcolumn">
				<h3>{dt.friendlyBegin}</h3>
				{dt.times ? dt.times.map((timeSlot) => (
					<a key={timeSlot.time}
					   href="/addl-info" className={`buttontimeslot ${timeSlot.isAvailable ? '' : 'unavailable '}w-button`}>
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
					<div className="breadcrumb-stack">
						<MriTypeBreadcrumb value={this.state.scan}/>
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
						<h2>Almost done!</h2>
						<h3>Choose an available time slot to book your appointment.</h3>
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
							<div className="w-col w-col-2">
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
}

export default PickTimePage;
