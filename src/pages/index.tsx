import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

class IndexPage extends React.Component<{}, {name: string, email: string}> {
	constructor(props, context) {
		super(props, context);
		this.state = {name: '', email: ''};
	}

	public componentDidMount() {
		if (typeof sessionStorage !== 'undefined') {
			this.setState({
				name: sessionStorage.getItem('name') || '',
				email: sessionStorage.getItem('email') || '',
			});
		}
	}

	public updateStorage() {
		if (typeof sessionStorage !== 'undefined') {
			sessionStorage.setItem('name', this.state.name);
			sessionStorage.setItem('email', this.state.email);
		}
	}

	public formError() {
		if (this.state.name === '') return 'Name is required';
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
						<h3>Ready to schedule your MRI?</h3>
						<div className="w-form">
							<form
								id="email-form"
								name="email-form"
								data-name="Email Form"
								action="/have-order/" method="get"
							>
								<label htmlFor="name">Your name</label>
								<input
									type="text"
									className="w-input centered"
									maxLength={256}
									name="name"
									data-name="Name"
									id="name"
									value={this.state.name}
									onChange={(e) => this.setState({name: e.currentTarget.value}, () => this.updateStorage())}
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
							<div className="w-form-done">
								<div>Thank you! Your submission has been received!</div>
							</div>
							<div className="w-form-fail">
								<div>
									Oops! Something went wrong while submitting the form.
								</div>
							</div>
						</div>
					</div>
					<div className="w-hidden-small w-hidden-tiny w-col w-col-3"/>
				</div>
			</section>
		</IndexLayout>;
	}
}

export default IndexPage
