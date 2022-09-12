import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICategory} from '../../models';

interface IState {
	list: ICategory[];
	current: ICategory | null;
	count: number;
}

const initialState: IState = {
	list: [],
	current: null,
	count: 0,
};

export const {
	actions: {setCategoriesAction, setCategoryAction},
	reducer: categoriesReducer,
} = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategoriesAction: (
			state,
			action: PayloadAction<{categories: ICategory[]; count: number}>
		) => ({
			...state,
			...action.payload,
		}),
		setCategoryAction: (state, action: PayloadAction<ICategory | null>) => ({
			...state,
			current: action.payload,
		}),
	},
});
