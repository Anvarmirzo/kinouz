import api from '../api';
import {Toast} from '../utils';
import {ProducerModel} from '../models';

export const ProducerService = {
	getAll(params: {skip: number; params: Record<string, number | string>}) {
		return api
			.get<{data: ProducerModel[]; count: number}>('producer', {params})
			.then((res) => ({
				data: res.data.data.map((p) => new ProducerModel(p)),
				count: res.data.count,
			}))
			.catch(Toast.error);
	},

	getById(id: number) {
		return api
			.get<ProducerModel>(`producer/${id}`)
			.then((res) => new ProducerModel(res.data))
			.catch(Toast.error);
	},
};
