import {IAutoComplete} from '../interfaces/global';
import api from '../api';

export const autoComplete = (params: IAutoComplete) => {
	return api
		.get('/global/autoComplete', {
			params,
		})
		.then((res) => res.data);
};

export const getOneService = (id: number, name: string) => {
	return api.get(`/${name}/${id}`).then((res) => res.data);
};

export const getAllService = (skip: number, params: any, name: string) => {
	return api
		.get(`/${name}`, {
			params: {
				skip,
				params,
			},
		})
		.then((res) => res.data);
};
