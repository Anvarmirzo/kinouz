import api from '../api';
import {Toast} from '../utils';
import {IPostPayment, PaymentModel} from '../models';

export const PaymentService = {
	addPayment(params: IPostPayment, signal?: AbortSignal) {
		return api
			.post<PaymentModel>('payment', params, {signal})
			.then((res) => new PaymentModel(res.data))
			.catch(Toast.error);
	},

	getPayments(params: {skip?: number; params: {userId: number}}, signal?: AbortSignal) {
		return api
			.get<{data: PaymentModel[]; count: number}>('payment', {
				params: {...params, skip: params.skip ?? 0},
				signal,
			})
			.then((res) => ({
				data: res.data.data.map((p) => new PaymentModel(p)),
				count: res.data.count,
			}))
			.catch(Toast.error);
	},
};
