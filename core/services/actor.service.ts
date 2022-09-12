import api from '../api';
import {Toast} from '../utils';

export const ActorService = {
	getAll(params: {skip: number; params: Record<string, number | string>}) {
		return api
			.get('actor', {
				params,
			})
			.then((res) => res.data)
			.catch(Toast.error);
	},

	getById(id: number) {
		return api
			.get(`/actor/${id}`)
			.then((res) => res.data)
			.catch(Toast.error);
	},
};
