import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ActorModel, DirectorModel} from '../../models';

interface IState {
	actors: {
		list: ActorModel[];
		count: number;
	};
	directors: {
		list: DirectorModel[];
		count: number;
	};
	current: ActorModel | null;
}

const initialState: IState = {
	actors: {
		list: [],
		count: 0,
	},
	directors: {
		list: [],
		count: 0,
	},
	current: null,
};

export const {
	actions: {setActorsAction, setActorAction, setDirectorsAction},
	reducer: participantReducer,
} = createSlice({
	name: 'participant',
	initialState,
	reducers: {
		setActorsAction: (
			state: IState,
			action: PayloadAction<{list: ActorModel[]; count: number} | null>
		) => ({
			...state,
			actors: {
				...state.actors,
				count: action.payload?.count ?? 0,
				list: action.payload?.list ?? [],
			},
		}),

		setDirectorsAction: (
			state: IState,
			action: PayloadAction<{list: DirectorModel[]; count: number} | null>
		) => ({
			...state,
			directors: {
				...state.directors,
				count: action.payload?.count ?? 0,
				list: action.payload?.list ?? [],
			},
		}),

		setActorAction: (state, action: PayloadAction<ActorModel | null>) => ({
			...state,
			current: action.payload,
		}),
	},
});
