import * as React from 'react'
import IndexLayout from '../layouts'
import {BigButton} from "../components/BigBtn";
import {Ez123} from "../components/breadcrumb";
import {FormBasePage} from "../helpers/FormBasePage";
import {SafetyState} from "../models/SafetyState";

class HaveOrder extends FormBasePage {
	constructor(props, context) {
		super(props, context);
	}
	public componentDidMount() {
		const state = SafetyState.loadState();
		state.haveOrder = false;
		this.setState(state, () => this.saveState());
	}
	public render() {
		return (
			<IndexLayout>
				<section id="Q2" className="vspace80 w-container">
					<div className="vspace40 centered w-row">
						<div>
							<Ez123 num={1} />
						</div>
					</div>
					<div className="vspace40 centered w-row animated fadeIn">
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3" />
						<div className="w-col w-col-6">
							<h3>We recommend getting an order from your doctor</h3>
							<p>Insurance will not cover a scan without a doctor's order, but our scans are priced at $497. You also won't be able to recieve any contrast.</p>
							<div className="cta-subitem distributed">
								<BigButton
									href="/mri-type"
									img="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"
									text="Continue to Schedule"
									wide
								/>
								<BigButton
									href="/"
									img="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead313661e7266876eedf_Providers.svg"
									text="Contact Us"
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
