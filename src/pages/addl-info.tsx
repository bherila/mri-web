import * as React from 'react'
import { navigate } from 'gatsby'
import IndexLayout from '../layouts'
import {Ez123, MriTypeBreadcrumb, TimeslotBreadcrumb} from "../components/breadcrumb";
import Dropzone from "react-dropzone";
import {showImageOrPlaceholder} from "../components/FileUpload";
import {ScheduleApi, SlotAvailabilityTime} from "../api/api";
import {getAuthToken} from "../helpers/authToken";

interface ICPState {
	lname: string;
	scan: string;
	fname: string;
	hasInsurance: boolean;
	haveOrder: boolean;
	height: string;
	weight: string;
	doctorName: string;
	mriOrder: string;
	insFront: string;
	insBack: string;
	timeSlot: SlotAvailabilityTime | null;
	email: string;
	phone: string;
	dob: string;
	err: string;
}

class ContactInformation extends React.Component<{}, ICPState> {
	constructor(props, context) {
		super(props, context);
		this.state = {
			fname: '',
			email: '',
			dob: '',
			phone: '',
			hasInsurance: true,
			lname: '',
			scan: '',
			haveOrder: false,
			height: '',
			weight: '',
			doctorName: '',
			mriOrder: '',
			insFront: '',
			insBack: '',
			timeSlot: null,
			err: '',
		};
	}

	public componentDidMount() {
		if (typeof sessionStorage !== 'undefined') {
			const fname = sessionStorage.getItem('fname') || '';
			const lname = sessionStorage.getItem('lname') || '';
			const email = sessionStorage.getItem('email') || '';
			const phone = sessionStorage.getItem('phone') || '';
			const scan = JSON.parse(sessionStorage.getItem('scan') || '{}');
			const haveOrder = sessionStorage.getItem('haveOrder') === 'true';
			this.setState({fname, lname, email, phone, haveOrder, scan});

			const height = sessionStorage.getItem('height') || '';
			const weight = sessionStorage.getItem('weight') || '';
			const doctorName = sessionStorage.getItem('doctorName') || '';
			const insFront = sessionStorage.getItem('insFront') || '';
			const insBack = sessionStorage.getItem('insBack') || '';
			const mriOrder = sessionStorage.getItem('mriOrder') || '';

			const timeSlot = JSON.parse(sessionStorage.getItem('timeSlot') || '{}');
			this.setState({height, weight, doctorName, insFront, insBack, mriOrder, timeSlot});
		}
	}

	public updateStorage() {
		if (typeof sessionStorage !== 'undefined') {
			sessionStorage.setItem('height', this.state.height);
			sessionStorage.setItem('weight', this.state.weight);
			sessionStorage.setItem('doctorName', this.state.doctorName);
			sessionStorage.setItem('insFront', this.state.insFront);
			sessionStorage.setItem('insBack', this.state.insBack);
			sessionStorage.setItem('mriOrder', this.state.mriOrder);
		}
	}

	public render() {
		return (
			<IndexLayout>
				<section id="Q1" className="vspace80 w-container">
					<div>
						<Ez123 num={3} />
						<div className="breadcrumb-stack">
							<MriTypeBreadcrumb value={this.state.scan}/>
							<TimeslotBreadcrumb value={this.state.timeSlot}/>
						</div>
					</div>
					<div className="vspace80 centered w-row">
						<div className="w-hidden-small w-hidden-tiny w-col w-col-4">
							<img
								src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5ba72c92e33cb6832a1bd949_idealMRI_lady_3.png"
								alt=""
							/>
						</div>
						<div className="w-hidden-small w-hidden-tiny w-col w-col-1" />
						<div className="w-col w-col-7">
							<div className="w-form">
								<form
									id="email-form"
									name="email-form"
									data-name="Email Form"
									action="#"
									onSubmit={(e) => this.handleSubmit(e)}
								>
									<h3>Additional Information</h3>
									<p>
										<strong>Thanks! You're all set. </strong>We will give you
										a call to confirm any details. &nbsp;We'll also send you a
										reminder before your scan. &nbsp;You can fill out this
										additional information now, to save time. It takes about 2
										or 3 more minutes.
									</p>
									<div className="inputrow">
										<label htmlFor="Height" className="flexlabel">
											Height
										</label>
										<input
											type="text"
											className="flexinput w-input"
											maxLength={256}
											name="Height"
											data-name="Height"
											id="Height"
											value={this.state.height}
											onChange={(e) => this.setState({height: e.currentTarget.value}, () => this.updateStorage())}
										/>
									</div>
									<div className="inputrow">
										<label htmlFor="Weight" className="flexlabel">
											Weight
										</label>
										<input
											type="text"
											className="flexinput w-input"
											maxLength={256}
											name="Weight"
											data-name="Weight"
											id="Weight"
											value={this.state.weight}
											onChange={(e) => this.setState({weight: e.currentTarget.value}, () => this.updateStorage())}
										/>
									</div>
									<div className="inputrow">
										<label htmlFor="DoctorName" className="flexlabel">
											Who is your doctor?
										</label>
										<input
											type="text"
											className="flexinput w-input"
											maxLength={256}
											name="DoctorName"
											data-name="DoctorName"
											id="DoctorName"
											value={this.state.doctorName}
											onChange={(e) => this.setState({doctorName: e.currentTarget.value}, () => this.updateStorage())}
										/>
									</div>
									<div className="inputrow">
										<label htmlFor="name-6" className="flexlabel">
											Upload MRI&nbsp;order
										</label>
										<div className="flexinput">
											<Dropzone
												accept="image/*"
												className="button green small w-button"
												onDrop={(files) => this.onDrop('mri-order', files)}
											>{showImageOrPlaceholder(this.state.mriOrder)}
											</Dropzone>
										</div>
									</div>
									<div className="inputrow">
										<label htmlFor="name-6" className="flexlabel">
											<strong>Insurance Card Front</strong>
										</label>
										<div className="flexinput">
											<Dropzone
												accept="image/*"
												className="button green small w-button"
												onDrop={(files) => this.onDrop('ins-front', files)}
											>{showImageOrPlaceholder(this.state.insFront)}
											</Dropzone>
										</div>
									</div>
									<div className="inputrow">
										<label htmlFor="name-6" className="flexlabel">
											<strong>Insurance Card Back</strong>
										</label>
										<div className="flexinput">
											<Dropzone
												accept="image/*"
												className="button green small w-button"
												onDrop={(files) => this.onDrop('ins-back', files)}
											>{showImageOrPlaceholder(this.state.insBack)}
											</Dropzone>
										</div>
									</div>
									<div className="cta-subitem distributed">
										<button className="cta-link wider w-inline-block" type="submit">
											<img
												src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"
												alt="Submit"
												className="image"
											/>
											<div>Submit</div>
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</IndexLayout>
		);
	}

	private onDrop(insBack: string, files: File[]) {
		console.log(insBack, files);
		if (files.length) {
			if (files[0]) {
				const sObj = {};
				sObj[insBack] = files[0].name;
				this.setState(sObj, () => this.updateStorage());
			}
		}
	}

	private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!this.state.timeSlot) {
			alert('missing timeSlot');
			return;
		}
		const slotId = this.state.timeSlot.slotId || '';
		new ScheduleApi().appointmentHandlerPOST({
			req: {
				partitionKey: slotId.split(' ')[1], // extract location from slotId
				rowKey: slotId,
				lastName: this.state.lname,
				firstName: this.state.fname,
				address1: '',
				confirmed: false,
				doctorName: this.state.doctorName,
				email: this.state.email,
				phone: this.state.phone,
				height: this.state.height || '',
				insuranceBackUrl: this.state.insBack,
				insuranceFrontUrl: this.state.insFront,
				insuranceCarrier: '',
				insuranceGroupNumber: '',
				insurancePolicyNumber: '',
				insuranceVerified: false,
				orderImageUrl: this.state.mriOrder,
				resourceId: this.state.timeSlot.resourceId,
				serviceType: JSON.stringify(this.state.scan),
				weight: this.state.weight,
				birthday: this.state.dob,
				serviceLength: 45, // TODO: Update service length?
			},
			search: '',
			authToken: getAuthToken(),
			withContrast: false,
			locationId: ''
		}).then((res) => {
			if (res.success && !!res.value && !!res.value.length) {
				sessionStorage.setItem('appointmentEntity', JSON.stringify(res.value[0] || null));
				navigate('/safety-questions');
			} else {
				this.setState({err: res.message || ''});
			}
		});
	}
}

export default ContactInformation;
