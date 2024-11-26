export function formatPhone(phone: string) {
	const ph = phone.replace(/[^\d9]+/g, '');
	const m = /([0-9]{3})([0-9]{3})([0-9]{4})/.exec(ph);
	if (m !== null && m.length === 4) {
		return `(${m[1]}) ${m[2]}-${m[3]}`;
	}
	return ph;
}

export function formatDate(date: string) {
	const dt = date.replace(/[^\d]+/g, '');
	const m = /([0-9]{2})\/?([0-9]{2})\/?([0-9]{4})/.exec(dt);
	if (m !== null && m.length === 4) {
		return `${m[1]}/${m[2]}/${m[3]}`;
	}
	return date;
}