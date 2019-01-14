import * as React from 'react'
import * as Api from '../../api/api';
import Page from '../../components/Page'
import AdminLayout from '../../layouts/admin'
import {PatientDetailsForm} from "../../components/patient-details";
import {SignOutButton} from "../../components/sign-out";
import {getAuthToken} from "../../helpers/authToken";
import {navigate} from "gatsby";
import {PatientReleaseForm} from "../../components/patient-release";
import ReactModal from 'react-modal';
import {isEmpty} from 'ucshared';
import urlUtility from 'url';

class DetailsPage extends React.Component<{}, {url?: urlUtility.Url; item?: Api.SlotAvailabilityTime}> {

	constructor(props, context) {
		super(props, context);
		this.state = {
			url: typeof location !== 'undefined' ? urlUtility.parse((location.href || ''), true) : undefined,
		};
	}

	public componentDidMount(): void {
		if (this.state.url && this.state.url.query) {
			const qs: any = this.state.url.query;
			const val = qs.appt;
			const item = JSON.parse(val);
			this.setState({item})
		}
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

	private renderInner() {
		const {item} = this.state;
		return !!item ? (
			<PatientDetailsForm
				selectedSlotAvailabilityTime={item}
				onConfirm={() => this.closeModal()}
				onCancel={() => this.closeModal()}
			/>
		) : <div>no item selected</div>;
	}

	private closeModal() {
		if (typeof window !== 'undefined') {
			window.close();
		}
	}
}

export default DetailsPage;
