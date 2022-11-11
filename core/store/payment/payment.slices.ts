import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PaymentModel} from '../../models';

interface IState {
	payment: {
		list: PaymentModel[];
		count: number;
		current: PaymentModel | null;
	};
}

const initialState: IState = {
	payment: {
		list: [],
		count: 0,
		current: null,
	},
};

export const {
	actions: {addPaymentAction, setPaymentsAction},
	reducer: paymentReducer,
} = createSlice({
	name: 'payment',
	initialState,
	reducers: {
		addPaymentAction: (state: IState, action: PayloadAction<IState['payment']['current']>) => ({
			...state,
			payment: {
				...state.payment,
				current: state.payment.current
					? {...state.payment.current, ...action.payload}
					: action.payload,
			},
		}),

		setPaymentsAction: (
			state: IState,
			action: PayloadAction<Omit<IState['payment'], 'current'> | null>
		) => {
			if (action.payload) {
				return {
					...state,
					payment: {
						...state.payment,
						list: action.payload.list,
						count: action.payload.count,
					},
				};
			} else {
				return {...state, payment: {...state.payment, list: [], count: 0}};
			}
		},
	},
});
