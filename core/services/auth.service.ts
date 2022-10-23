import api from '../api';
import {Toast} from '../utils';
import {UserModel, ILogIn, ISignUp} from '../models';

export const AuthService = {
	login(params: ILogIn, signal?: AbortSignal) {
		return api
			.post<{user: UserModel; jwt: string}>('auth/login', params, {signal})
			.then((res) => {
				localStorage.setItem('jwt', res.data.jwt || '');
				return {user: new UserModel(res.data.user), jwt: res.data.jwt};
			})
			.catch(Toast.error);
	},
	signUp(params: ISignUp, signal?: AbortSignal) {
		return api
			.post<{user: UserModel; jwt: string}>('auth/regis', params, {signal})
			.then((res) => {
				localStorage.setItem('jwt', res.data.jwt || '');
				return {user: new UserModel(res.data.user), jwt: res.data.jwt};
			})
			.catch(Toast.error);
	},
	getGuestToken(signal?: AbortSignal) {
		return api
			.get<{jwt: string}>('auth/token', {signal})
			.then((res) => {
				localStorage.setItem('guestJwt', res.data.jwt || '');
				return res.data;
			})
			.catch(Toast.error);
	},
};
