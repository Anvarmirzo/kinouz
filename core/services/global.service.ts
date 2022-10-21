import api from '../api';
import {Toast} from '../utils';
import {IAutoComplete, IAutoCompleteParams} from '../models';

export const GlobalService = {
	autoComplete(params?: IAutoCompleteParams, signal?: AbortSignal) {
		return api
			.get<IAutoComplete>('global/autoComplete', {params, signal})
			.then((res) => res.data)
			.catch(Toast.error);
	},
};
