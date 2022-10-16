import React, {useEffect} from 'react';
import Head from 'next/head';
import {Footer, Header} from '../../components/Main';
import {Accordion, Tab, Tabs} from 'react-bootstrap';
import {useAppSelector} from '../../core/hooks';
import {useForm} from 'react-hook-form';
import {
	NewSubUser,
	PaymentForm,
	Payments,
	SubUserAccordionItem,
	Subscriptions,
} from '../../components/Account';

const Account = () => {
	// redux hooks
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
		if (user) {
			setValue('email', user.contact.email);
		}
	}, [user]);

	if (!user) return null;

	return (
		<>
			<Head>
				<title>Аккаунт | KinoUz</title>
			</Head>
			<Header />
			<main className='content'>
				<div className='container'>
					<nav>
						<Tabs
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
										<div className='account-editing'>
											<div className='input-group input-group-btn input-group-left-text mb-2'>
												<span className='input-group-text'>E-mail:</span>
												<input
													type='email'
													className='form-control'
													{...register('email', {required: true})}
												/>
												<button className='btn btn-edit btn-icon' type='button'>
													изменить<span className='icon icon-edit'></span>
												</button>
											</div>
											<div className='input-group input-group-btn input-group-left-text mb-4'>
												<span className='input-group-text'>Пароль:</span>
												<input
													type='password'
													className='form-control'
													placeholder='*************'
													{...register('password', {required: true})}
												/>
												<button className='btn btn-edit btn-icon' type='button'>
													изменить<span className='icon icon-edit'></span>
												</button>
											</div>
											<div className='account-editing__balance'>
												<span className='account-editing__balance-title'>Баланс: </span>
												<span className='account-editing__balance-total'>{user?.balance} </span>
												<span className='account-editing__balance-subscription'>
													(стоимость абонентской платы 15 000 сум/месяц)
												</span>
											</div>
										</div>
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
								<Payments />
							</Tab>
							<Tab eventKey='subscriptions' title='Мои подписки'>
								<Subscriptions />
							</Tab>
						</Tabs>
					</nav>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Account;
