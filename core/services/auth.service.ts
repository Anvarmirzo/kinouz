import api from '../api';
import {Toast} from '../utils';
import {UserModel, ILogIn, ISignUp} from '../models';

export const AuthService = {
	login(params: ILogIn) {
		return api
			.post<{user: UserModel; jwt: string}>('auth/login', params)
			.then((res) => {
				localStorage.setItem('jwt', res.data.jwt || '');
				return {user: new UserModel(res.data.user), jwt: res.data.jwt};
			})
			.catch(Toast.error);
	},
	signUp(params: ISignUp) {
		return api
			.post<{user: UserModel; jwt: string}>('auth/regis', params)
			.then((res) => {
				localStorage.setItem('jwt', res.data.jwt || '');
				return {user: new UserModel(res.data.user), jwt: res.data.jwt};
			})
			.catch(Toast.error);
	},
	getGuestToken() {
		return api
			.get<{jwt: string}>('auth/token')
			.then((res) => {
				console.log(res.data.jwt);
				localStorage.setItem('guestJwt', res.data.jwt || '');
				return res.data;
			})
			.catch(Toast.error);
	},
};
