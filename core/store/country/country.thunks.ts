import {createAsyncThunk} from '@reduxjs/toolkit';
import {CountryService} from '../../services/country.service';
import {setCountriesAction} from './country.slices';

export const getCountriesThunks = createAsyncThunk(
	'country/getAll',
	async (
		payload: {skip: number; params?: Record<string, number | string>} | undefined = {
			skip: 0,
			params: {},
		},
		thunkAPI
	) => {
		const countries = await CountryService.getAll(payload);

		if (countries) {
			thunkAPI.dispatch(setCountriesAction({count: countries.count, list: countries.data}));
		}
	}
);
