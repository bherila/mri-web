import * as React from 'react';
import {TextQuestion, YesNoQuestion} from "../components/Questions";
import {BigButton} from "../components/BigBtn";
import {FormBasePage} from "../helpers/FormBasePage";

export class Questions2 extends FormBasePage {
	constructor(props, context) {
		super(props, context);
	}
	public componentDidMount() {
		super.componentDidMount();
	}

	public render() {
		return (
			<div>
				<h3>Tell us a little more about your medical history.</h3>
				<p>This information improves the accuracy of your results, but is optional.</p>

				Why are you having an MRI?

				<TextQuestion
					id="eyeDetails"
					val={this.state.currentImplant}
					onChange={(currentImplant) => this.setState({currentImplant})}
					text="Additional details"
				/>

				Do you have pain? Where?

				<YesNoQuestion
					id="pain"
					text="Do you have pain?"
					onChange={(val) => this.ans('pain', val)}
					val={this.state.getAns('pain')}
				>
					<TextQuestion
						id="painDetails"
						val={this.state.getAns('painDetails')}
						onChange={(val) => this.ans('painDetails', val)}
						text="Where?"
					/>
				</YesNoQuestion>

				<YesNoQuestion
					id="injury"
					text="Did you have an injury?"
					onChange={(val) => this.ans('injury', val)}
					val={this.state.getAns('injury')}
				>
					<TextQuestion
						id="injuryDetails"
						val={this.state.getAns('injuryDetails')}
						onChange={(val) => this.ans('injuryDetails', val)}
						text="Please add details"
					/>
				</YesNoQuestion>

				<YesNoQuestion
					id="cancer"
					text="Do you have a diagnosis of cancer?"
					onChange={(val) => this.ans('cancer', val)}
					val={this.state.getAns('cancer')}
				>
					<TextQuestion
						id="cancerDetails"
						val={this.state.getAns('cancerDetails')}
						onChange={(val) => this.ans('cancerDetails', val)}
						text="What type?"
					/>
				</YesNoQuestion>

				<YesNoQuestion
					id="priorImaging_Mri"
					text="Have you had an MRI before?"
					onChange={(val) => this.ans('priorImaging_Mri', val)}
					val={this.state.getAns('priorImaging_Mri')}
				>
					<TextQuestion
						id="priorImaging_MriDetails"
						val={this.state.getAns('priorImaging_MriDetails')}
						onChange={(val) => this.ans('priorImaging_MriDetails', val)}
						text=" When/where?"
					/>
				</YesNoQuestion>

				<YesNoQuestion
					id="priorImaging_BodyPartImg"
					text="Have you had this body part imaged before?"
					onChange={(val) => this.ans('priorImaging_BodyPartImg', val)}
					val={this.state.getAns('priorImaging_BodyPartImg')}
				>
					<TextQuestion
						id="priorImaging_BodyPartImgDetails"
						val={this.state.getAns('priorImaging_BodyPartImgDetails')}
						onChange={(val) => this.ans('priorImaging_BodyPartImgDetails', val)}
						text="How/when/where"
					/>
				</YesNoQuestion>

				<YesNoQuestion
					id="priorSurgery_Area"
					text="Have you had surgery on the area being scanned?"
					onChange={(val) => this.ans('priorSurgery_Area', val)}
					val={this.state.getAns('priorSurgery_Area')}
				>
					<TextQuestion
						id="priorSurgery_Area_when"
						val={this.state.getAns('priorSurgery_when')}
						onChange={(val) => this.ans('priorSurgery_when', val)}
						text="When?"
					/>
				</YesNoQuestion>

				<TextQuestion
					id="priorSurgery_Other"
					val={this.state.getAns('priorSurgery_Other')}
					onChange={(val) => this.ans('priorSurgery_Other', val)}
					text="What other surgeries have you had?"
				/>

				<div className="cta-subitem distributed">
					<BigButton
						href="/contact-info"
						img="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"
						text="Continue to Schedule"
						wide
					/>
				</div>
			</div>
		);
	}
}
