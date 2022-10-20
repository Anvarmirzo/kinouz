import api from '../api';
import {Toast} from '../utils';
import {ActorModel} from '../models';

export const ActorService = {
	getAll(params: {skip: number; params?: Record<string, number | string>}) {
		return api
			.get<{data: ActorModel[]; count: number}>('acter', {params})
			.then((res) => ({
				data: res.data.data.map((c) => new ActorModel(c)),
				count: res.data.count,
			}))
			.catch(Toast.error);
	},

	getById(id: number) {
		return api
			.get<ActorModel>(`acter/${id}`)
			.then((res) => new ActorModel(res.data))
			.catch(Toast.error);
	},
};
