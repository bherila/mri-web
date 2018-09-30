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
    <header className="nav-container">
        <div className="spacer" />
        <div className="nav-flex">
            <a href="/" className="brand-link left-spacing w-nav-brand">
                <img
                    src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5ba3081aff7d475f9a6fa6d1_Logo%20Dark.svg"
                    className="image-2"
                />
            </a>
            <div className="nav-right">
                <div className="cta-top w-hidden-tiny">
                    <div className="cta-heading inline-block blue">CALL :</div>
                    <div className="cta-heading inline-block">978-987-4291</div>
                    <a href="#" className="button small">
                        Schedule
                    </a>
                </div>
                <div>
                    <div
                        data-collapse="medium"
                        data-animation="default"
                        data-duration={400}
                        className="navbar w-nav"
                    >
                        <nav
                            role="navigation"
                            className="navigation-menu w-nav-menu"
                        >
                            <a
                                href="/why-ideal-mri"
                                className="navigation-link white w-nav-link"
                            >
                                Why idealMRI?
                            </a>
                            <a
                                href="/what-to-expect"
                                className="navigation-link white w-nav-link"
                            >
                                What to Expect
                            </a>
                            <a
                                href="/pricing-and-insurance"
                                className="navigation-link white w-nav-link"
                            >
                                Pricing &amp; Insurance
                            </a>
                            <a
                                href="/come-see-us"
                                className="navigation-link white w-nav-link"
                            >
                                Locations
                            </a>
                        </nav>
                        <div className="hamburger-button white w-nav-button">
                            <div className="w-icon-nav-menu" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
);
// {/*<header className="nav-container">*/}
// 		{/*<div className={css`${Webflow.spacer}`} />*/}
// 		{/*<div className={css`${Webflow.navFlex}`}>*/}
//             {/*<a href="/" className={css`${Webflow.brandLink} ${Webflow.wNavBrand}`}>*/}
//                 {/*<img src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5ba3081aff7d475f9a6fa6d1_Logo%20Dark.svg" className={css`${Webflow.image2}`} />*/}
//             {/*</a>*/}
// 			{/*<div className={css`${Webflow.navRight}`}>*/}
// 				{/*<div className={css`${Webflow.ctaTop} ${Webflow.wHiddenTiny}`}>*/}
// 					{/*<div className={css`${Webflow.ctaHeading} ${Webflow.wInlineBlock} ${Webflow.blue}`}>CALL :</div>*/}
// 					{/*<div className={css`${Webflow.ctaHeading} ${Webflow.wInlineBlock} ${Webflow.blue}`}>978-987-4291</div>*/}
//                     {/*<a href="#" className={css`${Webflow.button} ${Webflow.small}`}>Schedule</a></div>*/}
// 				{/*<div>*/}
// 					{/*<div data-collapse="medium" data-animation="default" data-duration={400} className="navbar w-nav">*/}
// 						{/*<nav role="navigation" className="navigation-menu w-nav-menu"><a href="/why-ideal-mri" className="navigation-link white w-nav-link">Why idealMRI?</a><a href="/what-to-expect" className="navigation-link white w-nav-link">What to Expect</a><a href="/pricing-and-insurance" className="navigation-link white w-nav-link">Pricing &amp; Insurance</a><a href="/come-see-us" className="navigation-link white w-nav-link">Locations</a></nav>*/}
// 						{/*<div className="hamburger-button white w-nav-button">*/}
// 							{/*<div className="w-icon-nav-menu" />*/}
// 						{/*</div>*/}
// 					{/*</div>*/}
// 				{/*</div>*/}
// 			{/*</div>*/}
// 		{/*</div>*/}
// 	{/*</header>*/}
// );

// const StyledHeader = styled.header`
//   height: ${heights.header}px;
//   padding: 0 ${dimensions.containerPadding}rem;
//   background-color: ${colors.brand};
//   color: ${transparentize(0.5, colors.white)};
// `
//
// const HeaderInner = styled(Container)`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   height: 100%;
// `
//
// const HomepageLink = styled(Link)`
//   color: ${colors.white};
//   font-size: 1.5rem;
//   font-weight: 600;
//
//   &:hover,
//   &:focus {
//     text-decoration: none;
//   }
// `
//
// interface HeaderProps {
//   title: string
// }
//
// const Header: React.SFC<HeaderProps> = ({ title }) => (
//   <StyledHeader>
//     <HeaderInner>
//       <HomepageLink to="/">{title}</HomepageLink>
//     </HeaderInner>
//   </StyledHeader>
// )

export default Header
