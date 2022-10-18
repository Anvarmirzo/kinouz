import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {logoutThunk} from '../../../core/store/auth/auth.thunks';
import {useAppDispatch, useAppSelector} from '../../../core/hooks';
import {setIsShownModalAction} from '../../../core/store/globalUI/globalUI.slices';

export const Footer = () => {
	// redux hooks
	const dispatch = useAppDispatch();
	const user = useAppSelector(({users}) => users.user);

	const onLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		dispatch(logoutThunk());
	};

	const showModal = (modalName: 'login' | 'signup') => () => {
		dispatch(setIsShownModalAction({modalName, flag: true}));
	};

	return (
		<footer className='footer'>
			<div className='footer__container container-fluid'>
				<div className='footer__info'>
					<div className='footer__logo'>
						<Image src='/img/dist/logo.png' alt='logo' width={156} height={32} />
					</div>
					<div className='footer__copy'>
						© 2003 — {new Date().getFullYear()} <span>I</span> kinouz.uz
					</div>
				</div>
				<div className='footer__menu footer-menu'>
					<ul className='footer-menu__list'>
						<li className='footer-menu__item'>
							<a href='#' className='footer-menu__link'>
								<span className='icon icon-account_balance_wallet'></span>Подписка и оплата
							</a>
						</li>
						{user ? (
							<>
								<li className='footer-menu__item'>
									<Link href='/account'>
										<a className='footer-menu__link'>
											<span className='icon icon-portrait'></span>Профиль
										</a>
									</Link>
								</li>
								<li className='footer-menu__item'>
									<a onClick={onLogout} href='#' className='footer-menu__link'>
										<span className='icon icon-logout'></span>Выйти из учетной записи
									</a>
								</li>
							</>
						) : (
							/* TODO: find icons for login and signup */
							<>
								<li className='footer-menu__item'>
									<a onClick={showModal('login')} href='#' className='footer-menu__link'>
										<span className='icon icon-logout'></span>Войти
									</a>
								</li>
								<li className='footer-menu__item'>
									<a onClick={showModal('signup')} href='#' className='footer-menu__link'>
										<span className='icon icon-logout'></span>Пройти регистрацию
									</a>
								</li>
							</>
						)}
					</ul>
				</div>
				<div className='footer__mobile-app mobile-app'>
					<ul className='mobile-app__list'>
						<li className='mobile-app__item'>
							<a href='#' className='mobile-app__link btn'>
								<span className='icon icon-google-play'></span>
							</a>
						</li>
						<li className='mobile-app__item'>
							<a href='#' className='mobile-app__link btn'>
								<span className='icon icon-app-store'></span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};
