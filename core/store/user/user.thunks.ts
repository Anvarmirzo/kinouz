import {createAsyncThunk} from '@reduxjs/toolkit';
import {ICreateUser, IPatchUser} from '../../models';
import {UserService} from '../../services';
import {
	addSubUserAction,
	deleteSubUserAction,
	patchSubUserAction,
	patchUserAction,
} from './user.slices';

export const createSubUserThunk = createAsyncThunk(
	'user/createSub',
	async (payload: ICreateUser, thunkAPI) => {
		const data = await UserService.createSubUser(payload);

		if (data) {
			thunkAPI.dispatch(addSubUserAction(data));
			return true;
		}
	}
);

export const patchUserThunk = createAsyncThunk(
	'user/patchUser',
	async (payload: IPatchUser, thunkAPI) => {
		const data = await UserService.patchUser(payload);

		if (data) {
			thunkAPI.dispatch(patchUserAction(data));
		}
	}
);

export const patchSubUserThunk = createAsyncThunk(
	'user/patchSubUser',
	async (payload: IPatchUser, thunkAPI) => {
		const data = await UserService.patchUser(payload);

		if (data) {
			thunkAPI.dispatch(patchSubUserAction(data));
		}
	}
);

export const deleteSubUserThunk = createAsyncThunk(
	'user/deleteSubUser',
	async (payload: number, thunkAPI) => {
		const data = await UserService.deleteUser(payload);

		if (data) {
			thunkAPI.dispatch(deleteSubUserAction({id: data.id}));
		}
	}
);
