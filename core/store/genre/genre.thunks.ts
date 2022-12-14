import {setGenreAction, setGenresAction} from './genre.slices';
import {GenreService} from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getGenresThunk = createAsyncThunk(
	'genres/getAll',
	async (
		params: {skip: number; params?: Record<string, string | number>} | undefined = {
			skip: 0,
			params: {},
		},
		thunkAPI
	) => {
		const res = await GenreService.getAll(params, thunkAPI.signal);

		if (res) {
			thunkAPI.dispatch(setGenresAction({count: res.count, list: res.data}));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const getGenreThunk = createAsyncThunk(
	'genres/getOne',
	async (id: number, thunkAPI) => {
		const res = await GenreService.getById(id, thunkAPI.signal);

		if (res) {
			thunkAPI.dispatch(setGenreAction(res));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);
