import * as React from 'react'
import IndexLayout from '../layouts'
import {Ez123, MriTypeBreadcrumb} from "../components/breadcrumb";

class ContactInformation extends React.Component<{}, {haveOrder: boolean, scan: string,fname: string, lname: string, phone: string, email: string, dob: string}> {
	constructor(props, context) {
		super(props, context);
		this.state = {haveOrder: false, fname: '', lname: '', phone: '', email: '', dob: '', scan: ''};
	}
	public componentDidMount() {
		if (typeof sessionStorage !== 'undefined') {
			const fname = sessionStorage.getItem('fname') || '';
			const lname = sessionStorage.getItem('lname') || '';
			const scan = JSON.parse(sessionStorage.getItem('scan') || '{}');
			const haveOrder = sessionStorage.getItem('haveOrder') === 'true';
			this.setState({fname, lname, haveOrder, scan});
		}
		if (typeof sessionStorage !== 'undefined') {
			this.setState({
				fname: sessionStorage.getItem('fname') || '',
				lname: sessionStorage.getItem('lname') || '',
				email: sessionStorage.getItem('email') || '',
				phone: sessionStorage.getItem('phone') || '',
				dob: sessionStorage.getItem('dob') || '',
			});
		}
	}

	public updateStorage() {
		if (typeof sessionStorage !== 'undefined') {
			sessionStorage.setItem('fname', this.state.fname);
			sessionStorage.setItem('lname', this.state.lname);
			sessionStorage.setItem('email', this.state.email);
			sessionStorage.setItem('phone', this.state.phone);
			sessionStorage.setItem('dob', this.state.dob);
		}
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
								action="/have-order/" method="get"
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
									onChange={(e) => this.setState({fname: e.currentTarget.value}, () => this.updateStorage())}
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
									onChange={(e) => this.setState({lname: e.currentTarget.value}, () => this.updateStorage())}
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
									onChange={(e) => this.setState({email: e.currentTarget.value}, () => this.updateStorage())}
								/>
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
									onChange={(e) => this.setState({phone: e.currentTarget.value}, () => this.updateStorage())}
								/>
								<label htmlFor="email">Date of Birth</label>
								<input
									type="text"
									className="w-input centered"
									maxLength={256}
									name="dob"
									data-name="Date of Birth"
									id="dob"
									required
									value={this.state.dob}
									onChange={(e) => this.setState({dob: e.currentTarget.value}, () => this.updateStorage())}
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
