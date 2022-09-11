import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {rootReducer} from './rootReducer';
import {createWrapper} from 'next-redux-wrapper';

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export type State = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper(() => store);
