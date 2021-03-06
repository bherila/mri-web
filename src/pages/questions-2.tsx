import * as React from 'react';
import {TextQuestion, YesNoQuestion} from "../components/Questions";
import {BigButton, BigButtonJs} from "../components/BigBtn";
import {FormBasePage} from "../helpers/FormBasePage";
import IndexLayout from "../layouts";
import {Ez123, MriTypeBreadcrumb, OrderBreadcrumb, TimeslotBreadcrumb} from "../components/breadcrumb";
import {ScheduleApi} from "../api/api";
import copyAppointment from "../helpers/copyAppointment";
import {isEmpty} from "ucshared";
import {navigate} from "gatsby";

class Questions2 extends FormBasePage {
	constructor(props, context) {
		super(props, context);
	}
	public componentDidMount() {
		super.componentDidMount();
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
					</div>
				</section>
			</IndexLayout>
		);
	}

	public renderInner() {
		return (
			<React.Fragment>
				<h3>Tell us a little more about your medical history.</h3>
				<p>This information improves the accuracy of your results, but is optional.</p>



				<TextQuestion
					id="whyMri"
					val={this.getAns('whyMri')}
					onChange={(whyMri) => this.ans('whyMri', whyMri)}
					text="Why are you having an MRI?"
					required={false}
				/>

				<YesNoQuestion
					id="pain"
					text="Do you have pain in the area being scanned?"
					onChange={(val) => this.ans('pain', val)}
					val={this.getAns('pain')}
				/>

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
						required={false}
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
						required={true}
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
						required={false}
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
						required={false}
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
						required={true}
					/>
				</YesNoQuestion>

				<TextQuestion
					id="priorSurgery_Other"
					val={this.getAns('priorSurgery_Other')}
					onChange={(val) => this.ans('priorSurgery_Other', val)}
					text="What other surgeries have you had?"
					required={false}
				/>

				<div className="cta-subitem distributed">
					<BigButtonJs
						onClick={() => this.doSubmit()}
						img="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"
						text="Continue"
						wide
					/>
				</div>
			</React.Fragment>
		);
	}

	private doSubmit() {
		new ScheduleApi().appointmentHandlerPUT({
			req: Object.assign({}, copyAppointment(FormBasePage.getAppointment()), {
				surveyDataJson: JSON.stringify(this.state.answers),
				safetyWarnings: isEmpty(this.state.validationResult) ? null : JSON.stringify(this.state.validationResult),
			}),
		}).then(() => {
			navigate('/done');
		}, (err) => alert(err));
	}
}

export default Questions2;
