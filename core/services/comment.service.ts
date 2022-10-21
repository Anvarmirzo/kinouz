import api from '../api';
import {Toast} from '../utils';
import {CommentModel} from '../models';

export const CommentService = {
	getAll(params: {skip: number; movieId: number}, signal?: AbortSignal) {
		return api
			.get<{count: number; data: CommentModel[]}>('comment', {
				params: {
					skip: params.skip,
					params: {
						movieId: params.movieId,
					},
				},
				signal,
			})
			.then((res) => ({
				count: res.data.count,
				data: res.data.data.map((c) => new CommentModel(c)),
			}))
			.catch(Toast.error);
	},
	postComment(params: {movieId: number; userId: number; text: string}, signal?: AbortSignal) {
		return api
			.post<CommentModel>('comment', params, {signal})
			.then((res) => new CommentModel(res.data))
			.catch(Toast.error);
	},
};
