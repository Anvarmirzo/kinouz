import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PaymentModel, SubscriptionType} from '../../models/payment';

interface IState {
	payment: {
		list: PaymentModel[];
		count: number;
		current: PaymentModel | null;
	};
	subscriptionType: {
		list: SubscriptionType[];
		count: number;
	};
}

const initialState: IState = {
	payment: {
		list: [],
		count: 0,
		current: null,
	},
	subscriptionType: {
		list: [],
		count: 0,
	},
};

export const {
	actions: {addPaymentAction, setSubscriptionTypeAction, setPaymentsAction},
	reducer: paymentReducer,
} = createSlice({
	name: 'payment',
	initialState,
	reducers: {
		addPaymentAction: (state, action: PayloadAction<IState['payment']['current']>) => ({
			...state,
			payment: {
				...state.payment,
				current: state.payment.current
					? {...state.payment.current, ...action.payload}
					: action.payload,
			},
		}),
		setPaymentsAction: (state, action: PayloadAction<Omit<IState['payment'], 'current'>>) => ({
			...state,
			payment: {
				...state.payment,
				list: action.payload.list,
				count: action.payload.count,
			},
		}),
		setSubscriptionTypeAction: (state, action: PayloadAction<IState['subscriptionType']>) => ({
			...state,
			subscriptionType: {
				list: action.payload.list,
				count: action.payload.count,
			},
		}),
	},
});
