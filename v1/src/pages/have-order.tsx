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
		state.haveOrder = true;
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
					<div className="vspace40 centered w-row animated zoomIn">
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3" />
						<div className="w-col w-col-6">

							<h3>Ok {this.state.fname}, do you have an order from your doctor?</h3>
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
