import {
	ApiResultAttributedItemList, ApiResultOrderViewModel, CloudCellarApi, CloudCellarV2, ItemDetailApi, OfferApi,
	OrderStatusApi,
} from './api';

// UrlToFilter('/k1=v1/k2=v2/k3=v3');

export interface IFilterKeys {
	selectedAppellation: string;
	selectedRegion: string;
	selectedVarietal: string;
	selectedShipStatus?: string;
	wineSef?: string;
}


export function makeCloudPromise(cloudSef: string, filters: IFilterKeys) {
	const definedFilter = typeof filters !== 'undefined';
	console.log('cloudPromiseFilters', filters);
	return new Promise((resolve, reject) => {
		new CloudCellarApi().cloudCellarGetV2({
			userName: cloudSef,
			search: '',
			appellation: definedFilter ? filters.selectedAppellation : '',
			region: definedFilter ? filters.selectedRegion : '',
			varietal: definedFilter ? filters.selectedVarietal : '',
			shipStatus: definedFilter ? filters.selectedShipStatus : '',
		}).then((cloudCellarResult: CloudCellarV2) => {
			cloudCellarResult.allItems.items.forEach((item) => item.qtyInCart = (item.qtyInCart || 0));
			cloudCellarResult.allItems.items = cloudCellarResult.allItems.items.filter((item) => item.item.sku.indexOf('LETTER') !== 0);
			cloudCellarResult.allItems.items = cloudCellarResult.allItems.items.sort((a, b) => b.qtyAvailable - a.qtyAvailable);
			resolve(cloudCellarResult);

		}, (error) => {
			console.log('Failed to load cellar', error, cloudSef);
			reject(error);
		});
	});
}

export function makeOfferPromise(offerSef) {
	return new Promise((resolve, reject) => {
		if (offerSef) {
			new OfferApi().offerGetDetail({offerSef}).then(
				(result) => resolve(result),
				(err) => resolve(null),
			);
		} else {
			resolve(null);
		}
	});
}

export function makeOrderPromise(orderId: string): Promise<ApiResultOrderViewModel> {
	return new Promise((resolve, reject) => {
		console.log('Loading order ' + orderId);
		new OrderStatusApi().orderStatusGetOrder({orderId}).then((order) => {
			console.log(order);
			resolve(order);
		}, (error) => {
			console.log(error);
			resolve({
				message: error,
				success: false,
				value: null,
			});
		});
	});
}

export function defaultFilterValues(): IFilterKeys {
	return {
		selectedAppellation: '',
		selectedRegion: '',
		selectedVarietal: '',
		selectedShipStatus: '',
		wineSef: '',
	};
}

export function makeItemListPromise(filters: IFilterKeys, pageNumber: string) {
	const definedFilter = typeof filters !== 'undefined';
	const page = parseInt(pageNumber, 10);
	console.log('pagenum: ', pageNumber);
	return new Promise((resolve, reject) => {
		const api = new ItemDetailApi();
		api.itemDetailListItemDetailWithSku({
			search: '',
			skip: (page + 1) * 20,
			take: 20,
			appellation: definedFilter ? filters.selectedAppellation : '',
			region: definedFilter ? filters.selectedRegion : '',
			varietal: definedFilter ? filters.selectedVarietal : '',
		}).then((result: ApiResultAttributedItemList) => {
			result.value.items = result.value.items.sort((a, b) => b.qtyAvailable - a.qtyAvailable);
			resolve(result.value);
		}, (error) => {
			console.log('Failed to load wine list!', error);
			resolve(null);
		});
	});
}
