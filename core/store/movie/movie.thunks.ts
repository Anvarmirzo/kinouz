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
		const movies = await MovieService.getAll(
			{
				params: args?.params ?? {},
				skip: args?.skip ?? 0,
			},
			thunkAPI.signal
		);
		if (movies) {
			thunkAPI.dispatch(setMoviesAction({list: movies.data, count: movies.count}));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const getPremiersThunk = createAsyncThunk(
	'movies/getPremiers',
	async (args: {skip?: number; params: {categoryId?: number}}, thunkAPI) => {
		const movies = await MovieService.getAll(
			{
				params: {...args.params, isPremier: true},
				skip: args.skip ?? 0,
			},
			thunkAPI.signal
		);

		if (movies) {
			thunkAPI.dispatch(setNewMoviesAction(movies.data));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const getMovieThunk = createAsyncThunk(
	'movies/getOne',
	async (payload: string | number, thunkAPI) => {
		let movie: MovieModel | void;

		if (typeof payload === 'string') {
			movie = await MovieService.getBySlug(payload, thunkAPI.signal);
		} else {
			movie = await MovieService.getById(payload, thunkAPI.signal);
		}

		if (movie) {
			thunkAPI.dispatch(setMovieAction(movie));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const searchMovieThunk = createAsyncThunk(
	'movie/search',
	async (payload: IMovieSearchParams, thunkAPI) => {
		return await MovieService.search(payload, thunkAPI.signal);
	},
	{
		dispatchConditionRejection: true,
	}
);

export const addMovieToFavoriteThunk = createAsyncThunk(
	'movies/add-to-favorite',
	async (payload: number, thunkAPI) => {
		return await MovieService.addToFavorite(payload, thunkAPI.signal);
	},
	{
		dispatchConditionRejection: true,
	}
);

export const getFavoriteMoviesThunk = createAsyncThunk(
	'movies/get-favorites',
	async (
		payload: {skip: number; params?: Record<string, number | string>} | undefined = {
			skip: 0,
			params: {},
		},
		thunkAPI
	) => {
		const movies = await MovieService.getFavorites(payload, thunkAPI.signal);

		if (movies) {
			thunkAPI.dispatch(setFavoriteMoviesAction({list: movies.data, count: movies.count}));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const addMovieToHistoryThunk = createAsyncThunk(
	'movies/add-to-history',
	async (payload: number, thunkAPI) => {
		return await MovieService.addToHistory(payload, thunkAPI.signal);
	},
	{
		dispatchConditionRejection: true,
	}
);

export const getHistoryMoviesThunk = createAsyncThunk(
	'movies/get-history',
	async (
		payload: {skip: number; params?: Record<string, number | string>} | undefined = {
			skip: 0,
			params: {},
		},
		thunkAPI
	) => {
		const movies = await MovieService.getHistory(payload, thunkAPI.signal);

		if (movies) {
			thunkAPI.dispatch(setHistoryMoviesAction({list: movies.data, count: movies.count}));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);
