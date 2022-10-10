import React, {useEffect, useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import Moment from 'react-moment';
import {SubscriptionType} from '../../../core/models';
import {useAppDispatch, useAppSelector} from '../../../core/hooks';
import {setSubscriptionTypesAction} from '../../../core/store/subscription/subscription.slices';
import {
	addUserSubscriptionAction,
	removeUserSubscriptionAction,
} from '../../../core/store/user/user.slices';
import {
	getSubscriptionTypesThunk,
	subscribeThunk,
	unsubscribeThunk,
} from '../../../core/store/subscription/subscription.thunks';
import {autoLoginThunk} from '../../../core/store/auth/auth.thunks';

export const Subscriptions = () => {
	// redux hooks
	const dispatch = useAppDispatch();
	const [unfilteredSubscriptions, user] = useAppSelector(({subscriptions, users}) => [
		subscriptions,
		users.user,
	]);

	// react hooks
	const [subscriptions, setSubscriptions] = useState<
		(SubscriptionType & {subscribed: boolean; expirationAt?: Date; active?: boolean})[]
	>([]);

	useEffect(() => {
		dispatch(getSubscriptionTypesThunk());

		return () => {
			dispatch(setSubscriptionTypesAction({list: [], count: 0}));
		};
	}, []);

	useEffect(() => {
		if (user) {
			// fields 'id', 'expirationAt', 'active' will be added to model SubscribeType and will be showed in card
			const userShortSubscriptions = user.subscriptions.map((userSub) => ({
				id: userSub.type.id,
				expirationAt: userSub.expirationAt,
				active: userSub.active,
			}));

			const subscribedList = unfilteredSubscriptions.list.map((unfilteredSub) => {
				const index = userShortSubscriptions.findIndex(({id}) => id === unfilteredSub.id);
				const isExists = index !== -1;

				return {
					...unfilteredSub,
					subscribed: isExists,
					expirationAt: isExists ? userShortSubscriptions[index].expirationAt : undefined,
					active: isExists ? userShortSubscriptions[index].active : undefined,
				};
			});

			setSubscriptions(subscribedList);
		}
	}, [unfilteredSubscriptions.list, user]);

	const onSubscribe = (subscriptionTypeId: number) => async () => {
		const result = await dispatch(subscribeThunk(subscriptionTypeId));

		if (result) {
			dispatch(autoLoginThunk());
		}
	};

	const onUnsubscribe = (subscriptionTypeId: number) => async () => {
		const result = await dispatch(unsubscribeThunk(subscriptionTypeId));

		if (result) {
			dispatch(autoLoginThunk());
			// @ts-ignore
			dispatch(removeUserSubscriptionAction(result));
		}
	};

	const renderCards = () => {
		return subscriptions.map((s) => (
			<Card key={s.id} style={{background: `url(${s.poster?.url}) 0 0 no-repeat`}}>
				<Card.Header>30 дней за {s.price} сум</Card.Header>
				<Card.Body>
					<Card.Title>{s.title}</Card.Title>
					<Card.Text>{s.description}</Card.Text>
					{s.subscribed ? (
						<>
							<Button onClick={onUnsubscribe(s.id)} variant='primary' className='me-1'>
								Отписаться
							</Button>
							<Button
								variant='primary'
								onClick={s.active ? onUnsubscribe(s.id) : onSubscribe(s.id)}
							>
								{s.active ? 'Активный' : 'Неактивный'}
							</Button>
						</>
					) : (
						<Button onClick={onSubscribe(s.id)} variant='primary'>
							Купить
						</Button>
					)}
				</Card.Body>
				{s.expirationAt && (
					<Card.Footer>
						до <Moment format='DD.MM.YYYY HH:mm'>{s.expirationAt}</Moment>
					</Card.Footer>
				)}
			</Card>
		));
	};

	return (
		<div id='nav-4' role='tabpanel' aria-labelledby='subscriptions'>
			{subscriptions.length ? renderCards() : 'Список пуст.'}
		</div>
	);
};
