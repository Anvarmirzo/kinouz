import {createAsyncThunk} from '@reduxjs/toolkit';
import {ICreateUser, IPatchUser} from '../../models';
import {UserService} from '../../services';
import {addSubUserAction, deleteSubUserAction, patchSubUserAction} from './user.slices';

export const createSubUserThunk = createAsyncThunk<boolean | void, ICreateUser>(
	'user/createSub',
	async (payload, thunkAPI) => {
		const data = await UserService.createSubUser(payload);

		if (data) {
			thunkAPI.dispatch(addSubUserAction(data));
			return true;
		}
	}
);

export const patchSubUserThunk = createAsyncThunk<void, IPatchUser>(
	'user/patchSubUser',
	async (payload, thunkAPI) => {
		const data = await UserService.patchSubUser(payload);

		if (data) {
			thunkAPI.dispatch(patchSubUserAction(data));
		}
	}
);

export const deleteSubUserThunk = createAsyncThunk<void, number>(
	'user/deleteSubUser',
	async (payload, thunkAPI) => {
		const data = await UserService.deleteUser(payload);

		if (data) {
			thunkAPI.dispatch(deleteSubUserAction({id: data.id}));
		}
	}
);
