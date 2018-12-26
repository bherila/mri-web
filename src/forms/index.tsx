import * as React from 'react';
import DatePicker from 'react-datepicker';
import {isEmpty} from 'ucshared';

const moment = require('moment');
const formStyle = require('./formStyle.css');

export function formatAdminDate(date: any) {
	return moment(date).format('MM/DD/YYYY');
}

const Row = (props: any) => <div>{props.children}</div>;
const Col = (props: any) => <div>{props.children}</div>;

export class EditFormBase<TProps, TState> extends React.Component<TProps, TState> {
	public static formGroup = 'form-group';
	public static ctrlLabel = 'control-label';
	public static sm3 = '3';
	public static sm9 = '9';
	public static insertBlock = formStyle.insertBlock;
	public static detailBlock = formStyle.detailBlock;

	constructor(props, context) {
		super(props, context);
	}

	public static boundLabel(title: string, defaultValue: string | number | Date) {
		if (isEmpty(title)) {
			return <span>{(defaultValue || 'null').toString()}</span>;
		}
		return (
			<Row className={EditFormBase.formGroup}>
				<Col sm={EditFormBase.sm3}><label className={EditFormBase.ctrlLabel}>{title}</label></Col>
				<Col sm={EditFormBase.sm9}>
					{(defaultValue || 'null').toString()}
				</Col>
			</Row>
		);
	}

	public static boundTextbox(title: string, defaultValue: string | number | Date, bindFn: React.FormEventHandler<HTMLInputElement>, placeHolder?: string, readOnly?: boolean, isDisabled?: boolean) {
		const wrn = EditFormBase.renderWarnings(defaultValue);
		if (isEmpty(title)) {
			return (
				<span>
					<input
						disabled={isDisabled}
						maxLength={255}
						className="form-control"
						type="text"
						onChange={bindFn}
						value={defaultValue ? defaultValue.toString() : ''}
						placeholder={placeHolder || ''}
						readOnly={readOnly}
						style={!wrn ? {} : {backgroundColor: 'yellow'}}
					/>
					{wrn}
				</span>
			);
		}
		return (
			<Row className={EditFormBase.formGroup}>
				<Col sm={EditFormBase.sm3}><label className={EditFormBase.ctrlLabel}>{title}</label></Col>
				<Col sm={EditFormBase.sm9}>
					<input
						disabled={isDisabled}
						maxLength={255}
						className="form-control"
						type="text"
						onChange={bindFn}
						value={defaultValue ? defaultValue.toString() : ''}
						placeholder={placeHolder || ''}
						readOnly={readOnly}
						style={!wrn ? {} : {backgroundColor: 'yellow'}}
					/>
					{wrn}
				</Col>
			</Row>
		);
	}

	public static boundTextboxValue(title: string|null, defaultValue: string | number | Date, bindValFn: (value: string) => any, placeHolder?: string, readOnly?: boolean, isDisabled?: boolean, inputType?: string, className?: string) {
		const wrn = EditFormBase.renderWarnings(defaultValue);
		if (isEmpty(title)) {
			return (
				<span>
					<input
						disabled={isDisabled}
						maxLength={255}
						className={"form-control " + className || ''}
						type={inputType || 'text'}
						onChange={(e) => bindValFn(e.currentTarget.value)}
						value={defaultValue ? defaultValue.toString() : ''}
						placeholder={placeHolder || ''}
						readOnly={readOnly}
						style={!wrn ? {minWidth: '40px'} : {backgroundColor: 'yellow'}}
					/>
					{wrn}
				</span>
			);
		}
		return (
			<Row className={EditFormBase.formGroup}>
				<Col sm={EditFormBase.sm3}><label className={EditFormBase.ctrlLabel}>{title}</label></Col>
				<Col sm={EditFormBase.sm9}>
					{EditFormBase.boundTextboxValue(null, defaultValue, bindValFn, placeHolder, readOnly, isDisabled, inputType)}
				</Col>
			</Row>
		);
	}

	public static boundChoices(title: string|null, choices: Array<{label?: string, value: string}|string>, defaultValue: string | number | Date, bindValFn: (value: string) => any, placeHolder?: string, isDisabled?: boolean) {
		const wrn = EditFormBase.renderWarnings(defaultValue);
		if (isEmpty(title)) {
			const cc = choices.map((choice) => (typeof choice === 'string') ? {value: choice} : choice);
			return (
				<span>
					<select
						disabled={isDisabled}
						className="form-control"
						onChange={(e) => bindValFn(e.currentTarget.value)}
						value={defaultValue ? defaultValue.toString() : ''}
						placeholder={placeHolder || ''}
						style={!wrn ? {minWidth: '40px'} : {backgroundColor: 'yellow'}}
					>
						<option value="">(none)</option>
						{cc.map((choice, i) => <option key={choice.value + i} value={choice.value}>{choice.label || choice.value}</option>)}
					</select>
					{wrn}
				</span>
			);
		}
		return (
			<Row className={EditFormBase.formGroup}>
				<Col sm={EditFormBase.sm3}><label className={EditFormBase.ctrlLabel}>{title}</label></Col>
				<Col sm={EditFormBase.sm9}>
					{EditFormBase.boundChoices(null, choices, defaultValue, bindValFn, placeHolder, isDisabled)}
				</Col>
			</Row>
		);
	}


	public static submitRow(actionText?: string) {
		return (
			<Row className={EditFormBase.formGroup}>
				<Col sm={EditFormBase.sm3}/>
				<Col sm={EditFormBase.sm9}>
					{EditFormBase.submitButton(actionText)}
				</Col>
			</Row>
		);
	}

	public static submitButton(actionText?: string) {
		return (
			<button type="submit">{actionText || 'Submit'}</button>
		);
	}

	public static boundDate(title: string, bindFn: React.FormEventHandler<HTMLInputElement>, isStart: boolean, start?: Date, end?: Date, isDisabled?: boolean) {
		return (
			<Row className={EditFormBase.formGroup}>
				<Col sm={EditFormBase.sm3}><label className={EditFormBase.ctrlLabel}>{title}</label></Col>
				<Col sm={EditFormBase.sm9}>
					<DatePicker
						disabled={isDisabled}
						className={'form-control'}
						selected={isStart ? moment(start) : moment(end)}
						selectsEnd
						startDate={start && moment(start)}
						endDate={end && moment(end)}
						onChange={bindFn}
						dateFormatCalendar={'MMM YYYY'}
						showMonthDropdown
						showYearDropdown
					/>
				</Col>
			</Row>
		);
	}

	protected static renderWarnings(val: string|number|Date) {
		if (typeof val !== 'string') {
			return this.renderWarnings(val.toString());
		}
		if (val) {
			const vlc = val.toLowerCase();
			if (vlc.indexOf('included') > -1) {
				return <div className="alert alert-error"><b>Warning:</b> Consider removing term <em>included</em></div>;
			}
			if (vlc.indexOf('refund') > -1) {
				return <div className="alert alert-error"><b>Warning:</b> We don't offer refunds.</div>;
			}
		}
		return null;
	}

	public static boundTextarea(title: string, defaultValue: string | number, bindFn: React.FormEventHandler<HTMLTextAreaElement>) {
		const wrn = EditFormBase.renderWarnings(defaultValue);
		return (
			<Row className={EditFormBase.formGroup}>
				<Col sm={EditFormBase.sm3}><label className={EditFormBase.ctrlLabel}>{title}</label></Col>
				<Col sm={EditFormBase.sm9}>
				<textarea className="form-control" onChange={bindFn} value={defaultValue ? defaultValue.toString() : ''}
						  style={!wrn ? {} : {backgroundColor: 'yellow'}}
						  rows={5}/>
					{wrn}
				</Col>
			</Row>
		);
	}

	public static boundTextareaValue(title: string, defaultValue: string | number, bindFn: (value) => any) {
		const wrn = EditFormBase.renderWarnings(defaultValue);
		return (
			<Row className={EditFormBase.formGroup}>
				<Col sm={EditFormBase.sm3}><label className={EditFormBase.ctrlLabel}>{title}</label></Col>
				<Col sm={EditFormBase.sm9}>
				<textarea className="form-control"
						  onChange={(e) => bindFn(e.currentTarget.value)}
						  value={defaultValue ? defaultValue.toString() : ''}
						  style={!wrn ? {} : {backgroundColor: 'yellow'}}
						  rows={5}/>
					{wrn}
				</Col>
			</Row>
		);
	}

	public static boundCheckbox(title: string, defaultChecked: boolean, bindFn: React.FormEventHandler<HTMLInputElement>, readOnly?: boolean) {
		return <Row className={EditFormBase.formGroup}>
			<Col sm={EditFormBase.sm3}>
				<div className={EditFormBase.ctrlLabel}/>
			</Col>
			<Col sm={EditFormBase.sm9}>
				<div className="form-check">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" onChange={bindFn}
							   checked={defaultChecked}
							   disabled={readOnly}/>{' '}{title}
					</label>
				</div>
			</Col>
		</Row>;
	}

	public static boundCheckboxValue(title: string, defaultChecked: boolean, bindFn: (isChecked: boolean) => any, readOnly?: boolean) {
		return <Row className={EditFormBase.formGroup}>
			<Col sm={EditFormBase.sm3}>
				<div className={EditFormBase.ctrlLabel}/>
			</Col>
			<Col sm={EditFormBase.sm9}>
				<div className="form-check">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" onChange={(e) => bindFn(e.currentTarget.checked)}
							   checked={defaultChecked}
							   disabled={readOnly}/>{' '}{title}
					</label>
				</div>
			</Col>
		</Row>;
	}

	public static boundBooleanSwitch(title: string, defaultChecked: boolean, bindFn: (isChecked: boolean) => any, readOnly?: boolean) {
		return <Row className={EditFormBase.formGroup}>
			<Col sm={EditFormBase.sm3}>
				<div className={EditFormBase.ctrlLabel}/>
			</Col>
			<Col sm={EditFormBase.sm9}>
				<div className="form-check">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" onChange={(e) => bindFn(e.currentTarget.checked)}
							   checked={defaultChecked}
							   disabled={readOnly}/>{' '}{title}
					</label>
				</div>
			</Col>
		</Row>;
	}
}
