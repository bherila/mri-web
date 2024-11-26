'use client'
import {setup} from "@/lib/tracker";

function Footer() {
	return (
	<footer className="cta-section centered-accented">
		<div className="cta-footer">
			<div className="footer-inline-block">
				<h2 className="cta-heading inline-block blue"><a href="tel:+18334332567">Call</a> : </h2>
				<h2 className="cta-heading inline-block"><a href="tel:+18334332567" className="white" ref={(e) => setup(e)}>833-IDEAL-MR</a>
				</h2>
			</div>
			<a href="https://schedule.idealmri.com" className="button large">Schedule Online</a></div>
		<div className="cta-footer"><img
			src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5ba3081aff7d475f9a6fa6d1_Logo%20Dark.svg"
			height="60" alt="" className="cta-branding"/><a href="https://www.idealmri.com/policies-and-hipaa-notice">Policies and
			Information</a></div>
	</footer>
	);
}

export default Footer
