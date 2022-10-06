import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MovieModel} from '../../models';

interface IState {
	list: MovieModel[];
	newMoviesList: MovieModel[];
	favoritesList: MovieModel[];
	historyMovies: MovieModel[];
	current: MovieModel | null;
	count: number;
}

const initialState: IState = {
	list: [],
	newMoviesList: [],
	favoritesList: [],
	historyMovies: [],
	current: null,
	count: 0,
};

export const {
	actions: {
		setMoviesAction,
		setNewMoviesAction,
		setMovieAction,
		setFavoriteMoviesAction,
		setHistoryMoviesAction,
	},
	reducer: moviesReducer,
} = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setMoviesAction: (state, action: PayloadAction<{list: MovieModel[]; count: number}>) => ({
			...state,
			...action.payload,
		}),
		setMovieAction: (state, action: PayloadAction<MovieModel | null>) => ({
			...state,
			current: action.payload,
		}),
		// TODO: need to make it as object and add field count?
		setNewMoviesAction: (state, action: PayloadAction<MovieModel[]>) => ({
			...state,
			newMoviesList: action.payload,
		}),
		setFavoriteMoviesAction: (state, action: PayloadAction<MovieModel[]>) => ({
			...state,
			favoritesList: action.payload,
		}),
		setHistoryMoviesAction: (state, action: PayloadAction<MovieModel[]>) => ({
			...state,
			historyMovies: action.payload,
		}),
	},
});
