import {genresAction} from './genre.slices';
import {getAllService, getOneService} from '../../services';
import {IGenre} from '../../interfaces/global';
import {Toast} from '../../utils';

export const getAll =
	(skip: number = 0, params: any = {}) =>
	(dispatch: any) => {
		return getAllService(skip, params, 'genre')
			.then((res) => {
				dispatch(setGenres(res.count, res.data));
			})
			.catch((e) => {
				Toast.error(e);
			});
	};

export const setGenres =
	(count: number = 0, genres: IGenre[] = []) =>
	(dispatch: any) => {
		return dispatch(
			genresAction.setGenres({
				genres,
				count,
			})
		);
	};

export const getOne = (id: number) => (dispatch: any) => {
	return getOneService(id, 'genre')
		.then((genre) => {
			dispatch(setGenre(genre));
		})
		.catch((e) => {
			Toast.error(e);
		});
};

export const setGenre =
	(genre: IGenre | null = null) =>
	(dispatch: any) => {
		return dispatch(
			genresAction.setGenre({
				genre,
			})
		);
	};
