import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MovieModel} from '../../models';

interface IState {
	list: MovieModel[];
	current: MovieModel | null;
	count: number;
}

const initialState: IState = {
	list: [],
	current: null,
	count: 0,
};

export const {
	actions: {setMoviesAction, setMovieAction, setMoreMovies},
	reducer: moviesReducer,
} = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setMoreMovies: (state, action: PayloadAction<MovieModel[]>) => ({
			...state,
			list: action.payload,
		}),
		setMoviesAction: (state, action: PayloadAction<{movies: MovieModel[]; count: number}>) => ({
			...state,
			count: action.payload.count,
			list: action.payload.movies,
		}),
		setMovieAction: (state, action: PayloadAction<MovieModel | null>) => ({
			...state,
			current: action.payload,
		}),
	},
});
