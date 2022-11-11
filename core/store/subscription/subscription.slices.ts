import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SubscriptionType} from '../../models';

interface IState {
	list: SubscriptionType[];
	count: number;
}

const initialState: IState = {
	list: [],
	count: 0,
};

export const {
	actions: {setSubscriptionTypesAction},
	reducer: subscriptionReducer,
} = createSlice({
	name: 'subscription',
	initialState,
	reducers: {
		setSubscriptionTypesAction: (state: IState, action: PayloadAction<IState | null>) => ({
			list: action.payload?.list ?? [],
			count: action.payload?.count ?? 0,
		}),
	},
});
