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
		setCommentsAction: (state: IState, action: PayloadAction<IState | null>) => {
			if (action.payload) {
				const isExist = action.payload.list.some((newItem) =>
					state.list.some((existsItem) => newItem.id === existsItem.id)
				);

				if (!isExist) {
					return {
						...state,
						list: [...state.list, ...action.payload.list],
						count: action.payload.count,
					};
				}
			} else {
				return {count: 0, list: []};
			}
		},

		setCommentAction: (state: IState, action: PayloadAction<CommentModel>) => ({
			...state,
			count: state.count + 1,
			list: [action.payload, ...state.list],
		}),
	},
});
