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
		setMoviesAction: (
			state: IState,
			action: PayloadAction<{list: MovieModel[]; count: number} | null>
		) => {
			if (action.payload) {
				const isExist = action.payload.list.some((newItem) =>
					state.list.some((existsItem) => newItem.id === existsItem.id)
				);

				if (!isExist) {
					return {
						...state,
						list: [...state.list, ...action.payload.list],
						count: action.payload.count,
					};
				}
			} else {
				return {...state, count: 0, list: []};
			}
		},

		setMovieAction: (state: IState, action: PayloadAction<MovieModel | null>) => ({
			...state,
			current: action.payload,
		}),

		// TODO: need to make it as object and add field count?
		setNewMoviesAction: (state: IState, action: PayloadAction<IState['list']>) => ({
			...state,
			newMoviesList: action.payload,
		}),

		setFavoriteMoviesAction: (
			state: IState,
			action: PayloadAction<IState['favoritesList'] | null>
		) => {
			if (action.payload) {
				const isExist = action.payload.list.some((newItem) =>
					state.favoritesList.list.some((existsItem) => newItem.id === existsItem.id)
				);

				if (!isExist) {
					return {
						...state,
						favoritesList: {
							list: [...state.list, ...action.payload.list],
							count: action.payload.count,
						},
					};
				}
			} else {
				return {...state, favoritesList: {count: 0, list: []}};
			}
		},

		setHistoryMoviesAction: (
			state: IState,
			action: PayloadAction<IState['historyMovies'] | null>
		) => {
			if (action.payload) {
				const isExist = action.payload.list.some((newItem) =>
					state.historyMovies.list.some((existsItem) => newItem.id === existsItem.id)
				);

				if (!isExist) {
					return {
						...state,
						historyMovies: {
							list: [...state.list, ...action.payload.list],
							count: action.payload.count,
						},
					};
				}
			} else {
				return {...state, historyMovies: {count: 0, list: []}};
			}
		},
	},
});
