import React, {useEffect} from 'react';
import Head from 'next/head';
import {Footer, Header} from '../../components/Main';
import {Accordion, Button, Card, Tab, Tabs} from 'react-bootstrap';
import Image from 'next/image';
import {useAppSelector} from '../../core/hooks';
import {useForm} from 'react-hook-form';
import {NewSubUser, SubUserAccordionItem} from '../../components/Account';

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

	const renderSubUsers = () => {
		return user?.subUsers?.map((s) => (
			<SubUserAccordionItem user={s} key={s.id} eventKey={`${s.id}`} />
		));
	};

	const showNewUserForm = () => {
		if (user?.subUsers) {
			return user.subUsers.length < 5 ? <NewSubUser userId={user.id} /> : null;
		}
	};

	if (!user) return <></>;

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
											<div className='input-group input-group-btn input-group-left-text mb-2'>
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
											<div className='input-group input-group-btn input-group-left-text mb-4'>
												<span className='input-group-text gap-3'>
													Способы оплаты:{' '}
													<Image width={61} height={15} src='/img/dist/humo-logo.png' alt='humo' />
												</span>
												<input type='email' className='form-control' value='**** **** 1212' />
												<button
													className='btn btn-edit btn-icon'
													type='button'
													data-bs-toggle='modal'
													data-bs-target='#paymentModal'
												>
													изменить<span className='icon icon-edit'></span>
												</button>
											</div>
											<div className='account-editing__balance'>
												<span className='account-editing__balance-title'>Баланс: </span>
												<span className='account-editing__balance-total'>{user?.balance}</span>
												<span className='account-editing__balance-subscription'>
													(стоимость абонненской платы 15 000 сум/месяц)
												</span>
											</div>
										</div>
										<h2 className='page-title fw-normal mb-35'>Профили:</h2>
										<div className='profiles'>
											<Accordion defaultActiveKey='0'>{renderSubUsers()}</Accordion>
										</div>
										{showNewUserForm()}
									</div>
								</div>
							</Tab>
							<Tab eventKey='payment' title='Оплата'>
								<div role='tabpanel' aria-labelledby='payment'>
									<div className='tab-content' id='nav-tabContent'>
										<div className='nav mynav mb-3' id='nav-tab1' role='tablist'>
											<div className='alert alert-primary alert-dismissible fade show' role='alert'>
												При оплате седства попадают на баланс аккаунта после чего Вы можете
												приобрести подписку.
												<button
													type='button'
													className='btn-close'
													data-bs-dismiss='alert'
													aria-label='Close'
												></button>
											</div>
											<a
												className='active btn btn-primary'
												id='click'
												data-bs-toggle='tab'
												href='#nav-click'
												role='tab'
												aria-controls='nav-click'
												aria-selected='true'
												style={{background: 'none', border: 'none'}}
											>
												<Image
													width={127}
													height={50}
													src='/img/images/click.png'
													style={{maxHeight: '50px', width: '100%'}}
													alt=''
												/>
											</a>
											<a
												className='btn btn-primary'
												id='nav-payme-tab'
												data-bs-toggle='tab'
												href='#nav-payme'
												role='tab'
												aria-controls='nav-payme'
												aria-selected='false'
												style={{background: 'none', border: 'none'}}
											>
												<Image
													width={172}
													height={50}
													style={{maxHeight: '50px', width: '100%'}}
													src='/img/images/payme.png'
													alt=''
												/>
											</a>
										</div>
										<div
											className='tab-pane fade show active'
											id='nav-click'
											role='tabpanel'
											aria-labelledby='nav-click-tab'
										>
											<br />
											<form className='forms'>
												<input
													className='form-control form-control'
													type=''
													name=''
													value=''
													placeholder='введите сумму для оплаты'
												/>
												<button type='submit' className='btn btn-primary'>
													Оплатить
												</button>
											</form>
										</div>
										<div
											className='tab-pane fade'
											id='nav-payme'
											role='tabpanel'
											aria-labelledby='nav-payme-tab'
										>
											<br />
											<form action='/' method='post' className='forms'>
												<input
													className='form-control form-control'
													type=''
													name=''
													value=''
													placeholder='введите сумму для оплаты'
												/>
												<button type='submit' className='btn btn-primary'>
													Оплатить
												</button>
											</form>
										</div>
									</div>
								</div>
							</Tab>
							<Tab eventKey='history' title='История платежей'>
								<div role='tabpanel' aria-labelledby='history'>
									<div className='tab-content' id='nav-tabContent'>
										<div className='alert alert-success' role='alert'>
											<h6 className='alert-heading'>02.08.2022г.</h6>
											<p>пополнение аккаунта на 30 000 сум.</p>
											<hr />
											<p className='mb-0'>
												<b>Тариф: </b>Зарубежное кино - 30 000 сум.
											</p>
										</div>
										<div className='alert alert-success' role='alert'>
											<h6 className='alert-heading'>02.08.2022г.</h6>
											<p>пополнение аккаунта на 20 000 сум.</p>
											<hr />
											<p className='mb-0'>
												<b>Тариф: </b>Мультсериалы - 30 000 сум.
											</p>
										</div>
										<div className='alert alert-success' role='alert'>
											<h6 className='alert-heading'>02.08.2022г.</h6>
											<p>пополнение аккаунта на 30 000 сум.</p>
											<hr />
											<p className='mb-0'>
												<b>Тариф: </b>Амедиатека - 30 000 сум.
											</p>
										</div>
									</div>
								</div>
							</Tab>
							<Tab eventKey='subscriptions' title='Мои подписки'>
								<div id='nav-4' role='tabpanel' aria-labelledby='subscriptions'>
									<Card
										style={{
											background:
												'url(http://155822.selcdn.ru/upload-8bfeca17cf9a3316f68775e6b5e44259/iblock/c7e/750x485.jpeg) 0 0 no-repeat',
										}}
									>
										<Card.Header>30 дней за 17000 сум</Card.Header>
										<Card.Body>
											<Card.Title>Мультсериалы</Card.Title>
											<Card.Text>
												Мировые хиты и блокбастеры производства HBO, CBS и других от сервиса
												Amediateka.ru
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
												'url(http://155822.selcdn.ru/upload-8bfeca17cf9a3316f68775e6b5e44259/iblock/c7e/750x485.jpeg) 0 0 no-repeat',
										}}
									>
										<Card.Header>30 дней за 17000 сум</Card.Header>
										<Card.Body>
											<Card.Title>Amediateka</Card.Title>
											<Card.Text>
												Мировые хиты и блокбастеры производства HBO, CBS и других от сервиса
												Amediateka.ru
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
												Мировые хиты и блокбастеры производства HBO, CBS и других от сервиса
												Amediateka.ru
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
