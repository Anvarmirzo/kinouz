import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GenreModel} from '../../models';

interface IState {
	genres: GenreModel[];
	genre: GenreModel | null;
	count: number;
}

const initialState: IState = {
	genres: [],
	genre: null,
	count: 0,
};

export const {actions: genresAction, reducer: genresReducer} = createSlice({
	name: 'genres',
	initialState,
	reducers: {
		setMoreGenres: (state, action: PayloadAction<{genres: GenreModel[]}>) => ({
			...state,
			...action.payload,
		}),
		setGenres: (state, action: PayloadAction<{genres: GenreModel[]; count: number}>) => ({
			...state,
			...action.payload,
		}),
		setGenre: (state, action: PayloadAction<{genre: GenreModel | null}>) => ({
			...state,
			...action.payload,
		}),
	},
});
