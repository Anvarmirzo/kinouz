import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserModel} from '../../models';

interface IState {
	jwt: string | null;
	user: UserModel | null;
	isRedirect: boolean;
}

const initialState: IState = {
	jwt: null,
	user: null,
	isRedirect: false,
};

export const {
	actions: {logOutAction, logInAction, setRedirectAction},
	reducer: authReducer,
} = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logInAction: (state, action: PayloadAction<Omit<IState, 'isRedirect'>>) => ({
			...state,
			...action.payload,
		}),

		logOutAction: (state: IState) => ({
			...state,
			token: null,
			user: null,
		}),

		setRedirectAction: (state: IState, action: PayloadAction<boolean>) => ({
			...state,
			isRedirect: action.payload,
		}),
	},
});
