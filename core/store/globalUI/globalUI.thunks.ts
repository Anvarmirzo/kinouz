import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalService} from '../../services';
import {IAutoCompleteParams} from '../../models';

export const autoCompleteThunk = createAsyncThunk(
	'globalUI/autocomplete',
	async (payload: IAutoCompleteParams | undefined, thunkAPI) => {
		return GlobalService.autoComplete(payload, thunkAPI.signal);
	},
	{
		dispatchConditionRejection: true,
	}
);
