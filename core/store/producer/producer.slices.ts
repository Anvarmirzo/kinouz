import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProducerModel} from '../../models';

interface IState {
	producers: ProducerModel[];
	producer: ProducerModel | null;
	count: number;
}

const initialState: IState = {
	producers: [],
	producer: null,
	count: 0,
};

export const {actions: producersAction, reducer: producersReducer} = createSlice({
	name: 'producers',
	initialState,
	reducers: {
		setMoreProducers: (state, action: PayloadAction<{producers: ProducerModel[]}>) => ({
			...state,
			...action.payload,
		}),
		setProducers: (state, action: PayloadAction<{producers: ProducerModel[]; count: number}>) => ({
			...state,
			...action.payload,
		}),
		setProducer: (state, action: PayloadAction<{producer: ProducerModel | null}>) => ({
			...state,
			...action.payload,
		}),
	},
});
