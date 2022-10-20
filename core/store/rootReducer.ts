import {
	ActionFromReducersMapObject,
	CombinedState,
	combineReducers,
	Reducer,
	StateFromReducersMapObject,
} from '@reduxjs/toolkit';
import {participantReducer} from './participant/participant.slices';
import {categoriesReducer} from './category/category.slices';
import {genresReducer} from './genre/genre.slices';
import {authReducer} from './auth/auth.slices';
import {moviesReducer} from './movie/movie.slices';
import {producersReducer} from './producer/producer.slices';
import {usersReducer} from './user/user.slices';
import {commentsReducer} from './comment/comment.slices';
import {globalUIReducer} from './globalUI/globalUI.slices';
import {paymentReducer} from './payment/payment.slices';
import {subscriptionReducer} from './subscription/subscription.slices';
import {countryReducer} from './country/country.slices';

const State = {
	auth: authReducer,
	genres: genresReducer,
	participant: participantReducer,
	country: countryReducer,
	producers: producersReducer,
	categories: categoriesReducer,
	users: usersReducer,
	payment: paymentReducer,
	movies: moviesReducer,
	comments: commentsReducer,
	globalUI: globalUIReducer,
	subscriptions: subscriptionReducer,
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
