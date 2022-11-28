import {UserService, AuthService} from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {logInAction, logOutAction} from './auth.slices';
import {setUserAction} from '../user/user.slices';
import {ILogIn, ISignUp} from '../../models';

export const signUpThunk = createAsyncThunk(
	'auth/signUp',
	async (payload: ISignUp, thunkAPI) => {
		const data = await AuthService.signUp(payload, thunkAPI.signal);

		if (data) {
			thunkAPI.dispatch(logInAction(data));
			thunkAPI.dispatch(setUserAction(data.user));

			return data.user.id;
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const loginThunk = createAsyncThunk(
	'auth/login',
	async (payload: ILogIn, thunkAPI) => {
		const data = await AuthService.login(payload, thunkAPI.signal);

		if (data) {
			thunkAPI.dispatch(logInAction(data));
			thunkAPI.dispatch(setUserAction(data.user));

			return data.user.id;
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const autoLoginThunk = createAsyncThunk(
	'auth/autoLogin',
	async (_, thunkAPI) => {
		const token = localStorage.getItem('jwt');

		await AuthService.getGuestToken(thunkAPI.signal);

		if (token) {
			const data = await UserService.getByToken(thunkAPI.signal);

			if (data) {
				thunkAPI.dispatch(logInAction(data));
				thunkAPI.dispatch(setUserAction(data.user));
			}
		}
	},
	{
		dispatchConditionRejection: true,
	}
);

export const logoutThunk = createAsyncThunk(
	'auth/logout',
	async (_, thunkAPI) => {
		const token = localStorage.getItem('jwt');

		if (token) {
			thunkAPI.dispatch(logOutAction());
			thunkAPI.dispatch(setUserAction(null));

			localStorage.removeItem('jwt');
			window.location.reload();
		}
	},
	{
		dispatchConditionRejection: true,
	}
);
