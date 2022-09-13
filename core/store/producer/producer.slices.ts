import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProducerModel} from '../../models';

interface IState {
	list: ProducerModel[];
	current: ProducerModel | null;
	count: number;
}

const initialState: IState = {
	list: [],
	current: null,
	count: 0,
};

export const {
	actions: {setProducersAction, setProducerAction},
	reducer: producersReducer,
} = createSlice({
	name: 'producers',
	initialState,
	reducers: {
		setProducersAction: (
			state,
			action: PayloadAction<{producers: ProducerModel[]; count: number}>
		) => ({
			...state,
			...action.payload,
		}),
		setProducerAction: (state, action: PayloadAction<ProducerModel | null>) => ({
			...state,
			current: action.payload,
		}),
	},
});