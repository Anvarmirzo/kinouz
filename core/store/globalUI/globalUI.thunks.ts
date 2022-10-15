import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalService} from '../../services/global.service';
import {IAutoCompleteParams} from '../../models';

export const autoCompleteThunk = createAsyncThunk(
	'globalUI/autocomplete',
	async (payload: IAutoCompleteParams) => {
		return GlobalService.autoComplete(payload);
	}
);
