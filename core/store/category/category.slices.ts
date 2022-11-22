import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CategoryModel} from '../../models';

interface IState {
	all: {list: CategoryModel[]; count: number};
	main: {list: CategoryModel[]; count: number};
	mainVideo: {list: CategoryModel[]; count: number};
	current: CategoryModel | null;
}

const initialState: IState = {
	all: {list: [], count: 0},
	main: {list: [], count: 0},
	mainVideo: {list: [], count: 0},
	current: null,
};

export const {
	actions: {
		setAllCategoriesAction,
		setMainCategoriesAction,
		setCategoryAction,
		setMainCategoriesWithVideoAction,
	},
	reducer: categoriesReducer,
} = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setAllCategoriesAction: (
			state: IState,
			action: PayloadAction<{list: CategoryModel[]; count: number} | null>
		) => ({
			...state,
			all: action.payload ?? {list: [], count: 0},
		}),

		setMainCategoriesAction: (
			state: IState,
			action: PayloadAction<{list: CategoryModel[]; count: number} | null>
		) => ({
			...state,
			main: action.payload ?? {list: [], count: 0},
		}),

		setMainCategoriesWithVideoAction: (
			state: IState,
			action: PayloadAction<{list: CategoryModel[]; count: number} | null>
		) => {
			if (action.payload) {
				const isExist = action.payload.list.some((newItem) =>
					state.mainVideo.list.some((existsItem) => newItem.id === existsItem.id)
				);

				if (!isExist) {
					return {
						...state,
						mainVideo: {
							list: [...state.mainVideo.list, ...action.payload.list],
							count: action.payload.count,
						},
					};
				}
			} else {
				state.mainVideo = {list: [], count: 0};
			}
		},

		setCategoryAction: (state: IState, action: PayloadAction<CategoryModel | null>) => ({
			...state,
			current: action.payload,
		}),
	},
});
