import * as React from 'react'
import styled from 'react-emotion'
import { transparentize } from 'polished'
import { Link } from 'gatsby'

import { heights, dimensions, colors } from '../styles/variables'
import Container from './Container'
import * as Webflow from '../styles/webflow';
import { css } from "emotion";

const StyledHeader = styled.header('navContainer');

const Header: React.SFC<{}> = ({}) => (
	<div className="header">
		<div className="nav-grid">
			<div id="w-node-82dfbff5e208-14f3913a" className="cta-top-2">
				<div className="cta-heading inline-block blue">CALL :</div>
				<div className="cta-heading inline-block"><a href="tel:+18334332567" className="white">833-IDEAL-MR</a>
				</div>
				<a href="/schedule" className="button-3">Schedule Online</a></div>
			<a href="/" id="w-node-82dfbff5e20f-14f3913a" className="w-nav-brand w--current"><img
				src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5ba3081aff7d475f9a6fa6d1_Logo%20Dark.svg"
				alt=""/></a>
			<div data-collapse="medium" data-animation="default" data-duration="400" id="w-node-82dfbff5e211-14f3913a"
				 className="navbar w-nav">
				<nav role="navigation" className="navigation-menu w-nav-menu"><a href="/why-ideal-mri"
																				 className="navigation-link-2 white w-nav-link">Why
					ideal MRI</a><a href="/what-to-expect" className="navigation-link-2 white w-nav-link">What to
					Expect</a><a href="/pricing-and-insurance"
								 className="navigation-link-2 white w-nav-link">Pricing &amp; Insurance</a><a
					href="/for-clinicians" className="navigation-link-2 white w-nav-link">For Clinicians</a><a
					href="/come-see-us" className="navigation-link-2 white w-nav-link">Find Us</a></nav>
				<div className="hamburger-button-2 white w-nav-button">
					<div className="w-icon-nav-menu"></div>
				</div>
			</div>
		</div>
	</div>
);

export default Header
