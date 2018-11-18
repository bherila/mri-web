import * as React from 'react'
import { Link } from 'gatsby'
import {EditFormBase} from '../../forms';
import * as Api from '../../api/api';
import Page from '../../components/Page'
import Container from '../../components/Container'
import IndexLayout from '../../layouts'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {SignOutButton} from "../../components/sign-out";
import {getAuthToken} from "../../helpers/authToken";

interface ISiteFormState {
	hideUnavailable: boolean;
	hideAvailable: boolean;
	open: boolean;
	reservedUnconfirmed: boolean;
	confirmed: boolean;
	search: string;
	modal: 'confirm' | 'edit' | 'release' | null;
	data: Api.SlotAvailabilityDate[];
	startTime: string;
	endTime: string;
	resourceName: string;
	contrast: string;
	date: string;
}

const styles = (theme: any) => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
	},
	table: {
		minWidth: 700,
	},
});

class RulesPage extends React.Component<{classes: any}, ISiteFormState>{
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
			contrast: '',
			date: 'yyyy-mm-dd',
		};
	}

	public componentDidMount() {
		new Api.ScheduleApi().userScheduleGET({
			search: '',
			authToken: getAuthToken(),
			locationId: '',
			withContrast: false,
		} as any).then((result) => {
			this.setState({data: result});
		}, (err) => {
			console.log(err);
			// TODO: loginRedirect()
		});
	}

	public render() {
		return (
			<IndexLayout>
				<Page>
					{this.renderInner()}
				</Page>
			</IndexLayout>
		);
	}

	public renderInner() {
		const {classes} = this.props;
		return (
			<div>
				<h2>Time Rules For This Location</h2>
				<table className={classes.table} style={{width: '500px'}} cellPadding={3}>
					<thead>
						<tr>
							<th>On this day</th>
							<th>Starting at time</th>
							<th>Until time</th>
							<th>Comment/Staff Name</th>
							<th>Allow Contrast?</th>
						</tr>
					</thead>
					<tbody>
						{/*{(data || []).map((date) => (date.times || []).map((slot) => this.applies(slot) && (*/}
							{/*<TableRow key={slot.slotId}>*/}
								{/*<TableCell>{date.friendlyBegin}, {slot.time} CST</TableCell>*/}
								{/*<TableCell>{slot.isAvailable ? 'Available' : 'Unavailable'}</TableCell>*/}
								{/*{slot.isAvailable ? (*/}
									{/*<TableCell>*/}
										{/*<button className="w-button" type="button" onClick={(e) => this.doConfirm(e)}>Schedule</button>*/}
									{/*</TableCell>*/}
								{/*):(*/}
									{/*<TableCell>*/}
										{/*<button className="w-button" type="button" onClick={(e) => this.doConfirm(e)}>Confirm</button>*/}
										{/*<button className="w-button" type="button" onClick={(e) => this.doRelease(e)}>Release</button>*/}
										{/*<button className="w-button" type="button" onClick={(e) => this.doEdit(e)}>View</button>*/}
									{/*</TableCell>*/}
								{/*)}*/}
							{/*</TableRow>*/}
						{/*)))}*/}
						<tr>
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
								{EditFormBase.boundTextboxValue('', this.state.resourceName, (resourceName) => this.setState({resourceName}))}
							</td>
							<td>
								{EditFormBase.boundChoices('', ['Contrast Unavailable', 'Contrast Available', 'Contrast Required'], this.state.contrast, (contrast) => this.setState({contrast}))}
							</td>
							<td>
								<button className="w-button" type="button" onClick={(e) => e.preventDefault()}>Add</button>
							</td>
						</tr>
					</tbody>
				</table>


				<SignOutButton/>
			</div>
		);
	}
}
// We need an intermediary variable for handling the recursive nesting.
const RulesPageWrapped = withStyles(styles)(RulesPage);
export default RulesPageWrapped;
