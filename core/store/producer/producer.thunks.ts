import {producersAction} from './producer.slices';
import {getAllService, getOneService} from '../../services';
import {Toast} from '../../utils';
import {ProducerModel} from '../../models';

export const getAll =
	(skip: number = 0, params: any = {}) =>
	(dispatch: any) => {
		return getAllService(skip, params, 'producer')
			.then((res) => {
				dispatch(setproducers(res.count, res.data));
			})
			.catch((e) => {
				Toast.error(e);
			});
	};

export const setproducers =
	(count: number = 0, producers: ProducerModel[] = []) =>
	(dispatch: any) => {
		return dispatch(
			producersAction.setProducers({
				producers,
				count,
			})
		);
	};

export const getOne = (id: number) => (dispatch: any) => {
	return getOneService(id, 'producer')
		.then((producer) => {
			dispatch(setProducer(producer));
		})
		.catch((e) => {
			Toast.error(e);
		});
};

export const setProducer =
	(producer: ProducerModel | null = null) =>
	(dispatch: any) => {
		return dispatch(
			producersAction.setProducer({
				producer,
			})
		);
	};
