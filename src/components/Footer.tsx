import * as React from 'react'

const Footer: React.SFC<{}> = ({}) => (
	<footer className="cta-section centered-accented">
		<div className="cta-footer">
			<h2 className="cta-heading inline-block blue">Call : </h2>
			<h2 className="cta-heading inline-block">833-ideal-MR</h2><a href="/schedule"
																		 className="button large">Schedule</a></div>
		<div className="cta-footer"><img
			src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5ba3081aff7d475f9a6fa6d1_Logo%20Dark.svg"
			height="60" alt="" className="cta-branding"/><a href="/policies-and-hipaa-notice">Policies and
			Information</a></div>
	</footer>
);

export default Footer
