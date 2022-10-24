import api from '../api';
import {Toast} from '../utils';
import {IMovieSearchParams, MovieModel} from '../models';

export const MovieService = {
	getAll(
		params: {skip: number; params: Record<string, number | string | boolean>},
		signal?: AbortSignal
	) {
		return api
			.get<{count: number; data: MovieModel[]}>(`movie`, {params, signal})
			.then((res) => ({
				count: res.data.count,
				data: res.data.data.map((movie) => new MovieModel(movie)),
			}))
			.catch(Toast.error);
	},
	getById(id: number, signal?: AbortSignal) {
		return api
			.get<MovieModel>(`movie/${id}`, {signal})
			.then((res) => new MovieModel(res.data))
			.catch(Toast.error);
	},
	getBySlug(slug: string, signal?: AbortSignal) {
		return api
			.get<MovieModel>(`movie/slug/${slug}`, {signal})
			.then((res) => new MovieModel(res.data))
			.catch(Toast.error);
	},
	search(params: IMovieSearchParams, signal?: AbortSignal) {
		return api
			.get<{count: number; data: MovieModel[]}>('movie', {
				params: {...params, skip: params.skip ?? 0},
				signal,
			})
			.then((res) => ({
				count: res.data.count,
				data: res.data.data.map((movie) => new MovieModel(movie)),
			}))
			.catch(Toast.error);
	},
	addToFavorite(movieId: number, signal?: AbortSignal) {
		return api
			.post<{message: string; status: number}>(`movie/add-movie-to-favorite/${movieId}`, {signal})
			.then((res) => {
				Toast.success(res.data.message);
				return res.data;
			})
			.catch(Toast.error);
	},
	getFavorites(
		params: {skip: number; params?: Record<string, number | string>},
		signal?: AbortSignal
	) {
		return api
			.get<{data: MovieModel[]; count: number}>('movie/favorites', {params, signal})
			.then((res) => res.data)
			.catch(Toast.error);
	},
	addToHistory(movieId: number, signal?: AbortSignal) {
		return api
			.post<{message: string; status: number}>(`movie/add-movie-to-history/${movieId}`, {signal})
			.then((res) => {
				// Toast.success(res.data.message);
				return res.data;
			})
			.catch(Toast.error);
	},
	getHistory(
		params: {skip: number; params?: Record<string, number | string>},
		signal?: AbortSignal
	) {
		return api
			.get<{data: MovieModel[]; count: number}>('movie/history', {signal})
			.then((res) => res.data)
			.catch(Toast.error);
	},
};
