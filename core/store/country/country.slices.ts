import {CountryModel} from '../../models';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IState {
	list: CountryModel[];
	count: number;
}
const initialState: IState = {list: [], count: 0};

export const {
	actions: {setCountriesAction},
	reducer: countryReducer,
} = createSlice({
	name: 'country',
	initialState,
	reducers: {
		setCountriesAction: (state, action: PayloadAction<{list: CountryModel[]; count: number}>) => ({
			...state,
			list: action.payload.list,
			count: action.payload.count,
		}),
	},
});
