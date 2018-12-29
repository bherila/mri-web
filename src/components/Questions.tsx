import * as React from "react";

export const YesNoQuestion = (props: {text: string, val: boolean | null, onChange: any, id: string, children?: any}) => (
	<div>
		<div className="inputrow">
			<label htmlFor={props.id} className="flexlabel">{props.text}<br /></label>
			<div className="flexinput">
				<a href="javascript:void(0);" onClick={() => props.onChange(true)} className={`button green small ${props.val === true && 'selected'} w-button`}>
					Yes
				</a>
				<a href="javascript:void(0);" onClick={() => props.onChange(false)} className={`button green small ${props.val === false && 'selected'} w-button`}>
					No
				</a>
			</div>
		</div>
		{props.val === true && typeof props.children !== 'undefined' && <div className="inputrow">
            <span className="flexmargin">&nbsp;</span>
            <div className="flexsubitem">
			{props.children}
			</div>
		</div>}
	</div>
);

export const TextQuestion = ({text, val, onChange, id, required}) => (
	<div className="inputrow"><label htmlFor={id} className="flexlabel">{text}<br /></label>
		<input
			type="text"
			className="flexinput w-input"
			maxLength={256}
			name={id}
			required={required}
			onChange={(e) => onChange(e.currentTarget.value)}
			value={val || ''}
			data-name={id}
			id={id}
		/>
	</div>
);

// export class ListQuestiton = ({text, val, onChange, id})