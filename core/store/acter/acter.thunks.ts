import {actorsAction} from './acter.slices';
import {IActer} from '../../interfaces';
import {getAllService, getOneService} from '../../services';
import {Toast} from '../../utils';

export const getAll =
	(skip: number = 0, params: any = {}) =>
	(dispatch: any) => {
		return getAllService(skip, params, 'acter')
			.then((res) => {
				dispatch(setActers(res.count, res.data));
			})
			.catch((e) => {
				Toast.error(e);
			});
	};

export const setActers =
	(count: number = 0, acters: IActer[] = []) =>
	(dispatch: any) => {
		return dispatch(
			actorsAction.setActers({
				acters,
				count,
			})
		);
	};

export const getOne = (id: number) => (dispatch: any) => {
	return getOneService(id, 'acter')
		.then((acter) => {
			dispatch(setActer(acter));
		})
		.catch((e) => {
			Toast.error(e);
		});
};

export const setActer =
	(acter: IActer | null = null) =>
	(dispatch: any) => {
		return dispatch(
			actorsAction.setActer({
				acter,
			})
		);
	};
