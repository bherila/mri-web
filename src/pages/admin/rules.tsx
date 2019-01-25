import * as React from 'react'
import {EditFormBase} from '../../forms';
import * as Api from '../../api/api';
import Page from '../../components/Page'
import AdminLayout from '../../layouts/admin'
import {getAuthToken} from "../../helpers/authToken";
import {navigate} from "gatsby";
import {TimePickWidget} from "../../components/pick-time-component";
import {scanTypes} from "../../models/Scan";

interface IRuleEditorState {
	hideUnavailable: boolean;
	hideAvailable: boolean;
	open: boolean;
	reservedUnconfirmed: boolean;
	confirmed: boolean;
	search: string;
	modal: 'confirm' | 'edit' | 'release' | null;
	data: Api.AvailabilityRule[];
	startTime: string;
	endTime: string;
	resourceName: string;
	contrastReqStatus: string;
	err: string;
	date: string;
	newItemComment: string;
	previewContrast: boolean;
}

class RulesPage extends React.Component<{classes: any}, IRuleEditorState>{
	constructor(props, context) {
		super(props, context);
		this.state = {
			hideUnavailable: false,
			hideAvailable: false,
			open: false,
			reservedUnconfirmed: false,
			confirmed: false,
			search: '',
			modal: null,
			data: [],
			startTime: '7:00',
			endTime: '19:00',
			resourceName: '',
			contrastReqStatus: '',
			date: 'yyyy-mm-dd',
			err: '',
			newItemComment: '',
			previewContrast: false,
		};
	}

	public componentDidMount() {
		new Api.ResourceApi().availabilityRulesGET({
			search: '',
			authToken: getAuthToken(),
			locationId: '',
			withContrast: false,
		} as any).then((result) => {
			if (result.value) {
				this.setState({data: result.value || []});
			} else {
				this.setState({err: result.message || 'Error'});
			}
		}, (err) => {
			console.log(err);
			// TODO: loginRedirect()
		});

	}

	public render() {
		return (
			<AdminLayout>
				<Page>
					{this.renderInner()}
				</Page>
			</AdminLayout>
		);
	}

	public handleAddRule(e) {
		e.preventDefault();
		new Api.ResourceApi().availabilityRulesPOST({
			authToken: getAuthToken(),
			req: {
				status: this.state.contrastReqStatus,
				comment: this.state.newItemComment,
				startTime: this.state.startTime,
				endTime: this.state.endTime,
				onThisDay: this.state.search === 'Specific Date' ? this.state.date : this.state.search,
				partitionKey: 'DefaultLocation',
				rowKey: 'Auto',
				priority: 0,
				resourceID: this.state.resourceName,
			},
		}).then((resp) => {
			if (resp.success) {
				this.setState({data: resp.value || []});
			} else {
				alert(resp.message);
			}
		});
	}

	public handleDeleteRule(e) {
		e.preventDefault();
	}

	public renderTable() {
		return (
			<form action="#" onSubmit={(e) => this.handleAddRule(e)}>
				<table className="blue" style={{width: '500px'}} cellPadding={3}>
					<thead>
					<tr>
						<th style={{whiteSpace: 'nowrap'}}>#</th>
						<th style={{whiteSpace: 'nowrap'}}>On this day</th>
						<th style={{whiteSpace: 'nowrap'}}>Starting at time</th>
						<th style={{whiteSpace: 'nowrap'}}>Until time</th>
						<th style={{whiteSpace: 'nowrap'}}>ResID</th>
						<th style={{whiteSpace: 'nowrap'}}>Comment</th>
						<th style={{whiteSpace: 'nowrap'}}>Allow Contrast?</th>
						<th style={{whiteSpace: 'nowrap'}}>Actions</th>
					</tr>
					</thead>
					<tbody>
					{(this.state.data || []).map((rule) => (
						<tr key={(rule.partitionKey || '') + (rule.rowKey || '')}>
							<td style={{whiteSpace: 'nowrap'}}>{rule.priority}</td>
							<td style={{whiteSpace: 'nowrap'}}>{rule.onThisDay}</td>
							<td style={{whiteSpace: 'nowrap'}}>{rule.startTime}</td>
							<td style={{whiteSpace: 'nowrap'}}>{rule.endTime}</td>
							<td style={{whiteSpace: 'nowrap'}}>{rule.resourceID}</td>
							<td style={{whiteSpace: 'nowrap'}}>{rule.comment}</td>
							<td style={{whiteSpace: 'nowrap'}}>{rule.status}</td>
							<td style={{whiteSpace: 'nowrap'}}>
								<button className="button-2 w-button" type="button" style={{zoom: 0.7}}>▲</button>&nbsp;
								<button className="button-2 w-button" type="button" style={{zoom: 0.7}}>▼</button>
							</td>
						</tr>
					))}
					<tr>
						<td>New</td>
						<td>
							{EditFormBase.boundChoices(
								'',
								"Any Weekday,Weekend,Mon,Tue,Wed,Thu,Fri,Sat,Sun,Specific Date".split(','),
								this.state.search,
								(search) => this.setState({search}),
							)}
							{this.state.search === 'Specific Date' && (
								EditFormBase.boundTextboxValue(
									'',
									this.state.date,
									(date) => this.setState({date})
								)
							)}
						</td>
						<td>
							{EditFormBase.boundTextboxValue('', this.state.startTime, (startTime) => this.setState({startTime}))}
						</td>
						<td>
							{EditFormBase.boundTextboxValue('', this.state.endTime, (endTime) => this.setState({endTime}))}
						</td>
						<td>
							{EditFormBase.boundTextboxValue('',
								this.state.resourceName,
								(resourceName) => this.setState({resourceName})
							)}
						</td>
						<td>
							{EditFormBase.boundTextboxValue('',
								this.state.newItemComment,
								(newItemComment) => this.setState({newItemComment})
							)}
						</td>
						<td>
							{EditFormBase.boundChoices('',
								['Contrast Unavailable', 'Contrast Available', 'Contrast Required', 'Blocked'],
								this.state.contrastReqStatus,
								(contrastReqStatus) => this.setState({contrastReqStatus})
							)}
						</td>
						<td>
							<button className="w-button" type="submit">Add</button>
						</td>
					</tr>
					</tbody>
				</table>
			</form>
		);
	}

	private swapContrast(e: React.MouseEvent<HTMLAnchorElement>) {
		e.preventDefault();
		this.setState({previewContrast: !this.state.previewContrast});
	}

	public renderInner() {
		return (
			<div>
				<h2>Time Rules For This Location</h2>
				{this.renderTable()}

				<h3>Preview Schedule</h3>
				<p>Currently viewing <a href="javascript:void(0)" onClick={(e) => this.swapContrast(e)}>{this.state.previewContrast ? 'contrast' : 'non-contrast'} (click to swap)</a>.</p>
				<TimePickWidget
					onPick={(timeSlot) => console.log(timeSlot)}
					scan={{contrast: this.state.previewContrast ? 'with and without contrast' : '', name: '', time: scanTypes[0].time }}
				/>

				<button className="w-button" onClick={() => navigate('/admin/site')}>
					Go back to site
				</button>

			</div>
		);
	}
}

export default RulesPage;
