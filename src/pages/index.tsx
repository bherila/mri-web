import * as React from 'react'
import { Link } from 'gatsby'
import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import {Ez123} from "../components/breadcrumb";

class IndexPage extends React.Component<{}, {fname: string, lname: string, email: string}> {
	constructor(props, context) {
		super(props, context);
		this.state = {fname: '', lname: '', email: ''};
	}

	public componentDidMount() {
		if (typeof sessionStorage !== 'undefined') {
			this.setState({
				fname: sessionStorage.getItem('fname') || '',
				lname: sessionStorage.getItem('lname') || '',
				email: sessionStorage.getItem('email') || '',
			});
		}
	}

	public updateStorage() {
		if (typeof sessionStorage !== 'undefined') {
			sessionStorage.setItem('fname', this.state.fname);
			sessionStorage.setItem('lname', this.state.lname);
			sessionStorage.setItem('email', this.state.email);
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
		return <IndexLayout>
			<section id="Q1" className="vspace80 w-container">
				<div className="vspace80 centered w-row">
					<div className="w-hidden-small w-hidden-tiny w-col w-col-3"/>
					<div className="w-col w-col-6">
						<div>
							<Ez123 num={1} />
						</div>
						<h3>Ready to schedule your MRI?</h3>
						<div className="w-form">
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
								<input
									type="submit"
									defaultValue="Let's begin!"
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
}

export default IndexPage
