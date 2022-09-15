import api from '../api';
import {Toast} from '../utils';
import {GenreModel} from '../models';

export const GenreService = {
	getAll(params: {skip: number; params: Record<string, number | string>}) {
		return api
			.get<{data: GenreModel[]; count: number}>('genre', {params})
			.then((res) => ({data: res.data.data.map((g) => new GenreModel(g)), count: res.data.count}))
			.catch(Toast.error);
	},

	getById(id: number) {
		return api
			.get<GenreModel>(`/genre/${id}`)
			.then((res) => new GenreModel(res.data))
			.catch(Toast.error);
	},
};
