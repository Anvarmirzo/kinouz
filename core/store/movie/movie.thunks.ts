import {getOneService, MovieService} from '../../services';
import {MovieModel} from '../../interfaces';
import {Toast} from '../../utils';
import {setMovieAction, setMoviesAction} from './movie.slices';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getMoviesThunk = createAsyncThunk<
	void,
	{skip?: number; params?: Record<string, number | string>} | void
>('movie/getAll', async (payload, thunkAPI) => {
	const movies = await MovieService.getAll({
		params: payload?.params ?? {},
		skip: payload?.skip ?? 0,
	});

	if (movies) {
		thunkAPI.dispatch(setMovies(movies.count, movies.data));
	}
});

export const setMovies =
	(count: number = 0, movies: MovieModel[] = []) =>
	(dispatch: any) => {
		return dispatch(
			setMoviesAction({
				movies,
				count,
			})
		);
	};

export const getMovieThunk = createAsyncThunk<void, number>(
	'movie/getAll',
	async (payload, thunkAPI) => {
		const movie = await MovieService.getById(payload);

		if (movie) {
			thunkAPI.dispatch(setMovie(movie));
		}
	}
);

export const setMovie =
	(movie: MovieModel | null = null) =>
	(dispatch: any) => {
		return dispatch(setMovieAction(movie));
	};
