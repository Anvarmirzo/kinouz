import {CommentModel} from '../../models';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IState {
	count: number;
	list: CommentModel[];
}

const initialState: IState = {
	count: 0,
	list: [],
};

export const {
	actions: {setCommentsAction, setCommentAction},
	reducer: commentsReducer,
} = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		setCommentsAction: (state, action: PayloadAction<IState>) => ({
			...state,
			...action.payload,
		}),
		setCommentAction: (state, action: PayloadAction<CommentModel>) => ({
			...state,
			list: [...state.list, action.payload],
		}),
	},
});
