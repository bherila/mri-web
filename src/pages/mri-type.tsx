import * as React from 'react'
import IndexLayout from '../layouts'
import ErrorDisplay from "../components/ErrorDisplay";
import {Link, navigate} from "gatsby";
import {Ez123, OrderBreadcrumb} from "../components/breadcrumb";

const types = [
	{name: 'Hip MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Hip MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Knee MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Knee MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Ankle MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Ankle MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Calf MRI', contrast: 'without contrast', time: '45 min', name2: 'Tib-Fib MRI', name3: 'Tibia Fibula MRI', name4: ''},
	{name: 'Calf MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Tib-Fib MRI', name3: 'Tibia Fibula MRI', name4: ''},
	{name: 'Foot MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Foot MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Thigh MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Thigh MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Hand MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Hand MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Wrist MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Wrist MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Forearm MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Forearm MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Elbow MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Elbow MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Humerus MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Humerus MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Shoulder MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Shoulder MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Cervical spine MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Cervical spine MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Multiple sclerosis protocol', name3: '', name4: ''},
	{name: 'Thoracic spine MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Thoracic spine MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Multiple sclerosis protocol', name3: '', name4: ''},
	{name: 'Lumbar spine MRI', contrast: 'without contrast', time: '45 min', name2: 'Low back pain MRI', name3: '', name4: ''},
	{name: 'Lumbar spine MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Brain MRI', contrast: 'without contrast', time: '45 min', name2: 'Memory loss MRI', name3: 'Concussion evaluation MRI', name4: ''},
	{name: 'Brain MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Pituitary (Brain MRI)', contrast: 'with and without contrast', time: '45 min', name2: 'Pituitary protocol MRI', name3: '', name4: ''},
	{name: 'Brain MRA', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Neck MRA', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Neck (soft tissues) MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Soft tissue neck MRI', name3: 'Neck mass MRI', name4: ''},
	{name: 'Chest MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Chest MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Abdomen MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Abdomen MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Liver lesion MRI', name3: 'Kidney lesion MRI', name4: 'Adrenal lesion MRI'},
	{name: 'MRCP', contrast: 'without contrast', time: '45 min', name2: 'Biliary MRI', name3: 'MR Cholangiogram', name4: ''},
	{name: 'Breast implant MRI', contrast: 'without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Pelvic (bony) MRI', contrast: 'without contrast', time: '45 min', name2: 'Sacrum MRI', name3: 'SI joint MRI', name4: ''},
	{name: 'Pelvic (bony) MRI', contrast: 'with and without contrast', time: '45 min', name2: '', name3: '', name4: ''},
	{name: 'Pelvic (prostate) MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Prostate MRI', name3: '', name4: ''},
	{name: 'Pelvic (rectum) MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Rectal MRI', name3: '', name4: ''},
	{name: 'Pelvic (female) MRI', contrast: 'with and without contrast', time: '45 min', name2: 'Female pelvis MRI', name3: 'Uterus MRI', name4: ''},
	{name: 'MR Enterography', contrast: 'with and without contrast', time: '90 min', name2: 'Crohns protocol MRI', name3: '', name4: ''},
];

interface IScanTypeState {
	name: string;
	matches: {name, contrast, time, name2, name3}[];
	fname: string;
	oops: string|null;
	haveOrder: boolean;
}

class MriType extends React.Component<{}, IScanTypeState> {
	constructor(props, context) {
		super(props, context);
		this.state = {name: '', matches: types, fname: '', oops: null, haveOrder: true};
	}

	public componentDidMount() {
		if (typeof sessionStorage !== 'undefined') {
			let name = sessionStorage.getItem('name') || '';
			name = name.split(' ')[0];
			const haveOrder = sessionStorage.getItem('haveOrder') === 'true';
			this.setState({fname: name, haveOrder});
		}
	}

	public setName(setTo: string) {
		let name = (setTo || '').toUpperCase();
		let nf = name.replace('MRI', '');
		nf = nf.replace(' OF', '');
		nf = nf.trim();
		const matches = types.filter((typ) =>
			(typ.name || '').toUpperCase().indexOf(nf) > -1 ||
			(typ.name2 || '').toUpperCase().indexOf(nf) > -1 ||
			(typ.name3 || '').toUpperCase().indexOf(nf) > -1
		);
		if (matches.length > 0) {
			this.setState({name, matches, oops: null});
		}
		else {
			this.setState({oops: name});
		}
	}

	public select(name: string) {
		if (typeof sessionStorage !== 'undefined') {
			sessionStorage.setItem('scan', name);
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
							<form action="#">
								<h3><b>Great!</b> {this.state.fname}, do you know what type of scan you need?</h3>
								<div className="cta-subitem">
									<input type="text"
										   placeholder="Type scan name to search"
										   className="text-field w-input" maxLength={256} name="name-3"
										   data-name="Name 3" id="name-3"
										   value={this.state.name}
										   onChange={(e) => this.setName(e.currentTarget.value)}
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
					{(this.state.name || '').length > 0 && <table className="vspace80 w-row" style={{width: '100%', marginBottom: '80px'}} cellPadding={3} cellSpacing={3}>
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
