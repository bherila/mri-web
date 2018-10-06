import * as React from 'react'
import { Link } from 'gatsby'

import IndexLayout from '../layouts'
import {BigButton} from "../components/BigBtn";

class HaveOrder extends React.Component<{}, {name: string}> {
	constructor(props, context) {
		super(props, context);
		this.state = {name: ''};
	}

	public componentDidMount() {
		if (typeof sessionStorage !== 'undefined') {
			let name = sessionStorage.getItem('name') || '';
			name = name.split(' ')[0];
			this.setState({name});
		}
	}

	public render() {
		return (
			<IndexLayout>
				<section id="Q2" className="vspace80 w-container">
					<div className="vspace80 centered w-row animated zoomIn">
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3" />
						<div className="w-col w-col-6">
							<h3>Ok {this.state.name}, do you have an order from your doctor?</h3>
							<div className="cta-subitem distributed">
								<BigButton
									href="/mri-type"
									img="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"
									text="Yes"
									wide
								/>
								<BigButton
									href="/no-order"
									img="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead313661e7266876eedf_Providers.svg"
									text="No"
									wide
								/>
							</div>
						</div>
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3" />
					</div>
				</section>

			</IndexLayout>
		);
	}
}

export default HaveOrder
