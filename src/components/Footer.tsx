import * as React from 'react'

const Footer: React.SFC<{}> = ({}) => (
	<footer className="cta-section centered-accented">
		<div className="cta-subitem">
			<h2 className="cta-heading inline-block blue">Call : </h2>
			<h2 className="cta-heading inline-block">978-987-4291</h2><a href="#" className="button large">Schedule</a>
		</div>
		<div className="cta-subitem"><img
			src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5ba3081aff7d475f9a6fa6d1_Logo%20Dark.svg"
			height="60" className="cta-branding"/><a href="#">Privacy Policy and Information</a></div>
	</footer>
);

export default Footer
