import * as React from 'react'

import IndexLayout from '../layouts'
import {BigButton} from "../components/BigBtn";
import {TextQuestion, YesNoQuestion} from "../components/Questions";
import {Ez123, MriTypeBreadcrumb, OrderBreadcrumb, TimeslotBreadcrumb} from "../components/breadcrumb";
import ReactModal from 'react-modal';
import {FormBasePage} from "../helpers/FormBasePage";

const qs = [
	{id: 'pacemaker', q: 'a cardiac pacemaker?', r: false},
	{id: 'defibrillatorImplant', q: 'implanted defibrillator (also called ICD or AICD)?', r: false},
	{id: 'spinalStimulator', q: 'a spinal stimulator?', r: false},
	{id: 'loopRecorder', q: 'a loop recorder?', r: false},
	{id: 'neurostimulator', q: 'a brain neurostimulator?', r: false},
];

const qEye = [
	{id: 'e1', q: 'Was it completely removed?', r: true },
	{id: 'e2', q: 'Have you had an xray of your eyes showing no metal?', r: false },
	{id: 'e3', q: 'Have you had an MRI since the injury?', r: false },
];

const qPost = [
	{id: 'p1', q: 'Are you claustrophobic?', r: false},
	{id: 'p2', q: 'Are you allergic to IV contrast or MRI contrast?', r: false},
	{id: 'p3', q: 'Do you have any kidney disease?', r: false},
	{id: 'p4', q: 'Do you have diabetes?', r: false},
];


class SafetyQuestions extends FormBasePage {
	constructor(props, context) {
		super(props, context);
	}
	public componentDidMount() {
		super.componentDidMount();
	}

	public addImplant() {
		const implants = this.state.implants.slice(0);
		implants.push(this.state.currentImplant);
		this.setState({implants});
	}

	public removeImplant() {
		console.log('TODO');
	}

	public validate(qArray) {
		for (let i = 0; i < qArray.length; ++i) {
			const ans = this.state.answers[qArray[i].q];
			if (typeof ans === 'undefined') {
				continue;
			}
			if (ans !== qArray[i].r) {
				return false;
			}
		}
		return true;
	}

	public renderQuestionSet(qArray) {
		return qArray.map((item) => {
			if (typeof item.q === 'string') {
				return (
					<YesNoQuestion
						key={item.q}
						id={item.id}
						val={this.getAns(item.q)}
						onChange={(val) => this.ans(item.q, val)}
						text={item.q}
					/>
				);
			}
		});
	}

	public isValid() {
		if (!this.validate(qs)) return false;
		if (!this.validate(qEye)) return false;
		return true;
	}

	public render() {
		return (
			<IndexLayout>
				<section id="Q2" className="vspace80 w-container">
					<div>
						<Ez123 num={3} />
						<div className="breadcrumb-stack">
							<OrderBreadcrumb value={this.state.haveOrder}/>
							<MriTypeBreadcrumb value={this.state.scan}/>
							<TimeslotBreadcrumb slot={this.state.timeSlot} reserved={true} />
						</div>
					</div>

					<h2>We need to ask some safety questions before we can finish scheduling you.</h2>

					<h3>Do you have...</h3>

					{this.renderQuestionSet(qs)}

					<ReactModal
						isOpen={!this.isValid() && !this.state.overrideSafetyWarning}
								className="modal-content animated fadeInUp"
								overlayClassName="modal-wrapper"
					>
						<p>Due to your medical history, we are unable to safely perform an MRI. If you feel that you are still a candidate for an MRI, you may submit the form anyway and we will contact you for further information.</p>
						<p>
							<button type="button"
									className="button w-button"
									onClick={() => this.setState({overrideSafetyWarning: true})}>
								Continue Anyway
							</button>
						</p>
					</ReactModal>

					<div>
						<YesNoQuestion
							id="implants"
							text="Do you have any other implants?"
							onChange={(val) => this.ans('implants', val)}
							val={this.getAns('implants')}
						>
							<TextQuestion
								id="implants"
								val={this.state.currentImplant}
								onChange={(currentImplant) => this.setState({currentImplant})}
								text="Tell us as much as you can about them."
							/>
						</YesNoQuestion>

						<YesNoQuestion
							id="eye"
							text="Have you ever had injury to your eye with metal, or metal in your eye?"
							onChange={(val) => this.ans('MetalInEye', val)}
							val={this.getAns('MetalInEye')}
						>

							{this.renderQuestionSet(qEye)}

							<TextQuestion
								id="eyeDetails"
								val={this.state.currentImplant}
								onChange={(currentImplant) => this.setState({currentImplant})}
								text="Additional details"
							/>

						</YesNoQuestion>

						{this.renderQuestionSet(qPost)}

					</div>

					{(this.isValid() || this.state.overrideSafetyWarning) && <div className="cta-subitem distributed">
						<BigButton
							href="/done"
							img="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"
							text="Continue to Schedule"
							wide
						/>
					</div>}
				</section>
			</IndexLayout>
		);
	}
}

export default SafetyQuestions;