import {MovieService} from '../../services';
import {
	setFavoriteMoviesAction,
	setHistoryMoviesAction,
	setMovieAction,
	setMoviesAction,
	setNewMoviesAction,
} from './movie.slices';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {MovieModel} from '../../models';

export const getMoviesThunk = createAsyncThunk<
	void,
	{skip?: number; params?: Record<string, number | string | boolean>} | void
>('movies/getAll', async (payload, thunkAPI) => {
	const movies = await MovieService.getAll({
		params: payload?.params ?? {},
		skip: payload?.skip ?? 0,
	});

	if (movies) {
		if (payload?.params?.isNew) {
			thunkAPI.dispatch(setNewMoviesAction(movies.data));
		} else {
			thunkAPI.dispatch(setMoviesAction({list: movies.data, count: movies.count}));
		}
	}
});

export const getMovieThunk = createAsyncThunk<void, string | number>(
	'movies/getOne',
	async (payload, thunkAPI) => {
		let movie: MovieModel | void;

		if (typeof payload === 'string') {
			movie = await MovieService.getBySlug(payload);
		} else {
			movie = await MovieService.getById(payload);
		}

		if (movie) {
			thunkAPI.dispatch(setMovieAction(movie));
		}
	}
);

export const addMovieToFavorite = createAsyncThunk<
	Promise<void | {message: string; status: number}>,
	number
>('movies/add-to-favorite', async (payload, thunkAPI) => {
	return await MovieService.addToFavorite(payload);
});

export const getFavoriteMoviesThunk = createAsyncThunk<void, void>(
	'movies/get-favorites',
	async (_, thunkAPI) => {
		const movies = await MovieService.getFavorites();

		if (movies) {
			thunkAPI.dispatch(setFavoriteMoviesAction(movies.data));
		}
	}
);

export const getHistoryMoviesThunk = createAsyncThunk<void, void>(
	'movies/get-history',
	async (_, thunkAPI) => {
		const movies = await MovieService.getHistory();

		if (movies) {
			thunkAPI.dispatch(setHistoryMoviesAction(movies.data));
		}
	}
);
