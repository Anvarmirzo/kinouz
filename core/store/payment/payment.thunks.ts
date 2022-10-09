import {createAsyncThunk} from '@reduxjs/toolkit';
import {PaymentService} from '../../services/payment.service';
import {IPostPayment} from '../../models/payment';
import {addPaymentAction} from './payment.slices';

export const addPaymentThunk = createAsyncThunk<void, IPostPayment>(
	'payment/addPayment',
	async (payload, thunkAPI) => {
		const result = await PaymentService.addPayment(payload);

		if (result) {
			thunkAPI.dispatch(addPaymentAction(result));
		}
	}
);

export const getSubscriptionTypeThunk = createAsyncThunk(
	'payment/getSubscriptionType',
	async (params: {skip: number} | undefined, thunkAPI) => {
		const result = await PaymentService.getSubscriptionType(params);
	}
);
