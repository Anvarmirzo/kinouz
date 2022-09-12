import {setActorAction, setActorsAction} from './actor.slices';
import {ActorService} from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getActorsThunk = createAsyncThunk<
	void,
	{skip: number; params: Record<string, string | number>}
>('actor/getAll', async (params = {skip: 0, params: {}}, thunkAPI) => {
	const res = await ActorService.getAll(params);

	if (res) {
		thunkAPI.dispatch(
			setActorsAction({
				actors: res.data,
				count: res.count,
			})
		);
	}
});

export const getActorThunk = createAsyncThunk<void, number>(
	'actor/getOne',
	async (id, thunkAPI) => {
		const res = await ActorService.getById(id);

		if (res) {
			thunkAPI.dispatch(setActorAction(res));
		}
	}
);
