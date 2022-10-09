import api from '../api';
import {Toast} from '../utils';
import {IPostPayment, PaymentModel, SubscriptionType} from '../models/payment';

export const PaymentService = {
	addPayment(params: IPostPayment) {
		return api
			.post<PaymentModel>('payment', params)
			.then((res) => new PaymentModel(res.data))
			.catch(Toast.error);
	},

	getSubscriptionType(params: {skip: number} = {skip: 0}) {
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
			.post(`subscription-type/subscribe/${subscriptionTypeId}`)
			.then((res) => res.data)
			.catch(Toast.error);
	},

	unsubscribe(subscriptionId: number) {
		return api
			.post(`subscription-type/unsubscribe/${subscriptionId}`)
			.then((res) => res.data)
			.catch(Toast.error);
	},
};
