import {createAsyncThunk} from '@reduxjs/toolkit';
import {CategoryService} from '../../services';
import {
	setAllCategoriesAction,
	setCategoryAction,
	setMainCategoriesAction,
} from './category.slices';

export const getAllCategoriesThunk = createAsyncThunk(
	'categories/getAll',
	async (
		params: {skip: number; params: Record<string, string | number | boolean>} = {
			skip: 0,
			params: {},
		},
		thunkAPI
	) => {
		const res = await CategoryService.getAll(params);

		if (res) {
			thunkAPI.dispatch(setAllCategoriesAction({list: res.data, count: res.count}));
		}
	}
);
export const getMainCategoriesThunk = createAsyncThunk(
	'categories/getMain',
	async (params: {skip: number} | undefined = {skip: 0}, thunkAPI) => {
		const res = await CategoryService.getMain(params);

		if (res) {
			thunkAPI.dispatch(setMainCategoriesAction({list: res.data, count: res.count}));
		}
	}
);

export const getCategoryThunk = createAsyncThunk(
	'categories/getOne',
	async (id: number, thunkAPI) => {
		const res = await CategoryService.getById(id);

		if (res) {
			thunkAPI.dispatch(setCategoryAction(res));
		}
	}
);
