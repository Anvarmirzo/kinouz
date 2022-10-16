import {setActorAction, setActorsAction} from './actor.slices';
import {ActorService} from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getActorsThunk = createAsyncThunk(
	'actors/getAll',
	async (
		params: {skip: number; params: Record<string, string | number>} = {skip: 0, params: {}},
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

export const getActorThunk = createAsyncThunk('actors/getOne', async (id: number, thunkAPI) => {
	const res = await ActorService.getById(id);

	if (res) {
		thunkAPI.dispatch(setActorAction(res));
	}
});
