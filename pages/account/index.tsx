import React, {useEffect, useMemo} from 'react';
import Head from 'next/head';
import {Footer, Header, Loader} from '../../components/Main';
import {Accordion, Tab, Tabs} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../core/hooks';
import {useForm} from 'react-hook-form';
import {
	NewSubUser,
	PaymentForm,
	PaymentsHistory,
	SubUserAccordionItem,
	Subscriptions,
} from '../../components/Account';
import {useRouter} from 'next/router';
import {patchUserThunk} from '../../core/store/user/user.thunks';

const Account = () => {
	// next hooks
	const router = useRouter();

	// redux hooks
	const dispatch = useAppDispatch();
	const user = useAppSelector(({users}) => users.user);

	// react hook form
	const {
		register,
		handleSubmit,
		setValue,
		formState: {errors},
	} = useForm<{email: string; password: string}>();

	// react hooks
	useEffect(() => {
		const timer = setTimeout(() => {
			if (user) {
				setValue('email', user.contact.email);
			} else {
				router.push({pathname: '/', query: {returnUrl: router.asPath}});
			}
		}, 2000);

		return () => {
			clearTimeout(timer);
		};
	}, [user]);

	const fee = useMemo(() => {
		let calculatedPrice = 0;

		if (user) {
			const prices = user.subscriptions
				.filter((s) => s.active)
				?.map((activeSubscription) => activeSubscription.type.price);

			prices.forEach((price) => {
				if (price) {
					calculatedPrice += price;
				}
			});

			return calculatedPrice;
		}

		return null;
	}, [user]);

	const onSubmitParentForm = (data: {email: string; password: string}) => {
		if (user) {
			dispatch(patchUserThunk({...data, userId: user.id}));
		}
	};

	return (
		<>
			<Head>
				<title>Аккаунт | KinoUz</title>
			</Head>
			<Header />
			{user ? (
				<main className='content'>
					<div className='container'>
						<nav>
							{user.parent ? (
								<Tabs
									activeKey={router.query.tab as string}
									onSelect={(k) => {
										if (k !== router.query.tab) {
											router.push({pathname: '/account', query: {tab: k}});
										}
									}}
									variant='pills'
									defaultActiveKey='profile'
									id='uncontrolled-tab-example'
									className='mb-3 mynav'
								>
									<Tab eventKey='profile' title='Аккаунт и профили'>
										<div role='tabpanel' aria-labelledby='profile'>
											<div
												className='tab-pane fade show active'
												id='nav-home'
												role='tabpanel'
												aria-labelledby='nav-home-tab'
											>
												<form
													onSubmit={handleSubmit(onSubmitParentForm)}
													className='account-editing'
												>
													<div className='input-group input-group-btn input-group-left-text mb-2'>
														<span className='input-group-text'>E-mail:</span>
														<input
															type='email'
															className='form-control'
															{...register('email', {required: true})}
														/>
														<button className='btn btn-edit btn-icon'>
															изменить<span className='icon icon-edit'></span>
														</button>
													</div>
													<div className='input-group input-group-btn input-group-left-text mb-4'>
														<span className='input-group-text'>Пароль:</span>
														<input
															type='password'
															className='form-control'
															placeholder='Пароль'
															{...register('password', {required: true})}
														/>
														<button className='btn btn-edit btn-icon'>
															изменить<span className='icon icon-edit'></span>
														</button>
													</div>
													{!user.parent && (
														<div className='account-editing__balance'>
															<span className='account-editing__balance-title'>Баланс: </span>
															<span className='account-editing__balance-total'>
																{user?.balance}{' '}
															</span>
															<span className='account-editing__balance-subscription'>
																(стоимость абонентской платы {fee} сум/месяц)
															</span>
														</div>
													)}
												</form>
												{!user.parent && (
													<>
														<h2 className='page-title fw-normal mb-35'>Профили:</h2>
														<div className='profiles'>
															<Accordion defaultActiveKey='0'>
																{user.subUsers.map((s) => (
																	<SubUserAccordionItem user={s} key={s.id} eventKey={`${s.id}`} />
																))}
															</Accordion>
														</div>
														{user.subUsers.length < 5 ? <NewSubUser userId={user.id} /> : null}
													</>
												)}
											</div>
										</div>
									</Tab>
								</Tabs>
							) : (
								<Tabs
									activeKey={router.query.tab as string}
									onSelect={(k) => {
										if (k !== router.query.tab) {
											router.push({pathname: '/account', query: {tab: k}});
										}
									}}
									variant='pills'
									defaultActiveKey='profile'
									id='uncontrolled-tab-example'
									className='mb-3 mynav'
								>
									<Tab eventKey='profile' title='Аккаунт и профили'>
										<div role='tabpanel' aria-labelledby='profile'>
											<div
												className='tab-pane fade show active'
												id='nav-home'
												role='tabpanel'
												aria-labelledby='nav-home-tab'
											>
												<form
													onSubmit={handleSubmit(onSubmitParentForm)}
													className='account-editing'
												>
													<div className='input-group input-group-btn input-group-left-text mb-2'>
														<span className='input-group-text'>E-mail:</span>
														<input
															type='email'
															className='form-control'
															{...register('email', {required: true})}
														/>
														<button className='btn btn-edit btn-icon'>
															изменить<span className='icon icon-edit'></span>
														</button>
													</div>
													<div className='input-group input-group-btn input-group-left-text mb-4'>
														<span className='input-group-text'>Пароль:</span>
														<input
															type='password'
															className='form-control'
															placeholder='Пароль'
															{...register('password', {required: true})}
														/>
														<button className='btn btn-edit btn-icon'>
															изменить<span className='icon icon-edit'></span>
														</button>
													</div>
													<div className='account-editing__balance'>
														<span className='account-editing__balance-title'>Баланс: </span>
														<span className='account-editing__balance-total'>{user?.balance} </span>
														<span className='account-editing__balance-subscription'>
															(стоимость абонентской платы {fee} сум/месяц)
														</span>
													</div>
												</form>
												<h2 className='page-title fw-normal mb-35'>Профили:</h2>
												<div className='profiles'>
													<Accordion defaultActiveKey='0'>
														{user.subUsers.map((s) => (
															<SubUserAccordionItem user={s} key={s.id} eventKey={`${s.id}`} />
														))}
													</Accordion>
												</div>
												{user.subUsers.length < 5 ? <NewSubUser userId={user.id} /> : null}
											</div>
										</div>
									</Tab>
									<Tab eventKey='payment' title='Оплата'>
										<PaymentForm />
									</Tab>
									<Tab eventKey='history' title='История платежей'>
										<PaymentsHistory />
									</Tab>
									<Tab eventKey='subscriptions' title='Мои подписки'>
										<Subscriptions />
									</Tab>
								</Tabs>
							)}
						</nav>
					</div>
				</main>
			) : (
				<Loader />
			)}
			<Footer />
		</>
	);
};

export default Account;
