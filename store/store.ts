import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';


const store = configureStore({
    reducer: {},
    devTools: true,
});


export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper(() => store);
