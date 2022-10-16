import api from '../api';
import {Toast} from '../utils';
import {CategoryModel} from '../models';

export const CategoryService = {
	getAll(params: {skip: number; params: Record<string, number | string>}) {
		return api
			.get<{data: CategoryModel[]; count: number}>('category', {params})
			.then((res) => ({
				data: res.data.data.map((c) => new CategoryModel(c)),
				count: res.data.count,
			}))
			.catch(Toast.error);
	},

	getMain(params?: {skip?: number}) {
		return api
			.get<{data: CategoryModel[]; count: number}>('category/main', {params})
			.then((res) => ({
				data: res.data.data.map((c) => new CategoryModel(c)),
				count: res.data.count,
			}))
			.catch(Toast.error);
	},

	getBySlug(slug: string) {
		return api
			.get(`category/slug/${slug}`)
			.then((res) => res.data)
			.catch(Toast.error);
	},

	getById(id: number) {
		return api
			.get<CategoryModel>(`category/${id}`)
			.then((res) => new CategoryModel(res.data))
			.catch(Toast.error);
	},
};
