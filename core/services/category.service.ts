import api from '../api';
import {Toast} from '../utils';
import {CategoryModel} from '../models';

export const CategoryService = {
	getAll(
		params: {skip: number; params?: Record<string, number | string | boolean>},
		signal?: AbortSignal
	) {
		return api
			.get<{data: CategoryModel[]; count: number}>('category', {params, signal})
			.then((res) => ({
				data: res.data.data.map((c) => new CategoryModel(c)),
				count: res.data.count,
			}))
			.catch(Toast.error);
	},

	getMain(
		params?: {skip?: number; params?: Record<string, number | string | boolean>},
		signal?: AbortSignal
	) {
		return api
			.get<{data: CategoryModel[]; count: number}>('category/main', {params, signal})
			.then((res) => ({
				data: res.data.data.map((c) => new CategoryModel(c)),
				count: res.data.count,
			}))
			.catch(Toast.error);
	},

	getBySlug(slug: string, signal?: AbortSignal) {
		return api
			.get(`category/slug/${slug}`, {signal})
			.then((res) => res.data)
			.catch(Toast.error);
	},

	getById(id: number, signal?: AbortSignal) {
		return api
			.get<CategoryModel>(`category/${id}`, {signal})
			.then((res) => new CategoryModel(res.data))
			.catch(Toast.error);
	},
};
