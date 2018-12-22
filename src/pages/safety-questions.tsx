import * as React from 'react'

import IndexLayout from '../layouts'
import {BigButton, BigButtonJs} from "../components/BigBtn";
import {TextQuestion, YesNoQuestion} from "../components/Questions";
import {Ez123, MriTypeBreadcrumb, OrderBreadcrumb, TimeslotBreadcrumb} from "../components/breadcrumb";
import ReactModal from 'react-modal';
import {FormBasePage} from "../helpers/FormBasePage";
import {navigate} from 'gatsby';

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
		const problems: string[] = [];
		for (let i = 0; i < qArray.length; i = i + 1) {
			const ans = this.state.answers[qArray[i].q];
			if (typeof ans === 'undefined') {
				continue;
			}
			if (ans !== qArray[i].r) {
				problems.push(qArray[i].q);
			}
		}
		return {
			problems,
			isValid: problems.length === 0,
		};
	}

	public isComplete(qArray) {
		for (let i = 0; i < qArray.length; i = i + 1) {
			const ans = this.state.answers[qArray[i].q];
			if (typeof ans === 'undefined') {
				return false;
			}
		}
		if (typeof this.getAns('MetalInEye') === 'undefined') return false;
		if (typeof this.getAns('AllergicToContrast') === 'undefined') return false;
		if (typeof this.getAns('implants') === 'undefined') return false;
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

	public validateAll() {
		const v1 = this.validate(qs);
		const v2 = this.validate(qEye);
		const validationResult = v1.problems.concat(v2.problems);
		this.setState({validationResult});
		return validationResult;
	}

	public renderValidationError() {
		const val = this.state.validationResult || [];
		return (
			<ReactModal isOpen={val.length > 0 && !this.state.overrideSafetyWarning}
				className="modal-content animated fadeInUp"
				overlayClassName="modal-wrapper">
				<p>Due to your medical history, we are unable to safely perform an MRI. If you feel that you are still a candidate for an MRI, you may submit the form anyway and we will contact you for further information.</p>
				<ul>{val.map((li) => (<li>{li}</li>))}</ul>
				<p>
					<button type="button"
							className="button w-button"
							onClick={() => this.setState({overrideSafetyWarning: true}, () => this.doSubmit())}>
						Continue Anyway
					</button>
					<button type="button"
							className="button w-button"
							onClick={() => this.setState({overrideSafetyWarning: false, validationResult: []})}>
						Cancel
					</button>
				</p>
			</ReactModal>
		);
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
					<div className="w-col w-col-3"/>
					<div className="w-col w-col-6">
						{this.renderInner()}
						{this.renderValidationError()}
					</div>
				</section>
			</IndexLayout>
		);
	}

	public renderInner() {
		return (
			<React.Fragment>
				<h3>We need to ask some safety questions before we can finish scheduling you.</h3>

				<div className="inputrow" style={{paddingTop: '1em'}}>
					<label htmlFor="DoctorName" className="flexlabel">
						Do you have...
					</label>
				</div>

				{this.renderQuestionSet(qs)}

				<YesNoQuestion
					id="implants"
					text="any other implants?"
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

				<div style={{paddingTop: '1em'}}>

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

					<YesNoQuestion
						text="Are you allergic to IV contrast or MRI contrast?"
						val={this.getAns('AllergicToContrast')}
						onChange={(val) => this.ans('AllergicToContrast', val)}
						id="contrastAllergy"
					>
						<div className="alert">
							If your MRI requires contract, you will need to be premedicated with steriods
						</div>
					</YesNoQuestion>

				</div>

				{this.isComplete(qs) ? (
					<div className="cta-subitem distributed">
						<BigButtonJs
							onClick={() => this.doSubmit()}
							img="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"
							text="Continue"
							wide
						/>
					</div>
				) : (
					<div className="cta-subitem distributed" style={{opacity: 0.5}}>
						<BigButton
							href="/safety-questions"
							img="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"
							text="All questions are required"
							wide
						/>
					</div>
				)}
			</React.Fragment>
		);
	}

	private doSubmit() {
		const val = this.validateAll();
		if (this.state.overrideSafetyWarning || val.length === 0) {
			navigate('/questions-2');
		}
	}
}

export default SafetyQuestions;