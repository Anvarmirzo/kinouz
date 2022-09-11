import {actorsAction} from './actor.slices';
import {IActor} from '../../interfaces';
import {getAllService, getOneService} from '../../services';
import {Toast} from '../../utils';

export const getAll =
	(skip: number = 0, params: any = {}) =>
	(dispatch: any) => {
		return getAllService(skip, params, 'actor')
			.then((res) => {
				dispatch(setActors(res.count, res.data));
			})
			.catch((e) => {
				Toast.error(e);
			});
	};

export const setActors =
	(count: number = 0, actors: IActor[] = []) =>
	(dispatch: any) => {
		return dispatch(
			actorsAction.setActors({
				actors,
				count,
			})
		);
	};

export const getOne = (id: number) => (dispatch: any) => {
	return getOneService(id, 'actor')
		.then((actor) => {
			dispatch(setActor(actor));
		})
		.catch((e) => {
			Toast.error(e);
		});
};

export const setActor =
	(actor: IActor | null = null) =>
	(dispatch: any) => {
		return dispatch(
			actorsAction.setActor({
				actor,
			})
		);
	};
