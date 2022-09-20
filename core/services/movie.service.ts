import api from '../api';
import {Toast} from '../utils';
import {MovieModel} from '../models';

export const MovieService = {
	getAll(params: {skip: number; params: Record<string, number | string>}) {
		return api
			.get<{count: number; data: MovieModel[]}>(`movie`, {params})
			.then((res) => ({
				count: res.data.count,
				data: res.data.data.map((movie) => new MovieModel(movie)),
			}))
			.catch(Toast.error);
	},
	getById(id: number) {
		return api
			.get<MovieModel>(`movie/${id}`)
			.then((res) => new MovieModel(res.data))
			.catch(Toast.error);
	},
	getBySlug(slug: string) {
		return api
			.get<MovieModel>(`movie/slug/${slug}`)
			.then((res) => new MovieModel(res.data))
			.catch(Toast.error);
	},
};
