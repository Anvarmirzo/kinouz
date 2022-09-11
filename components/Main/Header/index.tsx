import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {LoginButtonWithMenu, LoginModal} from '../index';
import {SearchModal} from '../Modals/SearchModal';
import cn from 'classnames';
import {useAppSelector, useOnClickOutside} from '../../../core/hooks';
import Link from 'next/link';
import {useRouter} from 'next/router';

export const Header = () => {
	// next router
	const router = useRouter();
	const currentRoute = router.pathname;

	// redux hooks
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
									<a href='components/Main/Header/index#' className='main-menu__link'>
										TV
									</a>
								</li>
								<li
									className={cn('main-menu__item', {
										'main-menu__item_active': currentRoute === '/movies',
									})}
								>
									<Link href='/movies'>
										<a className='main-menu__link'>Фильмы</a>
									</Link>
								</li>
								<li
									className={cn('main-menu__item', {
										'main-menu__item_active': currentRoute === '/serial/[serialId]',
									})}
								>
									<Link href='/serial/1'>
										<a className='main-menu__link'>Сериалы</a>
									</Link>
								</li>
								<li className='main-menu__item'>
									<a href='components/Main/Header/index#' className='main-menu__link'>
										Шоу
									</a>
								</li>
								<li className='main-menu__item'>
									<a href='components/Main/Header/index#' className='main-menu__link'>
										Мультфильмы
									</a>
								</li>
								<li className='main-menu__item'>
									<a href='components/Main/Header/index#' className='main-menu__link'>
										Аниме
									</a>
								</li>
							</ul>
						</nav>
						<nav className='header__user-menu user-menu'>
							<ul className='user-menu__list'>
								<li className='user-menu__item'>
									<a href='components/Main/Header/index#' className='user-menu__link'>
										Моя подборка
									</a>
								</li>
								<li className='user-menu__item'>
									<a href='components/Main/Header/index#' className='user-menu__link'>
										История просмотров
									</a>
								</li>
							</ul>
						</nav>
					</aside>
					<div className='header__search'>
						<SearchModal />
					</div>
					<div className='header__loginza header-loginza'>
						{user ? <LoginButtonWithMenu user={user} /> : <LoginModal />}
					</div>
				</div>
			</header>
		</div>
	);
};
