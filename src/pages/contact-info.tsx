import * as React from 'react'
import IndexLayout from '../layouts'
import {Ez123, MriTypeBreadcrumb} from "../components/breadcrumb";
import {FormBasePage} from "../helpers/FormBasePage";

class ContactInformation extends FormBasePage {
	constructor(props, context) {
		super(props, context);
	}

	public componentDidMount() {
		super.componentDidMount();
	}

	public formError() {
		if (this.state.fname === '') return 'First name is required';
		if (this.state.lname === '') return 'Last name is required';
		if (this.state.email === '') return 'Email is required';
		return null;
	}

	public render() {
		const err = this.formError();
		return (
			<IndexLayout>
				<section id="Contact" className="vspace80 w-container">
					<div className="vspace80 centered w-row">
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3"/>
						<div className="w-col w-col-6">
							<div>
								<Ez123 num={3} />
								<div className="breadcrumb-stack">
									<MriTypeBreadcrumb value={this.state.scan}/>
								</div>
							</div>
							<h3>Contact Information</h3>
							<form
								id="email-form"
								name="email-form"
								data-name="Email Form"
								action="#" method="get"
							>
								<label htmlFor="fname">First name</label>
								<input
									type="text"
									className="w-input centered"
									maxLength={256}
									name="fname"
									data-name="First Name"
									id="fname"
									value={this.state.fname}
									onChange={(e) => this.setState({fname: e.currentTarget.value}, () => this.saveState())}
								/>
								<label htmlFor="lname">Last name</label>
								<input
									type="text"
									className="w-input centered"
									maxLength={256}
									name="lname"
									data-name="Last Name"
									id="lname"
									value={this.state.lname}
									onChange={(e) => this.setState({lname: e.currentTarget.value}, () => this.saveState())}
								/>
								<label htmlFor="email">Email Address</label>
								<input
									type="text"
									className="w-input centered"
									maxLength={256}
									name="email"
									data-name="Email"
									id="email"
									required
									value={this.state.email}
									onChange={(e) => this.setState({email: e.currentTarget.value}, () => this.saveState())}
								/>

								<input
									type="submit"
									defaultValue="Let's begin!"
									data-wait="Please wait..."
									className={`${err ? 'disabled ' : ''}w-button`}
									disabled={!!err}
								/>
							</form>
						</div>
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3"/>
					</div>
				</section>
			</IndexLayout>
		);
	}

}

export default ContactInformation;
