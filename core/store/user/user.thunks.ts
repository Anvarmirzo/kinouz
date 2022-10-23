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
		const data = await UserService.createSubUser(payload, thunkAPI.signal);

		if (data) {
			thunkAPI.dispatch(addSubUserAction(data));
			return true;
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const patchUserThunk = createAsyncThunk(
	'user/patchUser',
	async (payload: IPatchUser, thunkAPI) => {
		const data = await UserService.patchUser(payload, thunkAPI.signal);

		if (data) {
			thunkAPI.dispatch(patchUserAction(data));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const patchSubUserThunk = createAsyncThunk(
	'user/patchSubUser',
	async (payload: IPatchUser, thunkAPI) => {
		const data = await UserService.patchUser(payload, thunkAPI.signal);

		if (data) {
			thunkAPI.dispatch(patchSubUserAction(data));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const deleteSubUserThunk = createAsyncThunk(
	'user/deleteSubUser',
	async (payload: number, thunkAPI) => {
		const data = await UserService.deleteUser(payload, thunkAPI.signal);

		if (data) {
			thunkAPI.dispatch(deleteSubUserAction({id: data.id}));
		}
	},
	{
		dispatchConditionRejection: true,
	}
);
