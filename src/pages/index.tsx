import * as React from 'react'
import IndexLayout from '../layouts'
import {Ez123} from "../components/breadcrumb";
import {navigate} from "gatsby";
import {LeadGenApi} from "../api/api";
import {FormBasePage} from "../helpers/FormBasePage";
import {formatDate, formatPhone} from "../helpers/phone";

class IndexPage extends FormBasePage {
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
		return <IndexLayout>
			<section id="Q1" className="vspace80 w-container">
				<div className="vspace40 centered w-row">
					<div>
						<Ez123 num={0} />
						<h3>Ready to schedule your MRI?</h3>
					</div>
				</div>
				<div className="vspace40 centered w-row">
					<div className="w-hidden-small w-hidden-tiny w-col w-col-3"/>
					<div className="w-col w-col-6">
						<div className="w-form">
							<form action="#" onSubmit={(e) => this.submitLead(e)}>
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

								<div className="inputrow">
									<label style={{fontWeight: 'normal', fontSize: '8pt'}}>
										<input
											type="checkbox"
											checked={this.state.optedIn}
											value="yes"
											onClick={(e) => this.setState({optedIn: e.currentTarget.checked})}
										/>&nbsp;
										It's OK to send me more information about ideal MRI. (We'll never share your information)
									</label>
								</div>

								<label htmlFor="email">Phone</label>
								<input
									type="text"
									className="w-input centered"
									maxLength={256}
									name="phone"
									data-name="Phone"
									id="phone"
									required
									value={this.state.phone}
									onChange={(e) => this.setState({phone: formatPhone(e.currentTarget.value)}, () => this.saveState())}
								/>

								<input
									type="submit"
									value="Let's begin!"
									data-wait="Please wait..."
									className={`${err ? 'disabled ' : ''}w-button`}
									disabled={!!err}
								/>
							</form>
						</div>
					</div>
					<div className="w-hidden-small w-hidden-tiny w-col w-col-3"/>
				</div>
			</section>
		</IndexLayout>;
	}

	private submitLead(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		new LeadGenApi().runPOST({
			req: {
				firstName: this.state.fname,
				lastName: this.state.lname,
				email: this.state.email,
			},
			authToken: '',
		}).then((resp) => {
			console.log(resp);
			navigate('/have-order');
		});
	}
}

export default IndexPage
