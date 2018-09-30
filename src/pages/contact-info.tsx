import * as React from 'react'
import { Link } from 'gatsby'
import {EditFormBase} from '../forms';

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

class ContactInformation extends React.Component<{}, {name: string, hasInsurance: boolean}> {
	constructor(props, context) {
		super(props, context);
		this.state = {name: '', hasInsurance: true};
	}

	public render() {
		return (
			<IndexLayout>
				<Page>
					<Container>
						<h1>Great!</h1>
						<p>We need a little information to get started...</p>
						{EditFormBase.boundTextboxValue('Name', this.state.name, (name) => this.setState({name}))}
						{EditFormBase.boundTextboxValue('Email', this.state.name, (name) => this.setState({name}))}
						{EditFormBase.boundTextboxValue('Phone', this.state.name, (name) => this.setState({name}))}
						{EditFormBase.boundCheckboxValue('Do you have insurance?', this.state.hasInsurance, (hasInsurance) => this.setState({hasInsurance}))}
						<p>We offer different MRI types on different days. Reserve your time, and we'll reschedule you if needed</p>
					</Container>
				</Page>
			</IndexLayout>
		);
	}
}

export default ContactInformation;
