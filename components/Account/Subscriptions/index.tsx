import React, {useEffect, useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import Moment from 'react-moment';
import Image from 'next/image';
import {SubscriptionModel, SubscriptionType} from '../../../core/models';
import {useAppDispatch, useAppSelector} from '../../../core/hooks';
import {setSubscriptionTypesAction} from '../../../core/store/subscription/subscription.slices';
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
		(SubscriptionType & {
			subscribed: boolean;
			typeId: number;
			expirationAt?: Date;
			active?: boolean;
		})[]
	>([]);

	useEffect(() => {
		const promise = dispatch(getSubscriptionTypesThunk());

		return () => {
			promise.abort();
			dispatch(setSubscriptionTypesAction({list: [], count: 0}));
		};
	}, []);

	useEffect(() => {
		if (user) {
			// fields 'id', 'expirationAt', 'active' will be added to model SubscribeType and will be showed in card
			const userShortSubscriptions = user.subscriptions.map((userSub) => ({
				typeId: userSub.type.id,
				id: userSub.id,
				expirationAt: userSub.expirationAt,
				active: userSub.active,
			}));

			const subscribedList = unfilteredSubscriptions.list.map((unfilteredSub) => {
				const index = userShortSubscriptions.findIndex(({typeId}) => typeId === unfilteredSub.id);
				const isExists = index !== -1;

				return {
					...unfilteredSub,
					subscribed: isExists,
					id: isExists ? userShortSubscriptions[index].id : unfilteredSub.id,
					typeId: isExists ? userShortSubscriptions[index].typeId : unfilteredSub.id,
					expirationAt: isExists ? userShortSubscriptions[index].expirationAt : undefined,
					active: isExists ? userShortSubscriptions[index].active : undefined,
				};
			});

			setSubscriptions(subscribedList);
		}
	}, [unfilteredSubscriptions.list, user]);

	const onSubscribe = (subscriptionTypeId: number) => async () => {
		const action = await dispatch(subscribeThunk(subscriptionTypeId));

		if (action.payload) {
			dispatch(autoLoginThunk());
		}
	};

	const onUnsubscribe = (subscriptionTypeId: number) => async () => {
		const action = await dispatch(unsubscribeThunk(subscriptionTypeId));
		const result = action.payload as SubscriptionModel;

		if (result) {
			dispatch(autoLoginThunk());
		}
	};

	const renderCards = () => {
		return subscriptions.map((s) => (
			<Card key={s.typeId} style={{background: `0 0 no-repeat`}} className='overflow-hidden'>
				{s.poster && (
					<Image
						src={s.poster.url}
						alt=''
						layout='fill'
						objectFit='cover'
						className='opacity-50'
						crossOrigin='use-credentials'
						unoptimized={true}
					/>
				)}
				<Card.Header className='position-relative'>30 дней за {s.price} сум</Card.Header>
				<Card.Body className='position-relative'>
					<Card.Title>{s.title}</Card.Title>
					<Card.Text
						style={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							lineClamp: 3,
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
						}}
					>
						{s.description}
					</Card.Text>
					{s.subscribed ? (
						<>
							<Button
								onClick={s.active ? onUnsubscribe(s.id) : onSubscribe(s.typeId)}
								variant='primary'
								className='me-1'
							>
								{s.active ? 'Отписаться' : 'Купить'}
							</Button>
							<Button variant='primary' disabled>
								{s.active ? 'Активный' : 'Неактивный'}
							</Button>
						</>
					) : (
						<Button onClick={onSubscribe(s.typeId)} variant='primary'>
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
