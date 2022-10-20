import api from '../api';
import {Toast} from '../utils';
import {CountryModel} from '../models';

export const CountryService = {
	getAll(params: {skip: number; params?: Record<string, number | string>}) {
		return api
			.get<{data: CountryModel[]; count: number}>('country', {params})
			.then((res) => ({data: res.data.data.map((c) => new CountryModel(c)), count: res.data.count}))
			.catch(Toast.error);
	},
};
