import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ActorModel} from '../../interfaces';

interface IState {
	list: ActorModel[];
	current: ActorModel | null;
	count: number;
}

const initialState: IState = {
	list: [],
	current: null,
	count: 0,
};

export const {actions: actorsAction, reducer: actorsReducer} = createSlice({
	name: 'actors',
	initialState,
	reducers: {
		setMoreActors: (state, action: PayloadAction<{actors: ActorModel[]}>) => ({
			...state,
			...action.payload,
		}),
		setActors: (state, action: PayloadAction<{actors: ActorModel[]; count: number}>) => ({
			...state,
			...action.payload,
		}),
		setActor: (state, action: PayloadAction<{actor: ActorModel | null}>) => ({
			...state,
			...action.payload,
		}),
	},
});
