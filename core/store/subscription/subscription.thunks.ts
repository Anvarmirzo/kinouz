import {createAsyncThunk} from '@reduxjs/toolkit';
import {SubscriptionService} from '../../services';
import {setSubscriptionTypesAction} from './subscription.slices';

export const getSubscriptionTypesThunk = createAsyncThunk(
	'subscription/getSubscriptionTypes',
	async (params: {skip: number} | undefined, thunkAPI) => {
		const result = await SubscriptionService.getSubscriptionTypes(params, thunkAPI.signal);

		if (result) {
			thunkAPI.dispatch(setSubscriptionTypesAction({list: result.data, count: result.count}));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const subscribeThunk = createAsyncThunk(
	'subscription/subscribe',
	async (subscriptionTypeId: number, thunkAPI) => {
		return await SubscriptionService.subscribe(subscriptionTypeId, thunkAPI.signal);
	},
	{
		dispatchConditionRejection: true,
	}
);

export const unsubscribeThunk = createAsyncThunk(
	'subscription/unsubscribe',
	async (subscriptionTypeId: number, thunkAPI) => {
		return await SubscriptionService.unsubscribe(subscriptionTypeId, thunkAPI.signal);
	},
	{
		dispatchConditionRejection: true,
	}
);
