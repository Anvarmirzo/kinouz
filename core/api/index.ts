import axios, {AxiosRequestConfig} from 'axios';
import {store} from '../store';
import {setRedirectAction} from '../store/auth/auth.slices';

const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
});

api.interceptors.request.use(function (config: AxiosRequestConfig) {
	const token = window.localStorage.getItem('jwt');

	if (token) {
		if (config.headers) {
			config.headers.Authorization = token ? `Bearer ${token}` : '';
		}
	}

	return config;
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		if (error.response?.status === 401) {
			store.dispatch(setRedirectAction(true));
			localStorage.removeItem('jwt');
		}

		return Promise.reject(error);
	}
);

export default api;
