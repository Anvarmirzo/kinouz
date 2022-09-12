import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GenreModel} from '../../models';

interface IState {
	list: GenreModel[];
	current: GenreModel | null;
	count: number;
}

const initialState: IState = {
	list: [],
	current: null,
	count: 0,
};

export const {
	actions: {setGenreAction, setGenresAction},
	reducer: genresReducer,
} = createSlice({
	name: 'genres',
	initialState,
	reducers: {
		setGenresAction: (state, action: PayloadAction<{genres: GenreModel[]; count: number}>) => ({
			...state,
			...action.payload,
		}),
		setGenreAction: (state, action: PayloadAction<GenreModel | null>) => ({
			...state,
			current: action.payload,
		}),
	},
});
