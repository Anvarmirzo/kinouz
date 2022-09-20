import {
	ActionFromReducersMapObject,
	CombinedState,
	combineReducers,
	Reducer,
	StateFromReducersMapObject,
} from '@reduxjs/toolkit';
import {actorsReducer} from './actor/actor.slices';
import {categoriesReducer} from './category/category.slices';
import {genresReducer} from './genre/genre.slices';
import {authReducer} from './auth/auth.slices';
import {moviesReducer} from './movie/movie.slices';
import {producersReducer} from './producer/producer.slices';
import {usersReducer} from './user/user.slices';
import {commentsReducer} from './comment/comment.slices';

// export type RootState = ReturnType<typeof combinedReducer>;

const State = {
	auth: authReducer,
	genres: genresReducer,
	actors: actorsReducer,
	producers: producersReducer,
	categories: categoriesReducer,
	users: usersReducer,
	movies: moviesReducer,
	comments: commentsReducer,
};

export const appReducer = combineReducers(State);

export const rootReducer: Reducer<
	CombinedState<StateFromReducersMapObject<typeof State>>,
	ActionFromReducersMapObject<typeof State>
> = (state, action) => {
	if (action.type === 'global/logOut') {
		state = undefined;
	}

	return appReducer(state, action);
};
