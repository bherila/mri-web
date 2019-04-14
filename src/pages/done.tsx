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
						<div className="w-col w-col-6" style={{paddingBottom: '3em', paddingTop: '3em'}}>
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
							<p>You may print and fill out the following forms, to speed things up on the day of your exam.</p>
							<ol>
								<li><a href="https://assets.website-files.com/5b9e87c40899a487ba8091e4/5cb2b2f637cbae0f760714df_Safety%20Screening%20Questionnaire%20v1.pdf" target="_blank">Unified Consent &amp;&nbsp;Authorization Form&nbsp;(PDF)</a></li>
								<li><a href="https://assets.website-files.com/5b9e87c40899a487ba8091e4/5cb2b2f637cbae0f760714df_Safety%20Screening%20Questionnaire%20v1.pdf" target="_blank">Safety Screening&nbsp;(PDF)</a></li>
							</ol>
							<p>Here is a notice of our privacy practices. This is for your review and records; there is no need to bring this form.</p>
							<p><a href="https://assets.website-files.com/5b9e87c40899a487ba8091e4/5cb2b2f646fa447697bfb91e_Notice_of_Privacy_Practices_ideal_MRI.pdf" target="_blank">Privacy Notice (PDF)</a></p>
						</div>
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3" />
					</div>
				</section>

			</IndexLayout>
		);
	}
}

export default FinishedPage;
