import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CategoryModel} from '../../models';

interface IState {
	list: CategoryModel[];
	current: CategoryModel | null;
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
			action: PayloadAction<{list: CategoryModel[]; count: number}>
		) => ({
			...state,
			...action.payload,
		}),
		setCategoryAction: (state, action: PayloadAction<CategoryModel | null>) => ({
			...state,
			current: action.payload,
		}),
	},
});
