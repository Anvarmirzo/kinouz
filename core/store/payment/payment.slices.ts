import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PaymentModel} from '../../models/payment';

const initialState = {
	payment: PaymentModel,
};
export const {
	actions: {addPaymentAction},
	reducer: paymentReducer,
} = createSlice({
	name: 'payment',
	initialState,
	reducers: {
		addPaymentAction: (state, action: PayloadAction<PaymentModel>) => ({
			...state,
			...action.payload,
		}),
	},
});
