import {createAsyncThunk} from '@reduxjs/toolkit';
import {PaymentService} from '../../services/payment.service';
import {IPostPayment, PaymentModel} from '../../models/payment';
import {addPaymentAction, setPaymentsAction, setSubscriptionTypeAction} from './payment.slices';

export const addPaymentThunk = createAsyncThunk<PaymentModel | void, IPostPayment>(
	'payment/addPayment',
	async (payload, thunkAPI) => {
		const result = await PaymentService.addPayment(payload);

		if (result) {
			thunkAPI.dispatch(addPaymentAction(result));
			return result;
		}
	}
);

export const getPaymentsThunk = createAsyncThunk(
	'payment/getPayments',
	async (params: {params: {userId: number}; skip?: number}, thunkAPI) => {
		const result = await PaymentService.getPayments(params);

		if (result) {
			thunkAPI.dispatch(setPaymentsAction({list: result.data, count: result.count}));
		}
	}
);

export const getSubscriptionTypeThunk = createAsyncThunk(
	'payment/getSubscriptionType',
	async (params: {skip: number} | undefined, thunkAPI) => {
		const result = await PaymentService.getSubscriptionType(params);

		if (result) {
			thunkAPI.dispatch(setSubscriptionTypeAction({list: result.data, count: result.count}));
		}
	}
);
