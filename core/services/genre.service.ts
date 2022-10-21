import api from '../api';
import {Toast} from '../utils';
import {GenreModel} from '../models';

export const GenreService = {
	getAll(params: {skip: number; params?: Record<string, number | string>}, signal?: AbortSignal) {
		return api
			.get<{data: GenreModel[]; count: number}>('genre', {params, signal})
			.then((res) => ({data: res.data.data.map((g) => new GenreModel(g)), count: res.data.count}))
			.catch(Toast.error);
	},

	getById(id: number, signal?: AbortSignal) {
		return api
			.get<GenreModel>(`genre/${id}`, {signal})
			.then((res) => new GenreModel(res.data))
			.catch(Toast.error);
	},
};
