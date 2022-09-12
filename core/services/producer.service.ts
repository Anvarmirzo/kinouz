import api from '../api';
import {Toast} from '../utils';

export const ProducerService = {
	getAll(params: {skip: number; params: Record<string, number | string>}) {
		return api
			.get('producer', {
				params,
			})
			.then((res) => res.data)
			.catch(Toast.error);
	},

	getById(id: number) {
		return api
			.get(`/producer/${id}`)
			.then((res) => res.data)
			.catch(Toast.error);
	},
};
