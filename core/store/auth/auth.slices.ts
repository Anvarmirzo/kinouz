import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserModel} from '../../models/user';

interface IState {
	jwt: string | null;
	user: UserModel | null;
}

const initialState: IState = {
	jwt: null,
	user: null,
};

export const {
	actions: {logOutAction, logInAction},
	reducer: authReducer,
} = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logInAction: (state, action: PayloadAction<IState>) => ({
			...state,
			...action.payload,
		}),

		logOutAction: (state: IState) => ({
			...state,
			token: null,
			user: null,
		}),
	},
});
