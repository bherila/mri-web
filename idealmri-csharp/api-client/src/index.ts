export * from './api';
export * from './credit-card';
export * from './defaults';
export * from './error';
export * from './states';
export * from './validation';
export * from './util';
export * from './checkout-util';
export * from './promises';
export * from './auth';

export const URL_BASE = 'https://www.undergroundcellar.com/'; // TODO: Change this?
export const WINE_IMG_URL_BASE = URL_BASE + 'wine-img/'; // TODO: Change this?
export const DETAIL_BASE_URL = '/wine-deals/';

export const wineSizes = ['??', '375mL', '750mL', '100mL', '187mL', '1.5L', '1.0L', '3.0L'];

export function getWineSize(id: number) {
	if (id > 0 && id < 8) {
		return wineSizes[id];
	}
	else {
		return '750mL';
	}
};
