import api from '../api';
import {Toast} from '../utils';
import {ProducerModel} from '../models';

export const ProducerService = {
	getAll(params: {skip: number; params: Record<string, number | string>}, signal?: AbortSignal) {
		return api
			.get<{data: ProducerModel[]; count: number}>('producer', {params, signal})
			.then((res) => ({
				data: res.data.data.map((p) => new ProducerModel(p)),
				count: res.data.count,
			}))
			.catch(Toast.error);
	},

	getById(id: number, signal?: AbortSignal) {
		return api
			.get<ProducerModel>(`producer/${id}`, {signal})
			.then((res) => new ProducerModel(res.data))
			.catch(Toast.error);
	},
};
