import axios, {AxiosRequestConfig} from 'axios';

const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
});

api.interceptors.request.use(function (config: AxiosRequestConfig) {
	const token = localStorage.getItem('jwt') || localStorage.getItem('guestJwt');

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
			localStorage.removeItem('jwt');
		}

		return Promise.reject(error);
	}
);

export default api;
