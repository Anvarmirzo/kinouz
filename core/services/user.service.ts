import api from '../api';
import {Toast} from '../utils';
import {LogoutThunk} from '../store/auth/auth.thunks';
import {store} from '../store';
import {UserModel} from '../models';

export const UserService = {
	getByToken() {
		return api
			.get<UserModel>('/user/token')
			.then((res) => {
				const jwt = localStorage.getItem('jwt');
				return {user: new UserModel(res.data), jwt};
			})
			.catch((e) => {
				if (e.response?.status === 404) {
					store.dispatch(LogoutThunk());
				}
				Toast.error(e);
			});
	},
};
