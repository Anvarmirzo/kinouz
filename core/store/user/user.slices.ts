import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserModel} from '../../models';

interface IState {
	user: UserModel | null;
}

const initialState: IState = {
	user: null,
};

export const {
	actions: {setUserAction},
	reducer: usersReducer,
} = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUserAction: (state, action: PayloadAction<UserModel | null>) => ({
			...state,
			...action.payload,
		}),
	},
});
