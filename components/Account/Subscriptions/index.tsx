import React, {useEffect} from 'react';
import {Button, Card} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../../core/hooks';
import {getSubscriptionTypeThunk} from '../../../core/store/payment/payment.thunks';

export const Subscriptions = () => {
	// redux hooks
	const dispatch = useAppDispatch();
	const subscriptions = useAppSelector(({payment}) => payment.subscriptionType);

	// react hooks
	useEffect(() => {
		dispatch(getSubscriptionTypeThunk());
	}, []);

	const renderCards = () => {
		return subscriptions.list.map((s) => (
			<Card key={s.id} style={{background: `url(${s.poster?.url}) 0 0 no-repeat`}}>
				<Card.Header>30 дней за {s.price} сум</Card.Header>
				<Card.Body>
					<Card.Title>{s.title}</Card.Title>
					<Card.Text>{s.description}</Card.Text>
					<a href='#' className='btn btn-primary me-1'>
						Купить
					</a>
					<Button variant='primary' disabled>
						Активный
					</Button>
				</Card.Body>
				<Card.Footer>до 02.08.2022г.</Card.Footer>
			</Card>
		));
	};

	return (
		<div id='nav-4' role='tabpanel' aria-labelledby='subscriptions'>
			{renderCards()}
			<Card
				style={{
					background:
						'url(http://155822.selcdn.ru/upload-8bfeca17cf9a3316f68775e6b5e44259/iblock/c7e/750x485.jpeg) 0 0 no-repeat',
				}}
			>
				<Card.Header>30 дней за 17000 сум</Card.Header>
				<Card.Body>
					<Card.Title>Amediateka</Card.Title>
					<Card.Text>
						Мировые хиты и блокбастеры производства HBO, CBS и других от сервиса Amediateka.ru
					</Card.Text>
					<a href='#' className='btn btn-primary me-1'>
						Купить
					</a>
					<Button variant='primary' disabled>
						Активный
					</Button>
				</Card.Body>
				<Card.Footer>до 02.08.2022г.</Card.Footer>
			</Card>
			<Card
				style={{
					background:
						'url(https://www.apple.com/tv-pr/articles/2022/03/apple-original-films-to-premiere-exhilarating-slate-of-new-films-from-award-winning-storytellers-in-2022-and-beyond/images/big-image/big-image-01/030822_Apple_Original_Films_Premiere_New_Films_in_2022_Argylle_big_image_post.jpg.large.jpg) 0 0 no-repeat',
				}}
			>
				<Card.Header className='card-header'>30 дней за 17000 сум</Card.Header>
				<Card.Body className='card-body'>
					<Card.Title>Amediateka</Card.Title>
					<Card.Text>
						Мировые хиты и блокбастеры производства HBO, CBS и других от сервиса Amediateka.ru
					</Card.Text>
					<a href='#' className='btn btn-primary me-1'>
						Купить
					</a>
					<Button variant='primary' disabled>
						Активный
					</Button>
				</Card.Body>
				<Card.Footer>до 02.08.2022г.</Card.Footer>
			</Card>
		</div>
	);
};
