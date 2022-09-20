import api from '../api';
import {Toast} from '../utils';
import {CommentModel} from '../models';

export const CommentService = {
	getAll(params: {skip: number; movieId: number}) {
		return api
			.get<{count: number; data: CommentModel[]}>('comment', {
				params: {
					skip: params.skip,
					params: {
						movieId: params.movieId,
					},
				},
			})
			.then((res) => ({
				count: res.data.count,
				data: res.data.data.map((c) => new CommentModel(c)),
			}))
			.catch(Toast.error);
	},
	postComment(params: {movieId: number; userId: number; text: string}) {
		return api
			.post<CommentModel>('comment', params)
			.then((res) => new CommentModel(res.data))
			.catch(Toast.error);
	},
};
