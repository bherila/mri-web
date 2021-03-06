import * as React from 'react'
import * as Api from '../api/api'
import IndexLayout from '../layouts'
import {Ez123, MriTypeBreadcrumb} from "../components/breadcrumb";
import {navigate} from "gatsby";
import {SafetyState} from "../models/SafetyState";
import {ScheduleApi} from "../api/api";
import {FormBasePage} from "../helpers/FormBasePage";
import {TimePickWidget} from "../components/pick-time-component";

interface IState
{
	qna: SafetyState;
}

class PickTimePage extends React.Component<{}, IState> {
	constructor(props, context) {
		super(props, context);
		this.state = {
			qna: SafetyState.loadState(),
		};
	}

	public componentDidMount() {
		if (typeof sessionStorage !== 'undefined') {
			const scan = this.state.qna.scan;
			if (!scan) {
				location.href = '/?err=no-scan';
				return;
			}
			this.setState({
				qna: SafetyState.loadState(),
			});
		}
	}

	public render() {
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
					<div className="centered w-col w-col-3 w-hidden-tiny" />
					<div className="centered w-col w-col-6">
						<h3>Almost done, {this.state.qna.fname}!</h3>
						<h3>
							Choose an available time slot to book
							your {this.state.qna.scan && this.state.qna.scan.time} appointment.
						</h3>
						<p>
							If you're interested in a same day appointment, please call us at
							<a href="tel:+18334332567">1 833-IDEAL-MR</a>.
						</p>
					</div>
				</div>
				{this.state.qna.scan && (
					<TimePickWidget
						onPick={(timeSlot) => this.pickTime(timeSlot)}
						scan={this.state.qna.scan}
					/>
				)}
			</section>
			</IndexLayout>
		);
	}

	private pickTime(timeSlot: Api.SlotAvailabilityTime) {
		if (timeSlot.isAvailable) {
			sessionStorage.setItem('timeSlot', JSON.stringify(timeSlot));

			// attempt to release the time slot
			new ScheduleApi().appointmentHandlerDELETE({
				authToken: '',
				req: FormBasePage.getAppointment()
			});
			navigate('/addl-info');
		}
	}
}

export default PickTimePage;
