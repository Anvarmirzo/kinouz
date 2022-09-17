import {createAsyncThunk} from '@reduxjs/toolkit';
import {ICreateUser} from '../../models';
import {UserService} from '../../services';
import {setSubUserAction} from './user.slices';

export const createSubUserThunk = createAsyncThunk<void, ICreateUser>(
	'user/createSub',
	async (payload, thunkAPI) => {
		const data = await UserService.createSubUser(payload);

		if (data) {
			thunkAPI.dispatch(setSubUserAction(data));
		}
	}
);
