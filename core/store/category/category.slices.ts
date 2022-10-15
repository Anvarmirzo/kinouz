import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CategoryModel} from '../../models';

interface IState {
	all: {list: CategoryModel[]; count: number};
	main: {list: CategoryModel[]; count: number};
	current: CategoryModel | null;
}

const initialState: IState = {
	all: {list: [], count: 0},
	main: {list: [], count: 0},
	current: null,
};

export const {
	actions: {setAllCategoriesAction, setMainCategoriesAction, setCategoryAction},
	reducer: categoriesReducer,
} = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setAllCategoriesAction: (
			state,
			action: PayloadAction<{list: CategoryModel[]; count: number}>
		) => ({
			...state,
			all: action.payload,
		}),
		setMainCategoriesAction: (
			state,
			action: PayloadAction<{list: CategoryModel[]; count: number}>
		) => ({
			...state,
			main: action.payload,
		}),

		setCategoryAction: (state, action: PayloadAction<CategoryModel | null>) => ({
			...state,
			current: action.payload,
		}),
	},
});
