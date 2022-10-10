import api from '../api';
import {SubscriptionType} from '../models';
import {Toast} from '../utils';

export const SubscriptionService = {
	getSubscriptionTypes(params: {skip: number} = {skip: 0}) {
		return api
			.get<{data: SubscriptionType[]; count: number}>('subscription-type', {params})
			.then((res) => ({
				data: res.data.data.map((t) => new SubscriptionType(t)),
				count: res.data.count,
			}))
			.catch(Toast.error);
	},

	subscribe(subscriptionTypeId: number) {
		return api
			.post<{status: number; message: string}>(`subscription-type/subscribe/${subscriptionTypeId}`)
			.then((res) => {
				Toast.success(res.data.message);
				return res.data;
			})
			.catch(Toast.error);
	},

	unsubscribe(subscriptionId: number) {
		return api
			.post<{status: number; message: string}>(`subscription-type/unsubscribe/${subscriptionId}`)
			.then((res) => {
				Toast.success(res.data.message);
				return res.data;
			})
			.catch(Toast.error);
	},
};
