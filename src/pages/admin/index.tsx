import * as React from 'react'
import { Link, navigate } from 'gatsby'
import {EditFormBase} from '../../forms';

import Page from '../../components/Page'
import Container from '../../components/Container'
import AdminLayout from '../../layouts/admin'
import {AuthApi} from "../../api/api";

class AdminIndex extends React.Component<{}, {name: string, username: string, password: string, sessionId: string, err: string}> {
	constructor(props, context) {
		super(props, context);
		this.state = {name: '', username: '', password: '', sessionId: '', err: ''};
	}

	public render() {
		return (
			<AdminLayout>
			<Page>
				<Container className="centered">
					<h1>Restricted Access</h1>
					{(this.state.err || '').length > 0 && <div className="breadcrumb-stack">
						{this.state.err}
					</div>}
					<form action="#" onSubmit={(e) => this.doLogin(e)}>
						<div>
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
						</div>
						<p className="vspace40">
							<button type="submit" className="button w-button">
								Sign in
							</button>
						</p>
					</form>
					<ul>
						<li>
							<Link to="/admin/manage-questions">Manage Questions</Link>
							<Link to="/admin/manage-time-slots">Manage Time Slots</Link>
						</li>
					</ul>
				</Container>
			</Page>
			</AdminLayout>
		);
	}

	private doLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		new AuthApi().auth({
			authToken: '',
			req: {
				partitionKey: this.state.username,
				apiKey: this.state.password,
			},
		}).then((result) => {
			this.setState({sessionId: result.apiKey || ''});
			sessionStorage.setItem('sessionId', result.apiKey || '');
			navigate('/admin/site');
		}, (err) => {
			this.setState({err: 'Authentication failed'});
			sessionStorage.removeItem('sessionId');
		});
	}
}

export default AdminIndex
