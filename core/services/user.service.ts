import api from '../api';
import {Toast} from '../utils';
import {IUser} from '../interfaces/global';
import {LogoutThunk} from '../store/auth/auth.thunks';
import {store} from '../store';

export const UserService = {
	getByToken() {
		return api
			.get<IUser>('/user/token')
			.then((res) => {
				const jwt = localStorage.getItem('jwt');
				return {user: res.data, jwt};
			})
			.catch((e) => {
				if (e.response?.status === 404) {
					store.dispatch(LogoutThunk());
				}
				Toast.error(e);
			});
	},
};
