import * as React from 'react'
import IndexLayout from '../layouts'
import {BigButton, BigButtonJs} from "../components/BigBtn";
// import {Ez123} from "../components/breadcrumb";
import {FormBasePage} from "../helpers/FormBasePage";
import {SafetyState} from "../models/SafetyState";

class CancelAppt extends FormBasePage {
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
							{/*<Ez123 num={1} />*/}
						</div>
					</div>
					<div className="vspace40 centered w-row animated zoomIn">
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3" />
						<div className="w-col w-col-6">
							{this.renderCancel1()}
						</div>
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3" />
					</div>
				</section>

			</IndexLayout>
		);
	}

	private renderAlreadyConfirmed() {
		return (
			<React.Fragment>
				<h3>The appointment is already confirmed</h3>
				<p>Please contact us if you need to make any changes</p>
				<div className="cta-subitem distributed">
					<BigButtonJs
						onClick={() => console.log('todo')}
						img="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"
						text="Contact Us"
						wide
					/>
				</div>
			</React.Fragment>
		);
	}

	private renderCancel1() {
		return (
			<React.Fragment>
				<h3>Do you really want to cancel this appointment?</h3>
				<div className="cta-subitem distributed">
					<BigButtonJs
						onClick={() => console.log('todo')}
						img="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"
						text="Yes"
						wide
					/>
					<BigButtonJs
						onClick={() => console.log('todo')}
						img="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead313661e7266876eedf_Providers.svg"
						text="No"
						wide
					/>
				</div>
			</React.Fragment>
		);
	}

	private renderCancel2() {
		return (
			<React.Fragment>
				<h3>The appointment has been canceled</h3>
				<p>You can reschedule again anytime.</p>
			</React.Fragment>
		);
	}
}

export default CancelAppt;
