import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../interfaces/global';

interface IState {
	user: IUser | null;
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
		setUserAction: (state, action: PayloadAction<IUser | null>) => ({
			...state,
			...action.payload,
		}),
	},
});
