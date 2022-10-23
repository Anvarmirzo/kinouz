import React, {useEffect} from 'react';
import Moment from 'react-moment';
import cn from 'classnames';
import {useAppDispatch, useAppSelector} from '../../../../core/hooks';
import {getPaymentsThunk} from '../../../../core/store/payment/payment.thunks';
import {setPaymentsAction} from '../../../../core/store/payment/payment.slices';
import {ePaymentStatusType} from '../../../../core/models';

export const PaymentsHistory = () => {
	// redux hooks
	const dispatch = useAppDispatch();
	const [userId, payment] = useAppSelector(({users, payment}) => [users.user?.id, payment.payment]);

	// react hooks
	useEffect(() => {
		if (userId) {
			const promise = dispatch(getPaymentsThunk({params: {userId}}));
			// TODO: use this strategy to all subscriptions to avoid memory leak
			return () => {
				promise.abort();
				dispatch(setPaymentsAction({list: [], count: 0}));
			};
		}
	}, [userId]);

	const renderPayments = () => {
		return payment.list.map((p) => (
			<div className='alert alert-success' role='alert' key={p.id}>
				<h6 className='alert-heading d-flex align-items-center gap-2'>
					<Moment format='DD.MM.YYYY HH:mm'>{p.createdAt}</Moment>
					<span
						className={cn('movie-card__label', {
							'bg-primary': p.status.id === ePaymentStatusType.Pending,
							'bg-secondary': p.status.id === ePaymentStatusType.Success,
							'bg-danger': p.status.id === ePaymentStatusType.Fail,
						})}
					>
						{' '}
						{p.status.title}
					</span>
				</h6>
				<p>пополнение аккаунта на {p.summa} сум.</p>
			</div>
		));
	};
	return (
		<div role='tabpanel' aria-labelledby='history'>
			{payment.list.length > 0 ? renderPayments() : 'Список пуст.'}
		</div>
	);
};
