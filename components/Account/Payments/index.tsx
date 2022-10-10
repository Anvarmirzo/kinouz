import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../core/hooks';
import {getPaymentsThunk} from '../../../core/store/payment/payment.thunks';
import Moment from 'react-moment';
import {setPaymentsAction} from '../../../core/store/payment/payment.slices';

export const Payments = () => {
	// redux hooks
	const dispatch = useAppDispatch();
	const [userId, payment] = useAppSelector(({users, payment}) => [users.user?.id, payment.payment]);

	// react hooks
	useEffect(() => {
		if (userId) {
			dispatch(getPaymentsThunk({params: {userId}}));
		}
		// TODO: use this strategy to all subscriptions to avoid memory leak
		return () => {
			dispatch(setPaymentsAction({list: [], count: 0}));
		};
	}, [userId]);

	const renderPayments = () => {
		return payment.list.map((p) => (
			<div className='alert alert-success' role='alert' key={p.id}>
				<h6 className='alert-heading'>
					<Moment format='DD.MM.YYYY HH:mm'>{p.createdAt}</Moment>
				</h6>
				<p>пополнение аккаунта на {p.summa} сум.</p>
			</div>
		));
	};
	return (
		<div role='tabpanel' aria-labelledby='history'>
			{renderPayments()}
		</div>
	);
};
