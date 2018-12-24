import {Appointment} from "../api/api";

function copyAppointment(o): Appointment {
	if (!o.partitionKey) {
		throw 'No partitionKey';
	}
	if (!o.rowKey) {
		throw 'No rowKey';
	}
	return {
		resourceId: o.resourceId,
		serviceType: o.serviceType,
		serviceLength: o.serviceLength,
		firstName: o.firstName,
		lastName: o.lastName,
		phone: o.phone,
		email: o.email,
		address1: o.address1,
		city: o.city,
		state: o.state,
		zip: o.zip,
		height: o.height,
		weight: o.weight,
		reminder: o.reminder,
		doctorName: o.doctorName,
		doctorPhone: o.doctorPhone,
		insuranceCarrier: o.insuranceCarrier,
		insuranceGroupNumber: o.insuranceGroupNumber,
		insurancePolicyNumber: o.insurancePolicyNumber,
		insuranceVerified: o.insuranceVerified,
		priorAuthObtained: o.priorAuthObtained,
		orderEnteredToRIS: o.orderEnteredToRIS,
		patientWasCalled: o.patientWasCalled,
		confirmed: o.confirmed,
		orderImageUrl: o.orderImageUrl,
		insuranceFrontUrl: o.insuranceFrontUrl,
		insuranceBackUrl: o.insuranceBackUrl,
		surveyDataJson: o.surveyDataJson,
		approvedDate: o.approvedDate,
		submittedDate: o.submittedDate,
		confirmedDate: o.confirmedDate,
		birthday: o.birthday,
		partitionKey: o.partitionKey,
		rowKey: o.rowKey,
		timestamp: o.timestamp,
		eTag: '*',
	};
}

export default copyAppointment;
