import {createAsyncThunk} from '@reduxjs/toolkit';
import {CommentService} from '../../services';
import {setCommentAction, setCommentsAction} from './comment.slices';

export const getCommentsThunk = createAsyncThunk(
	'comment/getAll',
	async (payload: {movieId: number; skip?: number}, thunkAPI) => {
		const comments = await CommentService.getAll({...payload, skip: payload.skip ?? 0});

		if (comments) {
			thunkAPI.dispatch(
				setCommentsAction({
					list: comments.data,
					count: comments.count,
				})
			);
		}
	}
);

export const postCommentThunk = createAsyncThunk(
	'comment/post',
	async (payload: {movieId: number; userId: number; text: string}, thunkAPI) => {
		const res = await CommentService.postComment(payload);

		if (res) {
			thunkAPI.dispatch(setCommentAction(res));
			return true;
		}
	}
);
