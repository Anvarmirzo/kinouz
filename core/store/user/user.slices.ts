import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserModel} from '../../models';

interface IState {
	user: UserModel | null;
}

const initialState: IState = {
	user: null,
};

export const {
	actions: {setUserAction, setSubUserAction},
	reducer: usersReducer,
} = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserAction: (state, action: PayloadAction<UserModel | null>) => ({
			...state,
			user: action.payload,
		}),

		setSubUserAction: (state, action: PayloadAction<UserModel>) => {
			if (state.user) {
				return {
					...state,
					user: {
						...state.user,
						subUsers: state.user?.subUsers
							? [...state.user.subUsers.concat([action.payload])]
							: [action.payload],
					},
				};
			}

			return state;
		},
	},
});
