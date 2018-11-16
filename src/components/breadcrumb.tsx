import * as React from 'react';
import {Link} from 'gatsby';

const Chevron = (props: {translucent?: boolean}) => (
	<img
		src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5be12c8e888fb5963088dc64_chevron-right-blue-2.svg"
		width="38" height="38" alt="Chevron right" className={props.translucent ? 'translucent' : ''}/>
);

export const Ez123 = (props: {num: number}) => (
	<div>
		<div className="breadcrumb-row">
			<div className={'circled ' + (props.num < 1 ? 'translucent' : '') }>1</div>
			<Chevron translucent={props.num < 2} />
			<div className={'circled ' + (props.num < 2 ? 'translucent' : '') }>2</div>
			<Chevron translucent={props.num < 3} />
			<div className={'circled ' + (props.num < 3 ? 'translucent' : '') }>3</div>
		</div>
		<div className="breadcrumb-row">
			{props.num === 1 && <h3><strong>Step 1.</strong> Your details</h3>}
			{props.num === 2 && <h3><strong>Step 2.</strong> Choose your scan</h3>}
			{props.num === 3 && <h3><strong>Step 3.</strong> Health &amp; Safety Information</h3>}
		</div>
	</div>
);

export const OrderBreadcrumb = ({value}) => (
    <Link to="/have-order"
       className="breadcrumb w-button" style={{display: 'none'}}>
		{value ? 'Have Doctor\'s Order' : 'No Order'} ✓
	</Link>
);

export const MriTypeBreadcrumb = ({value}) => {
	if (typeof value === 'string') {
		return (
			<Link to="/mri-type" className="breadcrumb w-button">
				Scan type: {value}
			</Link>
		);
	} else {
		return (
			<Link to="/mri-type" className="breadcrumb w-button">
				Scan type: {value.name || 'e!name'} {value.contrast || 'e!contrast'}
			</Link>
		)
	}
};

export const TimeslotBreadcrumb = ({value}) => (
	<Link to="/pick-time"
	   className="breadcrumb w-button">
		{value} <br /><small>(not yet reserved)</small>
	</Link>
);
