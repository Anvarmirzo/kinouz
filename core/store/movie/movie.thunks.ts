import {MovieService} from '../../services';
import {
	setFavoriteMoviesAction,
	setHistoryMoviesAction,
	setMovieAction,
	setMoviesAction,
	setNewMoviesAction,
} from './movie.slices';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IMovieSearchParams, MovieModel} from '../../models';

export const getMoviesThunk = createAsyncThunk(
	'movies/getAll',
	async (
		args: {skip?: number; params?: Record<string, number | string | boolean>} | void,
		thunkAPI
	) => {
		const movies = await MovieService.getAll({
			params: args?.params ?? {},
			skip: args?.skip ?? 0,
		});

		if (movies) {
			thunkAPI.dispatch(setMoviesAction({list: movies.data, count: movies.count}));
		}
	}
);

export const getNewMoviesThunk = createAsyncThunk(
	'movies/getPremiers',
	async (args: {skip?: number; params: {categoryId?: number}}, thunkAPI) => {
		const movies = await MovieService.getAll({
			params: {...args.params, isPremier: true},
			skip: args.skip ?? 0,
		});

		if (movies) {
			thunkAPI.dispatch(setNewMoviesAction(movies.data));
		}
	}
);

export const getMovieThunk = createAsyncThunk(
	'movies/getOne',
	async (payload: string | number, thunkAPI) => {
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

export const searchMovieThunk = createAsyncThunk(
	'movie/search',
	async (payload: IMovieSearchParams) => {
		return await MovieService.search(payload);
	}
);

export const addMovieToFavorite = createAsyncThunk(
	'movies/add-to-favorite',
	async (payload: number) => {
		return await MovieService.addToFavorite(payload);
	}
);

export const getFavoriteMoviesThunk = createAsyncThunk(
	'movies/get-favorites',
	async (_, thunkAPI) => {
		const movies = await MovieService.getFavorites();

		if (movies) {
			thunkAPI.dispatch(setFavoriteMoviesAction({list: movies.data, count: movies.count}));
		}
	}
);

export const getHistoryMoviesThunk = createAsyncThunk('movies/get-history', async (_, thunkAPI) => {
	const movies = await MovieService.getHistory();

	if (movies) {
		thunkAPI.dispatch(setHistoryMoviesAction({list: movies.data, count: movies.count}));
	}
});
