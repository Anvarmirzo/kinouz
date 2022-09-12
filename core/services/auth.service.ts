import api from '../api';
import {ILogIn, ISignUp, IUser} from '../interfaces/global';
import {Toast} from '../utils';

export const AuthService = {
	login(params: ILogIn) {
		return api
			.post<{user: IUser; jwt: string}>('/auth/login', params)
			.then((res) => {
				localStorage.setItem('jwt', res.data.jwt || '');
				return res.data;
			})
			.catch(Toast.error);
	},
	signUp(params: ISignUp) {
		return api
			.post<{user: IUser; jwt: string}>('/auth/regis', params)
			.then((res) => {
				localStorage.setItem('jwt', res.data.jwt || '');
				return res.data;
			})
			.catch(Toast.error);
	},
};
