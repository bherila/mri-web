import * as React from 'react'
import IndexLayout from '../layouts'
import ErrorDisplay from "../components/ErrorDisplay";
import {Link, navigate} from "gatsby";
import {Ez123} from "../components/breadcrumb";
import {IScanTypeState, scanTypes} from "../models/Scan";
import {SafetyState} from "../models/SafetyState";

class MriType extends React.Component<{}, IScanTypeState> {
	constructor(props, context) {
		super(props, context);
		this.state = {
			mriName: '',
			matches: scanTypes,
			oops: null,
			haveOrder: true,
			safetyState: SafetyState.loadState(),
		};
	}

	public componentDidMount() {
		if (typeof sessionStorage !== 'undefined') {
			this.setState({safetyState: SafetyState.loadState()});
		}
	}

	public setMriName(setTo: string) {
		const mriName = (setTo || '').toUpperCase();
		let nf = mriName.replace('MRI', '');
		nf = nf.replace(' OF', '');
		nf = nf.trim();
		const matches = scanTypes.filter((typ) =>
			(typ.name || '').toUpperCase().indexOf(nf) > -1 ||
			(typ.name2 || '').toUpperCase().indexOf(nf) > -1 ||
			(typ.name3 || '').toUpperCase().indexOf(nf) > -1
		);
		if (matches.length > 0) {
			this.setState({mriName, matches, oops: null});
		}
		else {
			this.setState({oops: mriName});
		}
	}

	public select(iScanType: string) {
		if (typeof sessionStorage !== 'undefined') {
			sessionStorage.setItem('scan', iScanType);
			navigate('/pick-time');
		}
	}

	public render() {
		return (
			<IndexLayout>
				<section id="Q3" className="vspace80 w-container">
					<div className="vspace40 centered w-row animated zoomIn">
						<div>
							<Ez123 num={2} />
						</div>
					</div>
					<div className="vspace40 centered w-row">
						<div className="w-col w-col-3" />
						<div className="w-col w-col-6">
							<form action="#" onSubmit={(e) => e.preventDefault()}>
								<h3><b>Ok,</b> what type of scan do you need?</h3>
								<div className="cta-subitem">
									<input type="text"
										   placeholder="Type scan name to search"
										   className="text-field w-input" maxLength={256} name="name-3"
										   data-name="Name 3" id="name-3"
										   value={this.state.mriName}
										   onChange={(e) => this.setMriName(e.currentTarget.value)}
									/>
									<div className="text-block-3"> OR </div>
									<Link to="/no-type" className="button w-button">
										I don't know
									</Link>
								</div>
							</form>
						</div>
						<div className="w-col w-col-3" />
					</div>
					{this.state.oops && (
						<ErrorDisplay>
							Oops! We didn't find any matches for '{this.state.oops}'. Please enter fewer characters. If we don't have the scan type listed, click "I don't know" above, and we will work with you personally to schedule your appointment.
						</ErrorDisplay>
					)}
					{(this.state.mriName || '').length > 0 && <table className="vspace80 w-row" style={{width: '100%', marginBottom: '80px'}} cellPadding={3} cellSpacing={3}>
						<thead>
						<tr>
							<th>Service Type</th>
							<th>Contrast</th>
							<th>Time Needed</th>
						</tr>
						</thead>
						<tbody>
						{this.state.matches.map((row) => (
							<tr key={JSON.stringify(row)}>
								<td>
									{row.name}
									{row.name2.length > 0 && `/${row.name2}`}
									{row.name3.length > 0 && `/${row.name3}`}
								</td>
								<td>{row.contrast}</td>
								<td>{row.time}</td>
								<td><button
									onClick={() => this.select(JSON.stringify(row))}
								>Select</button></td>
							</tr>
						))}
						</tbody>
					</table>}
				</section>
			</IndexLayout>
		);
	}
}

export default MriType;
