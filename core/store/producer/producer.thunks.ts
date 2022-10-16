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
		const res = await ProducerService.getAll(params);

		if (res) {
			thunkAPI.dispatch(setProducersAction({list: res.data, count: res.count}));
		}
	}
);

export const getProducerThunk = createAsyncThunk(
	'producers/getOne',
	async (id: number, thunkAPI) => {
		const res = await ProducerService.getById(id);

		if (res) {
			thunkAPI.dispatch(setProducerAction(res));
		}
	}
);
