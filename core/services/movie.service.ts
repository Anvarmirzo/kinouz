import api from '../api';
import {Toast} from '../utils';
import {MovieModel} from '../models';

export const MovieService = {
	getAll(params: {skip: number; params: Record<string, number | string | boolean>}) {
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
	addToFavorite(movieId: number) {
		return api
			.post<{message: string; status: number}>(`movie/add-movie-to-favorite/${movieId}`)
			.then((res) => {
				Toast.success(res.data.message);
				return res.data;
			})
			.catch(Toast.error);
	},
	getFavorites() {
		return api
			.get('movie/favorites')
			.then((res) => {
				console.log(res);
				return res;
			})
			.catch(Toast.error);
	},
	getHistory() {
		return api
			.get('movie/history')
			.then((res) => {
				console.log(res);
				return res;
			})
			.catch(Toast.error);
	},
};
