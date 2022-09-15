import {setActorAction, setActorsAction} from './actor.slices';
import {ActorService} from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getActorsThunk = createAsyncThunk<
	void,
	{skip: number; params: Record<string, string | number>}
>('actors/getAll', async (params = {skip: 0, params: {}}, thunkAPI) => {
	const res = await ActorService.getAll(params);

	if (res) {
		thunkAPI.dispatch(
			setActorsAction({
				list: res.data,
				count: res.count,
			})
		);
	}
});

export const getActorThunk = createAsyncThunk<void, number>(
	'actors/getOne',
	async (id, thunkAPI) => {
		const res = await ActorService.getById(id);

		if (res) {
			thunkAPI.dispatch(setActorAction(res));
		}
	}
);
