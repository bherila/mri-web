import * as React from 'react'
import { Link } from 'gatsby'
import {EditFormBase} from '../../forms';

import Page from '../../components/Page'
import Container from '../../components/Container'
import IndexLayout from '../../layouts'

class AdminIndex extends React.Component<{}, {name: string}> {
	constructor(props, context) {
		super(props, context);
		this.state = {name: ''};
	}

	public render() {
		return (
			<IndexLayout>
				<Page>
					<Container>
						<h1>Admin Panel</h1>
					</Container>
				</Page>
			</IndexLayout>
		);
	}
}

export default AdminIndex
