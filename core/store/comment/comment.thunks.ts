import {createAsyncThunk} from '@reduxjs/toolkit';
import {CommentService} from '../../services/comment.service';
import {setCommentAction, setCommentsAction} from './comment.slices';
import {CommentModel} from '../../models';

export const getCommentsThunk = createAsyncThunk<void, {movieId: number; skip?: number}>(
	'comment/getAll',
	async (payload, thunkAPI) => {
		const comments = await CommentService.getAll({...payload, skip: payload.skip ?? 0});

		if (comments) {
			setCommentsAction({
				list: comments.data,
				count: comments.count,
			});
		}
	}
);

export const postCommentThunk = createAsyncThunk<
	void,
	{movieId: number; userId: number; text: string}
>('comment/post', async (payload, thunkAPI) => {
	const res = await CommentService.postComment(payload);

	if (res) {
		thunkAPI.dispatch(setCommentAction(res));
	}
});
