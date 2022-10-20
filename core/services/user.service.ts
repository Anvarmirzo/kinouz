import api from '../api';
import {Toast} from '../utils';
import {logoutThunk} from '../store/auth/auth.thunks';
import {store} from '../store';
import {ICreateUser, IPatchUser, UserModel} from '../models';

export const UserService = {
	getByToken() {
		return api
			.get<UserModel>('user/token')
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
	createSubUser(params: ICreateUser) {
		return api
			.post<UserModel>('user', params)
			.then((res) => {
				Toast.success('User created');
				return new UserModel(res.data);
			})
			.catch(Toast.error);
	},

	patchUser({userId, ...params}: IPatchUser) {
		return api
			.patch<UserModel>(`user/${userId}`, params)
			.then((res) => new UserModel(res.data))
			.catch(Toast.error);
	},

	deleteUser(id: number) {
		return api
			.delete<{message: string; status: number; id: number}>(`user/${id}`)
			.then((data) => {
				Toast.success(data.data.message);
				return data.data;
			})
			.catch(Toast.error);
	},
};
