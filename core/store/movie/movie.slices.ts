import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MovieModel} from '../../models';

interface IState {
	list: MovieModel[];
	newMoviesList: MovieModel[];
	favoritesList: {list: MovieModel[]; count: number};
	historyMovies: {list: MovieModel[]; count: number};
	current: MovieModel | null;
	count: number;
}

const initialState: IState = {
	list: [],
	newMoviesList: [],
	favoritesList: {list: [], count: 0},
	historyMovies: {list: [], count: 0},
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
		setNewMoviesAction: (state, action: PayloadAction<IState['list']>) => ({
			...state,
			newMoviesList: action.payload,
		}),
		setFavoriteMoviesAction: (state, action: PayloadAction<IState['favoritesList']>) => ({
			...state,
			favoritesList: action.payload,
		}),
		setHistoryMoviesAction: (state, action: PayloadAction<IState['historyMovies']>) => ({
			...state,
			historyMovies: action.payload,
		}),
	},
});
