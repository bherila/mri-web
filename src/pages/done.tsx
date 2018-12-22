import * as React from 'react'
import IndexLayout from '../layouts'
import {FormBasePage} from "../helpers/FormBasePage";

class FinishedPage extends FormBasePage {
	constructor(props, context) {
		super(props, context);
	}
	public componentDidMount() {
		super.componentDidMount();
	}

	public render() {
		// validate
		if (!this.state.timeSlot) {
			if (typeof location !== 'undefined') {
				location.href = '/pick-time';
			}
			return false;
		}
		if (!this.state.scan) {
			if (typeof location !== 'undefined') {
				location.href = '/mri-type';
			}
			return false;
		}

		// compute
		const time = (this.state.timeSlot.slotId || 'no time selected')
			.replace(/(\d{4})-(\d{2})-(\d{2})T([^\s]{5}).*/g, "$2/$3/$1 at $4");

		// render
		return (
			<IndexLayout>
				<section id="Q2" className="vspace80 w-container">
					<div className="vspace80 centered w-row" style={{marginBottom: '5em'}}>
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3" />
						<div className="w-col w-col-6" style={{paddingBottom: '5em', paddingTop: '3em'}}>
							<h2>All Done, {this.state.fname}!</h2>
							<p>Scheduled for:</p>
							<p><b>{this.state.scan.name}</b></p>
							<p><b>{time}</b></p>
							<p>
								We'll email you a confirmation of your appointment. And if
								there's anything else we need, we'll get in touch.
							</p>
							<p>
								On the day of your scan, wear comfortable clothes without metal of any kind.
								If you're using insurance, don't forget your card.
							</p>
							<h3>
								We can't wait to see you!
							</h3>
						</div>
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3" />
					</div>
				</section>

			</IndexLayout>
		);
	}
}

export default FinishedPage;
