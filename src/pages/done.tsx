import * as React from 'react'
import IndexLayout from '../layouts'
import {FormBasePage} from "../helpers/FormBasePage";

class FinishedPage extends FormBasePage {
	constructor(props, context) {
		super(props, context);
	}
	public componentDidMount() {
		super.componentDidMount();
	}

	public render() {
		return (
			<IndexLayout>
				<section id="Q2" className="vspace80 w-container">
					<div className="vspace80 centered w-row" style={{marginBottom: '5em'}}>
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3" />
						<div className="w-col w-col-6">
							<h2>All Done</h2>
							<p>
								We'll email you a confirmation of your appointment. And if
								there's anything else we need, we'll get in touch.
							</p>
						</div>
						<div className="w-hidden-small w-hidden-tiny w-col w-col-3" />
					</div>
					{/*<aside id="FurtherResources" className="centered">*/}
						{/*<h3>Further Resources Below</h3>*/}
						{/*<div className="cta-subitem distributed">*/}
							{/*<a href="/why-ideal-mri" className="cta-link w-inline-block">*/}
								{/*<img*/}
									{/*src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead31fb9e09c21b36b101_Why.svg"*/}
									{/*alt=""*/}
									{/*className="image"*/}
								{/*/>*/}
								{/*<div>Why idealMRI?</div>*/}
							{/*</a>*/}
							{/*<a href="/what-to-expect" className="cta-link w-inline-block">*/}
								{/*<img*/}
									{/*src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f69d670128b342c0a_Expect.svg"*/}
									{/*alt=""*/}
									{/*className="image"*/}
								{/*/>*/}
								{/*<div>What to Expect</div>*/}
							{/*</a>*/}
							{/*<a*/}
								{/*href="/pricing-and-insurance"*/}
								{/*className="cta-link w-inline-block"*/}
							{/*>*/}
								{/*<img*/}
									{/*src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead313661e7547b76eee0_Pricing.svg"*/}
									{/*alt=""*/}
									{/*className="image"*/}
								{/*/>*/}
								{/*<div>Pricing &amp;&nbsp;Insurance</div>*/}
							{/*</a>*/}
						{/*</div>*/}
						{/*<div className="cta-subitem distributed">*/}
							{/*<a href="/come-see-us" className="cta-link w-inline-block">*/}
								{/*<img*/}
									{/*src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f08470e4beefa3f54_Find%20Us.svg"*/}
									{/*alt=""*/}
									{/*className="image"*/}
								{/*/>*/}
								{/*<div>Find us</div>*/}
							{/*</a>*/}
							{/*<a href="/meet-our-team" className="cta-link w-inline-block">*/}
								{/*<img*/}
									{/*src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg"*/}
									{/*alt=""*/}
									{/*className="image"*/}
								{/*/>*/}
								{/*<div>Meet our Team</div>*/}
							{/*</a>*/}
							{/*<a href="/for-providers" className="cta-link w-inline-block">*/}
								{/*<img*/}
									{/*src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead313661e7266876eedf_Providers.svg"*/}
									{/*alt=""*/}
									{/*className="image"*/}
								{/*/>*/}
								{/*<div>Providers</div>*/}
							{/*</a>*/}
						{/*</div>*/}
					{/*</aside>*/}
				</section>

			</IndexLayout>
		);
	}
}

export default FinishedPage;
