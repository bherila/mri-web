import {OfferV2Entity} from './api';
import * as moment from 'moment';

function convertDateToUTC(date): Date {
	return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}

export function getTimeRemaining(offerDetail: OfferV2Entity) {
	if (offerDetail && offerDetail.expiryDate) {
		const data = offerDetail;
		const now = convertDateToUTC(new Date()).getTime();
		const expiryDate = new Date(data.expiryDate).getTime(); // already UTC
		if (now > expiryDate) {
			return 'Already Expired!';
		}
		let distance = (expiryDate - now) / 1000;

		const secondsInDay = 86400;
		const days = Math.floor(distance / secondsInDay);
		distance -= days * secondsInDay;

		const secondsInHour = 3600;
		const hours = Math.floor(distance / secondsInHour);
		distance -= hours * secondsInHour;

		const secondsInMinute = 60;
		const minutes = Math.floor(distance / secondsInMinute);
		distance -= minutes * secondsInMinute;

		const seconds = Math.floor(distance);
		return days + 'd: ' + hours + 'h: ' + minutes + 'm: ' + seconds + 's';
	} else {
		return '';
	}
}

export function toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export function cleanUrl(i: string): string {
    let val = i || '';
    val = val.toLowerCase().replace(/[^a-z0-9]/g, '-');
    val = val.replace(/-+/g, '-');
    return val;
}
