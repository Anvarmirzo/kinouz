import {UserService, AuthService} from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {logInAction, logOutAction} from './auth.slices';
import {setUserAction} from '../user/user.slices';
import {ILogIn, ISignUp} from '../../models';

export const signUpThunk = createAsyncThunk('auth/signUp', async (payload: ISignUp, thunkAPI) => {
	const data = await AuthService.signUp(payload);

	if (data) {
		thunkAPI.dispatch(logInAction(data));
		thunkAPI.dispatch(setUserAction(data.user));

		return data.user.id;
	}
});

export const loginThunk = createAsyncThunk('auth/login', async (payload: ILogIn, thunkAPI) => {
	const data = await AuthService.login(payload);

	if (data) {
		thunkAPI.dispatch(logInAction(data));
		thunkAPI.dispatch(setUserAction(data.user));

		return data.user.id;
	}
});

export const autoLoginThunk = createAsyncThunk('auth/autoLogin', async (_, thunkAPI) => {
	const token = localStorage.getItem('jwt');

	if (token) {
		const data = await UserService.getByToken();

		if (data) {
			thunkAPI.dispatch(logInAction(data));
			thunkAPI.dispatch(setUserAction(data.user));
		}
	}
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
	const token = localStorage.getItem('jwt');

	if (token) {
		thunkAPI.dispatch(logOutAction());

		localStorage.removeItem('jwt');
		localStorage.removeItem('expired_at');
		localStorage.clear();
		window.location.href = '/';
	}
});
