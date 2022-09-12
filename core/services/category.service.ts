import api from '../api';
import {Toast} from '../utils';

export const CategoryService = {
	getAll(params: {skip: number; params: Record<string, number | string>}) {
		return api
			.get('category', {
				params,
			})
			.then((res) => res.data)
			.catch(Toast.error);
	},

	getById(id: number) {
		return api
			.get(`/category/${id}`)
			.then((res) => res.data)
			.catch(Toast.error);
	},
};
