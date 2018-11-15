import * as React from 'react'
import { Link } from 'gatsby'
import {EditFormBase} from '../../forms';

import Page from '../../components/Page'
import Container from '../../components/Container'
import IndexLayout from '../../layouts'

class AdminIndex extends React.Component<{}, {name: string, username: string, password: string, sessionId: string}> {
	constructor(props, context) {
		super(props, context);
		this.state = {name: '', username: '', password: '', sessionId: ''};
	}

	public render() {
		return (
			<IndexLayout>
				<Page>
					<Container>
						<h1>Admin Panel</h1>
						<p>
							{EditFormBase.boundTextboxValue(
								'Username/email',
								this.state.username,
								username => this.setState({username}),
								'',
								false,
								false,
							)}

							{EditFormBase.boundTextboxValue(
								'Password',
								this.state.password,
								password => this.setState({password}),
								'',
								false,
								false,
								'password'
							)}
						</p>
						<ul>
							<li>
								<Link to="/admin/manage-questions">Manage Questions</Link>
								<Link to="/admin/manage-time-slots">Manage Time Slots</Link>
							</li>
						</ul>
					</Container>
				</Page>
			</IndexLayout>
		);
	}
}

export default AdminIndex
