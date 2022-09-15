import {MovieService} from '../../services';
import {setMovieAction, setMoviesAction} from './movie.slices';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getMoviesThunk = createAsyncThunk<
	void,
	{skip?: number; params?: Record<string, number | string>} | void
>('movies/getAll', async (payload, thunkAPI) => {
	const movies = await MovieService.getAll({
		params: payload?.params ?? {},
		skip: payload?.skip ?? 0,
	});

	if (movies) {
		thunkAPI.dispatch(setMoviesAction({list: movies.data, count: movies.count}));
	}
});

export const getMovieThunk = createAsyncThunk<void, number>(
	'movies/getOne',
	async (payload, thunkAPI) => {
		const movie = await MovieService.getById(payload);

		if (movie) {
			thunkAPI.dispatch(setMovieAction(movie));
		}
	}
);
