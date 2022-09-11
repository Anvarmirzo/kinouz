import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IActor} from '../../interfaces';

interface IState {
	actors: IActor[];
	actor: IActor | null;
	count: number;
}

const initialState: IState = {
	actors: [],
	actor: null,
	count: 0,
};

export const {actions: actorsAction, reducer: actorsReducer} = createSlice({
	name: 'actors',
	initialState,
	reducers: {
		setMoreActors: (state, action: PayloadAction<{actors: IActor[]}>) => ({
			...state,
			...action.payload,
		}),
		setActors: (state, action: PayloadAction<{actors: IActor[]; count: number}>) => ({
			...state,
			...action.payload,
		}),
		setActor: (state, action: PayloadAction<{actor: IActor | null}>) => ({
			...state,
			...action.payload,
		}),
	},
});
