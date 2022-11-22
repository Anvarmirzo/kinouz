import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../core/hooks';
import {setIsShownModalAction} from '../../../../core/store/globalUI/globalUI.slices';
import {Modal} from 'react-bootstrap';
import Link from 'next/link';

export const SubscribeModal = () => {
	// redux hooks
	const dispatch = useAppDispatch();
	const isShown = useAppSelector(({globalUI}) => globalUI.modals.subscribe.isShown);

	const changeShow = (payload: {modalName: 'subscribe'; flag: boolean}) => () => {
		dispatch(setIsShownModalAction(payload));
	};

	return (
		<Modal
			show={isShown}
			onHide={changeShow({modalName: 'subscribe', flag: false})}
			aria-labelledby='subscribeModalLabel'
			id='subscribeModal'
		>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body className='text-center'>
				<h6 className='modal-title mb-3' id='subscribeModalLabel'>
					Приобретите платную подписку, чтобы смотреть этот фильм
				</h6>
				<Link href='/account?tab=subscriptions'>
					<a
						onClick={changeShow({modalName: 'subscribe', flag: false})}
						className='btn btn-primary btn-icon rounded-pill'
					>
						Приобрести
					</a>
				</Link>
			</Modal.Body>
		</Modal>
	);
};
