import * as React from 'react'
import IndexLayout from '../layouts'
import {BigButton} from "../components/BigBtn";
import {Ez123} from "../components/breadcrumb";

class DontKnowConfirmationPage extends React.Component<{}, {}> {
	constructor(props, context) {
		super(props, context);
	}

	public componentDidMount() {
		if (typeof sessionStorage !== 'undefined') {
			sessionStorage.setItem('scan', JSON.stringify({
				name: 'Unknown Scan Type', contrast: true, time: ''
			}));
		}
	}

	public render() {
		return (
			<IndexLayout>
				<section id="Q2" className="vspace80 w-container">
					<div className="vspace40 centered w-row">
						<div>
							<Ez123 num={2} />
						</div>
					</div>
					<div className="vspace40 centered w-row animated bounceInUp">
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3" />
						<div className="w-col w-col-6">
							<h3>That's OK.</h3>
							<p>We offer different types of MRIs on different days. Reserve your time, and we'll reschedule you if needed.</p>
							<div className="cta-subitem distributed">
								<BigButton
									href="/pick-time"
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

export default DontKnowConfirmationPage
