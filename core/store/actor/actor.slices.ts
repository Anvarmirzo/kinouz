import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ActorModel} from '../../models';

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

export const {
	actions: {setActorsAction, setActorAction},
	reducer: actorsReducer,
} = createSlice({
	name: 'actors',
	initialState,
	reducers: {
		setActorsAction: (state, action: PayloadAction<{actors: ActorModel[]; count: number}>) => ({
			...state,
			...action.payload,
		}),
		setActorAction: (state, action: PayloadAction<ActorModel | null>) => ({
			...state,
			current: action.payload,
		}),
	},
});
