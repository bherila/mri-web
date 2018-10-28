import * as React from 'react'
import { Link } from 'gatsby'
import IndexLayout from '../layouts'
import {BigButton} from "../components/BigBtn";

class ContactInformation extends React.Component<{}, {name: string, hasInsurance: boolean}> {
	constructor(props, context) {
		super(props, context);
		this.state = {name: '', hasInsurance: true};
	}

	public render() {
		return (
			<IndexLayout>
				<section id="Contact" className="vspace80 w-container">
					<div className="vspace80 centered w-row">
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3"/>
						<div className="w-col w-col-6">
							<div className="w-form">
								<form
									id="email-form"
									name="email-form"
									data-name="Email Form"
								>
									<h3>Please complete your contact information</h3>
									<div className="inputrow">
										<label htmlFor="First" className="flexlabel">
											First Name
										</label>
										<input
											type="text"
											className="flexinput w-input"
											maxLength={256}
											autoFocus
											name="First"
											data-name="First"
											id="First"
											required
										/>
									</div>
									<div className="inputrow">
										<label htmlFor="Last" className="flexlabel">
											Last Name
										</label>
										<input
											type="text"
											className="flexinput w-input"
											maxLength={256}
											name="Last"
											data-name="Last"
											id="Last"
											required
										/>
									</div>
									<div className="inputrow">
										<label htmlFor="PhoneNumber" className="flexlabel">
											Phone&nbsp;Number
										</label>
										<input
											type="tel"
											className="flexinput w-input"
											maxLength={256}
											name="PhoneNumber"
											data-name="PhoneNumber"
											id="PhoneNumber"
											required
										/>
									</div>
									<div className="inputrow">
										<label htmlFor="EmailAddress" className="flexlabel">
											Email Address
										</label>
										<input
											type="email"
											className="flexinput w-input"
											maxLength={256}
											name="EmailAddress"
											data-name="EmailAddress"
											id="EmailAddress"
											required
										/>
									</div>
									<div className="inputrow">
										<label htmlFor="DOB" className="flexlabel">
											Date of Birth
										</label>
										<input
											type="text"
											className="flexinput w-input"
											maxLength={256}
											name="DOB"
											data-name="DOB"
											id="DOB"
											required
										/>
									</div>
									<div className="cta-subitem distributed">
										<BigButton
											href="/addl-info"
											img="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"
											text="Submit"
											wide
										/>
									</div>
								</form>
							</div>
						</div>
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3"/>
					</div>
				</section>
			</IndexLayout>
		);
	}
}

export default ContactInformation;
