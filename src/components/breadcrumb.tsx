import * as React from 'react';
import {Link} from 'gatsby';
import {SlotAvailabilityTime} from "../api/api";

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

export const OrderBreadcrumb = (props: {value: boolean}) => (
    <Link to="/have-order"
       className="breadcrumb w-button" style={{display: 'none'}}>
		{props.value ? 'Have Doctor\'s Order' : 'No Order'} ✓
	</Link>
);

export const MriTypeBreadcrumb = ({value}) => {
	if (!value) {
		return (
			<Link to="/mri-type" className="breadcrumb w-button">
				Click here to select MRI type
			</Link>
		);
	}
	if (typeof value === 'string') {
		return (
			<Link to="/mri-type" className="breadcrumb w-button">
				Scan type: {value}
			</Link>
		);
	}
	return (
		<Link to="/mri-type" className="breadcrumb w-button">
			Scan type: {value.name || 'e!name'} {value.contrast || 'e!contrast'}
		</Link>
	)
};

export const TimeslotBreadcrumb = (props: {slot: SlotAvailabilityTime | null}) => (
	!!props.slot ? (
		<Link to="/pick-time" className="breadcrumb w-button">
			{(props.slot.slotId || 'no time selected').replace(/(\d{4})-(\d{2})-(\d{2})T([^\s]{5}).*/g, "$2/$3/$1 at $4")}<br /><small>(not yet reserved)</small>
		</Link>
	) : <div />
);
