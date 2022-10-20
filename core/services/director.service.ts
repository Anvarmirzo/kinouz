import api from '../api';
import {Toast} from '../utils';
import {DirectorModel} from '../models';

export const DirectorService = {
	getAll(params: {skip: number; params?: Record<string, number | string>}) {
		return api
			.get<{data: DirectorModel[]; count: number}>('director', {params})
			.then((res) => ({
				data: res.data.data.map((d) => new DirectorModel(d)),
				count: res.data.count,
			}))
			.catch(Toast.error);
	},

	getById(id: number) {
		return api
			.get<DirectorModel>(`director/${id}`)
			.then((res) => new DirectorModel(res.data))
			.catch(Toast.error);
	},
};
