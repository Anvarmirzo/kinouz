import api from '../api';
import {Toast} from '../utils';
import {DirectorModel} from '../models';

export const DirectorService = {
	getAll(params: {skip: number; params?: Record<string, number | string>}, signal?: AbortSignal) {
		return api
			.get<{data: DirectorModel[]; count: number}>('director', {params, signal})
			.then((res) => ({
				data: res.data.data.map((d) => new DirectorModel(d)),
				count: res.data.count,
			}))
			.catch(Toast.error);
	},

	getById(id: number, signal?: AbortSignal) {
		return api
			.get<DirectorModel>(`director/${id}`, {signal})
			.then((res) => new DirectorModel(res.data))
			.catch(Toast.error);
	},
};
