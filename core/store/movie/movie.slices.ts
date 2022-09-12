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
	actions: {setMoviesAction, setMovieAction},
	reducer: moviesReducer,
} = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setMoviesAction: (state, action: PayloadAction<{movies: MovieModel[]; count: number}>) => ({
			...state,
			...action.payload,
		}),
		setMovieAction: (state, action: PayloadAction<MovieModel | null>) => ({
			...state,
			current: action.payload,
		}),
	},
});
