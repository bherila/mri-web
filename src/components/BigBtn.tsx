import * as React from "react";

export const BigButton = ({href, img, wide, text}) => (
	<a
		href={href}
		className={`cta-link ${wide ? 'wider' : ''} w-inline-block`}
	>
		<img
			src={img}
			className="image"
		/>
		<div>{text}</div>
	</a>
);

