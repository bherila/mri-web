'use client';
declare var fbq: any;
declare var ga: any;
export function setup(button: any) {
	if (!!button && typeof button !== 'undefined') {
		// fb pixel
		button.addEventListener('click', () => {
			fbq('track', 'Contact');
			ga('send', 'event', 'contact', 'click');
		}, false);
	}
}
