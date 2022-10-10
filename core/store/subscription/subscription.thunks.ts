import {createAsyncThunk} from '@reduxjs/toolkit';
import {SubscriptionService} from '../../services';
import {setSubscriptionTypesAction} from './subscription.slices';

export const getSubscriptionTypesThunk = createAsyncThunk(
	'subscription/getSubscriptionTypes',
	async (params: {skip: number} | undefined, thunkAPI) => {
		const result = await SubscriptionService.getSubscriptionTypes(params);

		if (result) {
			thunkAPI.dispatch(setSubscriptionTypesAction({list: result.data, count: result.count}));
		}
	}
);

export const subscribeThunk = createAsyncThunk(
	'subscription/subscribe',
	async (subscriptionTypeId: number, thunkAPI) => {
		const result = await SubscriptionService.subscribe(subscriptionTypeId);

		if (result) {
			return result;
		}
	}
);

export const unsubscribeThunk = createAsyncThunk(
	'subscription/unsubscribe',
	async (subscriptionTypeId: number, thunkAPI) => {
		const result = await SubscriptionService.unsubscribe(subscriptionTypeId);

		if (result) {
			return result;
		}
	}
);
