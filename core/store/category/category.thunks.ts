import {createAsyncThunk} from '@reduxjs/toolkit';
import {CategoryService} from '../../services';
import {
	setAllCategoriesAction,
	setCategoryAction,
	setMainCategoriesAction,
	setMainCategoriesWithVideoAction,
} from './category.slices';

export const getCategoriesThunk = createAsyncThunk(
	'categories/getAll',
	async (
		params: {skip: number; params?: Record<string, string | number | boolean>} | undefined = {
			skip: 0,
			params: {},
		},
		thunkAPI
	) => {
		const res = await CategoryService.getAll(params, thunkAPI.signal);

		if (res) {
			thunkAPI.dispatch(setAllCategoriesAction({list: res.data, count: res.count}));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);
export const getMainCategoriesThunk = createAsyncThunk(
	'categories/getMain',
	async (
		params: {skip: number; params?: Record<string, number | string | boolean>} | undefined = {
			skip: 0,
		},
		thunkAPI
	) => {
		const res = await CategoryService.getMain(params, thunkAPI.signal);

		if (res) {
			if (params.params?.movies) {
				thunkAPI.dispatch(setMainCategoriesWithVideoAction({list: res.data, count: res.count}));
			} else {
				thunkAPI.dispatch(setMainCategoriesAction({list: res.data, count: res.count}));
			}
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const getCategoryThunk = createAsyncThunk(
	'categories/getOne',
	async (id: number, thunkAPI) => {
		const res = await CategoryService.getById(id, thunkAPI.signal);

		if (res) {
			thunkAPI.dispatch(setCategoryAction(res));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);
