import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserModel} from '../../models';

interface IState {
	user: UserModel | null;
}

const initialState: IState = {
	user: null,
};

export const {
	actions: {setUserAction, addSubUserAction, patchSubUserAction, deleteSubUserAction},
	reducer: usersReducer,
} = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserAction: (state, action: PayloadAction<UserModel | null>) => ({
			...state,
			user: action.payload,
		}),

		addSubUserAction: (state, action: PayloadAction<UserModel>) => {
			if (state.user) {
				return {
					...state,
					user: {
						...state.user,
						subUsers: state.user.subUsers
							? [...state.user.subUsers.concat([action.payload])]
							: [action.payload],
					},
				};
			}

			return state;
		},

		patchSubUserAction: (state, action: PayloadAction<UserModel>) => {
			if (state.user?.subUsers) {
				return {
					...state,
					user: {
						...state.user,
						subUsers: insertItem(state.user.subUsers, action.payload),
					},
				};
			}
		},

		deleteSubUserAction: (state, action: PayloadAction<{id: number}>) => {
			if (state.user?.subUsers) {
				return {
					...state,
					user: {
						...state.user,
						subUsers: removeItem(state.user.subUsers, action.payload.id),
					},
				};
			}
			return state;
		},
	},
});

const insertItem = <T extends Record<'id', number>>(array: T[], item: T) => {
	const index = array.findIndex((s) => s.id === item.id);

	if (index && index !== -1) {
		const newArray = array.slice();
		newArray.splice(index, 0, item);

		return newArray;
	}

	return array;
};

const removeItem = <T extends Record<'id', number>>(array: T[], id: number) => {
	const index = array.findIndex((s) => s.id === id);

	if (index && index !== -1) {
		let newArray = array.slice();
		newArray.splice(index, 1);

		return newArray;
	}

	return array;
};
