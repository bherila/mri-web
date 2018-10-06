import * as React from 'react'
import { Link } from 'gatsby'

import IndexLayout from '../layouts'
import {BigButton} from "../components/BigBtn";
import {TextQuestion, YesNoQuestion} from "../components/Questions";

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

const clinicalHistory = [

];

const priorImaging = [

];

const surgicalHistory = [

];

class SafetyQuestions extends React.Component<{}, {
	name: string;
	answers: any;
	implants: string[];
	currentImplant: string;
}> {
	constructor(props, context) {
		super(props, context);
		this.state = {
			name: '',
			answers: {},
			implants: [],
			currentImplant: ''
		};
	}

	public componentDidMount() {
		if (typeof sessionStorage !== 'undefined') {
			let name = sessionStorage.getItem('name') || '';
			name = name.split(' ')[0];
			this.setState({name});
		}
	}

	public getAns(q) {
		return this.state.answers[q];
	}

	public ans(q, val) {
		let answers = Object.assign({}, this.state.answers);
		answers[q] = val;
		console.log(q, val, answers);
		this.setState({answers});
	}

	public addImplant() {
		const implants = this.state.implants.slice(0);
		implants.push(this.state.currentImplant);
		this.setState({implants});
	}

	public removeImplant() {
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
					<h1>We need to ask some safety questions.</h1>
					<h2>Do you have...</h2>

					{this.renderQuestionSet(qs)}

					{!this.isValid() && <div className="error-wrapper">
						Due to your medical history, we are unable to safely perform an MRI. If you feel that you are still a candidate for an MRI, you may submit the form anyway and we will contact you for further information.
					</div>}

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

					<h2>Tell us a little more about your medical history.</h2>
					<p>This information improves the accuracy of your results, but is optional.</p>

					<TextQuestion
						id="eyeDetails"
						val={this.state.currentImplant}
						onChange={(currentImplant) => this.setState({currentImplant})}
						text="Additional details"
					/>
					Why are you having an MRI?
					Do you have pain? Where?

					<YesNoQuestion
						id="pain"
						text="Do you have pain?"
						onChange={(val) => this.ans('pain', val)}
						val={this.getAns('pain')}
					>
						<TextQuestion
							id="painDetails"
							val={this.getAns('painDetails')}
							onChange={(val) => this.ans('painDetails', val)}
							text="Where?"
						/>
					</YesNoQuestion>

					<YesNoQuestion
						id="injury"
						text="Did you have an injury?"
						onChange={(val) => this.ans('injury', val)}
						val={this.getAns('injury')}
					>
						<TextQuestion
							id="injuryDetails"
							val={this.getAns('injuryDetails')}
							onChange={(val) => this.ans('injuryDetails', val)}
							text="Please add details"
						/>
					</YesNoQuestion>

					<YesNoQuestion
						id="cancer"
						text="Do you have a diagnosis of cancer?"
						onChange={(val) => this.ans('cancer', val)}
						val={this.getAns('cancer')}
					>
						<TextQuestion
							id="cancerDetails"
							val={this.getAns('cancerDetails')}
							onChange={(val) => this.ans('cancerDetails', val)}
							text="What type?"
						/>
					</YesNoQuestion>

					<YesNoQuestion
						id="priorImaging_Mri"
						text="Have you had an MRI before?"
						onChange={(val) => this.ans('priorImaging_Mri', val)}
						val={this.getAns('priorImaging_Mri')}
					>
						<TextQuestion
							id="priorImaging_MriDetails"
							val={this.getAns('priorImaging_MriDetails')}
							onChange={(val) => this.ans('priorImaging_MriDetails', val)}
							text=" When/where?"
						/>
					</YesNoQuestion>

					<YesNoQuestion
						id="priorImaging_BodyPartImg"
						text="Have you had this body part imaged before?"
						onChange={(val) => this.ans('priorImaging_BodyPartImg', val)}
						val={this.getAns('priorImaging_BodyPartImg')}
					>
						<TextQuestion
							id="priorImaging_BodyPartImgDetails"
							val={this.getAns('priorImaging_BodyPartImgDetails')}
							onChange={(val) => this.ans('priorImaging_BodyPartImgDetails', val)}
							text="How/when/where"
						/>
					</YesNoQuestion>

					<YesNoQuestion
						id="priorSurgery_Area"
						text="Have you had surgery on the area being scanned?"
						onChange={(val) => this.ans('priorSurgery_Area', val)}
						val={this.getAns('priorSurgery_Area')}
					>
						<TextQuestion
							id="priorSurgery_Area_when"
							val={this.getAns('priorSurgery_when')}
							onChange={(val) => this.ans('priorSurgery_when', val)}
							text="When?"
						/>
					</YesNoQuestion>

					<TextQuestion
						id="priorSurgery_Other"
						val={this.getAns('priorSurgery_Other')}
						onChange={(val) => this.ans('priorSurgery_Other', val)}
						text="What other surgeries have you had?"
					/>

				</section>
			</IndexLayout>
		);
	}
}

export default SafetyQuestions
