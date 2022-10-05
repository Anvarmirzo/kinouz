import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
	modals: {
		login: {
			isShown: false,
		},
		signup: {
			isShown: false,
		},
	},
};

export const {
	actions: {setIsShownModalAction},
	reducer: globalUIReducer,
} = createSlice({
	name: 'globalUI',
	initialState,
	reducers: {
		setIsShownModalAction: (
			state,
			action: PayloadAction<{modalName: 'login' | 'signup'; flag: boolean}>
		) => ({
			...state,
			modals: {
				...state.modals,
				[action.payload.modalName]: {isShown: action.payload.flag},
			},
		}),
	},
});
