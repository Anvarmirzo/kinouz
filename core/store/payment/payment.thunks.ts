import {createAsyncThunk} from '@reduxjs/toolkit';
import {PaymentService} from '../../services';
import {IPostPayment} from '../../models';
import {addPaymentAction, setPaymentsAction} from './payment.slices';

export const addPaymentThunk = createAsyncThunk(
	'payment/addPayment',
	async (payload: IPostPayment, thunkAPI) => {
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
