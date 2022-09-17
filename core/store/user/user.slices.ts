import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserModel} from '../../models';

interface IState {
	subUsers: UserModel['subUsers'][];
	user: UserModel | null;
}

const initialState: IState = {
	subUsers: [],
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

		setSubUserAction: (state, action: PayloadAction<UserModel>) => ({
			...state,
			subUsers: [...state.subUsers.concat([action.payload])],
		}),
	},
});
