import * as React from "react";
import {Link} from "gatsby";

export const BigButton = ({href, img, wide, text}) => (
	<Link to={href}
		  className={`cta-link ${wide ? 'wider' : ''} w-inline-block`}>
		<img
			src={img}
			className="image"
			style={{marginRight: '8px'}}
		/>
		<div>{text}</div>
	</Link>
);

export const BigButtonJs = ({onClick, img, wide, text}) => (
	<a href="javascript:void(0)"
	   onClick={onClick}
	   className={`cta-link ${wide ? 'wider' : ''} w-inline-block`}>
		<img
			src={img}
			className="image"
			style={{marginRight: '8px'}}
		/>
		<div>{text}</div>
	</a>
);
