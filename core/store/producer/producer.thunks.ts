import {createAsyncThunk} from '@reduxjs/toolkit';
import {ProducerService} from '../../services';
import {setProducerAction, setProducersAction} from './producer.slices';

export const getProducersThunk = createAsyncThunk<
	void,
	{skip: number; params: Record<string, string | number>}
>('producers/getAll', async (params = {skip: 0, params: {}}, thunkAPI) => {
	const res = await ProducerService.getAll(params);

	if (res) {
		thunkAPI.dispatch(setProducersAction(res));
	}
});

export const getProducerThunk = createAsyncThunk<void, number>(
	'producers/getOne',
	async (id, thunkAPI) => {
		const res = await ProducerService.getById(id);

		if (res) {
			thunkAPI.dispatch(setProducerAction(res));
		}
	}
);
