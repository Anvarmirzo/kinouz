import api from '../api';
import {Toast} from '../utils';

export const GenreService = {
	getAll(params: {skip: number; params: Record<string, number | string>}) {
		return api
			.get('genre', {
				params,
			})
			.then((res) => res.data)
			.catch(Toast.error);
	},

	getById(id: number) {
		return api
			.get(`/genre/${id}`)
			.then((res) => res.data)
			.catch(Toast.error);
	},
};
