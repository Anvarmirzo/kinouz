import api from '../api';
import {SubscriptionModel, SubscriptionType} from '../models';
import {Toast} from '../utils';

export const SubscriptionService = {
	getSubscriptionTypes(params: {skip: number} = {skip: 0}, signal?: AbortSignal) {
		return api
			.get<{data: SubscriptionType[]; count: number}>('subscription-type', {params, signal})
			.then((res) => ({
				data: res.data.data.map((t) => new SubscriptionType(t)),
				count: res.data.count,
			}))
			.catch(Toast.error);
	},

	subscribe(subscriptionTypeId: number, signal?: AbortSignal) {
		return api
			.post<{status: number; message: string}>(
				`subscription-type/subscribe/${subscriptionTypeId}`,
				undefined,
				{signal}
			)
			.then((res) => {
				Toast.success(res.data.message);
				return res.data;
			})
			.catch(Toast.error);
	},

	unsubscribe(subscriptionId: number, signal?: AbortSignal) {
		return api
			.post<SubscriptionModel>(`subscription-type/unsubscribe/${subscriptionId}`, undefined, {
				signal,
			})
			.then((res) => res.data)
			.catch(Toast.error);
	},
};
