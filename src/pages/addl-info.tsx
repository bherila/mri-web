import * as React from 'react'
import { Link } from 'gatsby'
import IndexLayout from '../layouts'

class ContactInformation extends React.Component<{}, {name: string, hasInsurance: boolean}> {
	constructor(props, context) {
		super(props, context);
		this.state = {name: '', hasInsurance: true};
	}

	public render() {
		return (
			<IndexLayout>
				<section id="Q1" className="vspace80 w-container">
					<div className="vspace80 centered w-row">
						<div className="w-hidden-small w-hidden-tiny w-col w-col-4">
							<img
								src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5ba72c92e33cb6832a1bd949_idealMRI_lady_3.png"
								alt
							/>
						</div>
						<div className="w-hidden-small w-hidden-tiny w-col w-col-1" />
						<div className="w-col w-col-7">
							<div className="w-form">
								<form
									id="email-form"
									name="email-form"
									data-name="Email Form"
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
										/>
									</div>
									<div className="inputrow">
										<label htmlFor="name-6" className="flexlabel">
											Upload MRI&nbsp;order
										</label>
										<div className="flexinput">
											<a href="#" className="button green small w-button">
												Click here to select picture/PDF
											</a>
										</div>
									</div>
									<div className="inputrow">
										<label htmlFor="name-6" className="flexlabel">
											<strong>Insurance Card Front</strong>
										</label>
										<div className="flexinput">
											<a href="#" className="button green small w-button">
												Click here to select picture/PDF
											</a>
										</div>
									</div>
									<div className="inputrow">
										<label htmlFor="name-6" className="flexlabel">
											<strong>Insurance Card Back</strong>
										</label>
										<div className="flexinput">
											<a href="#" className="button green small w-button">
												Click here to select picture/PDF
											</a>
										</div>
									</div>
									<div className="cta-subitem distributed">
										<a
											href="/meet-our-team"
											className="cta-link wider w-inline-block"
										>
											<img
												src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"
												alt="Submit"
												className="image"
											/>
											<div>Submit</div>
										</a>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</IndexLayout>
		);
	}
}

export default ContactInformation;
