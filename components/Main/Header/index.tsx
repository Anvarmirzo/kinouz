import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {LoginButtonWithMenu} from '../index';
import {SearchModal} from '../Modals/SearchModal';
import cn from 'classnames';
import {useAppDispatch, useAppSelector, useOnClickOutside} from '../../../core/hooks';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Button} from 'react-bootstrap';
import {setIsShownModalAction} from '../../../core/store/globalUI/globalUI.slices';

export const Header = () => {
	// next router
	const router = useRouter();
	const currentRoute = router.pathname;

	// redux hooks
	const dispatch = useAppDispatch();
	const user = useAppSelector(({auth}) => auth.user);

	// react hooks
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSticky, setIsSticky] = useState(false);

	const headerRef = useRef<HTMLElement>(null);
	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		changeBackground();
		window.addEventListener('scroll', changeBackground);

		return () => {
			window.removeEventListener('scroll', changeBackground);
		};
	});

	// custom hooks
	useOnClickOutside(sidebarRef, () => {
		setIsMenuOpen(false);
	});

	const changeBackground = () => {
		if (headerRef.current) {
			setIsSticky(window.scrollY > headerRef.current.offsetTop);
		}
	};

	const toggleOpenFlag = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const changeModalIsShown = (show: boolean) => () => {
		dispatch(setIsShownModalAction({modalName: 'login', flag: show}));
	};
	return (
		<div
			className={cn({
				'menu-open': isMenuOpen,
			})}
		>
			<header
				className={cn('header', {
					sticky: isSticky,
				})}
				ref={headerRef}
			>
				<div className='header__container container-fluid'>
					<button
						onClick={toggleOpenFlag}
						className='header__hamburger btn hamburger'
						title='Навигация'
					>
						<span className='hamburger__body'>
							<span className='hamburger__inner'>Навигация</span>
						</span>
					</button>
					<Link href='/'>
						<a className='header__logo'>
							<Image src='/img/dist/logo.png' alt='logo' width={156} height={32} />
						</a>
					</Link>
					<aside className='header__menus' ref={sidebarRef}>
						<nav className='header__main-menu main-menu'>
							<ul className='main-menu__list'>
								<li className='main-menu__item'>
									<a href='#' className='main-menu__link'>
										TV
									</a>
								</li>
								<li
									className={cn('main-menu__item', {
										'main-menu__item_active': ['/movies/[movieSlug]', '/movies'].includes(
											currentRoute
										),
									})}
								>
									<Link href='/movies'>
										<a className='main-menu__link'>Фильмы</a>
									</Link>
								</li>
								<li
									className={cn('main-menu__item', {
										'main-menu__item_active': ['/serials/[serialId]', '/serials'].includes(
											currentRoute
										),
									})}
								>
									<Link href='/serials'>
										<a className='main-menu__link'>Сериалы</a>
									</Link>
								</li>
								<li className='main-menu__item'>
									<a href='#' className='main-menu__link'>
										Шоу
									</a>
								</li>
								<li className='main-menu__item'>
									<a href='#' className='main-menu__link'>
										Мультфильмы
									</a>
								</li>
								<li className='main-menu__item'>
									<a href='#' className='main-menu__link'>
										Аниме
									</a>
								</li>
							</ul>
						</nav>
						<nav className='header__user-menu user-menu'>
							{user && (
								<ul className='user-menu__list'>
									<li className='user-menu__item'>
										<a href='#' className='user-menu__link'>
											Моя подборка
										</a>
									</li>
									<li className='user-menu__item'>
										<a href='#' className='user-menu__link'>
											История просмотров
										</a>
									</li>
								</ul>
							)}
						</nav>
					</aside>
					<div className='header__search'>
						<SearchModal />
					</div>
					<div className='header__loginza header-loginza'>
						{user ? (
							<LoginButtonWithMenu user={user} />
						) : (
							<Button
								variant='primary'
								className='header-loginza__login btn btn-primary rounded-pill'
								onClick={changeModalIsShown(true)}
							>
								Войти
							</Button>
						)}
					</div>
				</div>
			</header>
		</div>
	);
};
