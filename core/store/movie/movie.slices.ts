import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MovieModel} from '../../models';

interface IState {
	list: MovieModel[];
	newMoviesList: MovieModel[];
	current: MovieModel | null;
	count: number;
}

const initialState: IState = {
	list: [],
	newMoviesList: [],
	current: null,
	count: 0,
};

export const {
	actions: {setMoviesAction, setNewMoviesAction, setMovieAction},
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
		setNewMoviesAction: (state, action: PayloadAction<MovieModel[]>) => ({
			...state,
			newMoviesList: action.payload,
		}),
	},
});
