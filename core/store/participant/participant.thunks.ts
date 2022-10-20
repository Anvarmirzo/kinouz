import {setActorAction, setActorsAction} from './participant.slices';
import {ActorService} from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getActorsThunk = createAsyncThunk(
	'participant/actorsGetAll',
	async (
		params: {skip: number; params?: Record<string, string | number>} | undefined = {
			skip: 0,
			params: {},
		},
		thunkAPI
	) => {
		const res = await ActorService.getAll(params);

		if (res) {
			thunkAPI.dispatch(
				setActorsAction({
					list: res.data,
					count: res.count,
				})
			);
		}
	}
);

export const getActorThunk = createAsyncThunk(
	'participant/actorsGetOne',
	async (id: number, thunkAPI) => {
		const res = await ActorService.getById(id);

		if (res) {
			thunkAPI.dispatch(setActorAction(res));
		}
	}
);