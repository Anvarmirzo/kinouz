import {createAsyncThunk} from '@reduxjs/toolkit';
import {CategoryService} from '../../services';
import {setCategoriesAction, setCategoryAction} from './category.slices';

export const getCategoriesThunk = createAsyncThunk<
	void,
	{skip: number; params: Record<string, string | number>}
>('categories/getAll', async (params = {skip: 0, params: {}}, thunkAPI) => {
	const res = await CategoryService.getAll(params);

	if (res) {
		thunkAPI.dispatch(setCategoriesAction(res));
	}
});

export const getCategoryThunk = createAsyncThunk<void, number>(
	'categories/getOne',
	async (id, thunkAPI) => {
		const res = await CategoryService.getById(id);

		if (res) {
			thunkAPI.dispatch(setCategoryAction(res));
		}
	}
);
