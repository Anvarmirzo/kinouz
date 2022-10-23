import api from '../api';
import {Toast} from '../utils';
import {logoutThunk} from '../store/auth/auth.thunks';
import {store} from '../store';
import {ICreateUser, IPatchUser, UserModel} from '../models';

export const UserService = {
	getByToken(signal?: AbortSignal) {
		return api
			.get<UserModel>('user/token', {signal})
			.then((res) => {
				const jwt = localStorage.getItem('jwt');
				return {user: new UserModel(res.data), jwt};
			})
			.catch((e) => {
				if (e.response?.status === 404) {
					store.dispatch(logoutThunk());
				}
				Toast.error(e);
			});
	},
	createSubUser(params: ICreateUser, signal?: AbortSignal) {
		return api
			.post<UserModel>('user', params, {signal})
			.then((res) => {
				Toast.success('User created');
				return new UserModel(res.data);
			})
			.catch(Toast.error);
	},

	patchUser({userId, ...params}: IPatchUser, signal?: AbortSignal) {
		return api
			.patch<UserModel>(`user/${userId}`, params, {signal})
			.then((res) => new UserModel(res.data))
			.catch(Toast.error);
	},

	deleteUser(id: number, signal?: AbortSignal) {
		return api
			.delete<{message: string; status: number; id: number}>(`user/${id}`, {signal})
			.then((data) => {
				Toast.success(data.data.message);
				return data.data;
			})
			.catch(Toast.error);
	},
};
