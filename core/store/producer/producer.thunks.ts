import {createAsyncThunk} from '@reduxjs/toolkit';
import {ProducerService} from '../../services';
import {setProducerAction, setProducersAction} from './producer.slices';

export const getProducersThunk = createAsyncThunk(
	'producers/getAll',
	async (
		params: {skip: number; params: Record<string, string | number>} | undefined = {
			skip: 0,
			params: {},
		},
		thunkAPI
	) => {
		const res = await ProducerService.getAll(params, thunkAPI.signal);

		if (res) {
			thunkAPI.dispatch(setProducersAction({list: res.data, count: res.count}));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const getProducerThunk = createAsyncThunk(
	'producers/getOne',
	async (id: number, thunkAPI) => {
		const res = await ProducerService.getById(id, thunkAPI.signal);

		if (res) {
			thunkAPI.dispatch(setProducerAction(res));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);
