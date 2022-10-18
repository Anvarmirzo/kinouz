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
		setCommentsAction: (state, action: PayloadAction<IState | null>) => {
			if (action.payload) {
				return {
					...state,
					...action.payload,
				};
			} else {
				return {count: 0, list: []};
			}
		},
		setCommentAction: (state, action: PayloadAction<CommentModel>) => ({
			...state,
			count: state.count + 1,
			list: [...state.list, action.payload],
		}),
	},
});
