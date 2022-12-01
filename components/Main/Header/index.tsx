import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {LoginButtonWithMenu} from '../index';
import cn from 'classnames';
import {useAppDispatch, useAppSelector, useOnClickOutside} from '../../../core/hooks';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Button} from 'react-bootstrap';
import {setIsShownModalAction} from '../../../core/store/globalUI/globalUI.slices';
import styles from './styles.module.sass';

export const Header = () => {
	// next router
	const router = useRouter();
	const currentPath = router.asPath.substring(1);

	// redux hooks
	const dispatch = useAppDispatch();
	const [user, categories] = useAppSelector(({auth, categories}) => [auth.user, categories]);

	// react hooks
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSticky, setIsSticky] = useState(false);
	const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);

	const headerRef = useRef<HTMLElement>(null);
	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		changeBackground();
		window.addEventListener('scroll', changeBackground);

		return () => {
			window.removeEventListener('scroll', changeBackground);
		};
	}, []);

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

	const changeModalIsShown =
		({modalName, show}: {modalName: 'login' | 'search'; show: boolean}) =>
		() => {
			dispatch(setIsShownModalAction({modalName, flag: show}));
		};

	const renderMenu = () => {
		return categories.main.list.map((c) => (
			<li
				className={cn('main-menu__item', {
					'main-menu__item_active': currentPath === c.slug,
				})}
				key={c.id}
			>
				<Link href={`/${c.slug}`}>
					<a className='main-menu__link'>{c.title}</a>
				</Link>
			</li>
		));
	};

	const showSearchInput = () => {
		setIsSearchInputVisible(!isSearchInputVisible);
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
								<li
									className={cn('main-menu__item', {
										'main-menu__item_active': currentPath === '',
									})}
								>
									<Link href='/'>
										<a className='main-menu__link'>Домой</a>
									</Link>
								</li>

								{renderMenu()}
							</ul>
						</nav>
					</aside>
					<div className='header__search'>
						<div className='d-flex'>
							<input
								type='text'
								className={cn('form-control me-2', {
									[styles['visible-input']]: isSearchInputVisible,
									[styles['hidden-input']]: !isSearchInputVisible,
								})}
								placeholder='Поиск...'
								autoComplete='off'
							/>
							<Button
								variant='secondary'
								className='rounded-pill'
								// onClick={changeModalIsShown({modalName: 'search', show: true})}
								onClick={showSearchInput}
							>
								<span className='icon icon-search'></span>
							</Button>
						</div>
					</div>
					<div className='header__loginza header-loginza'>
						{user ? (
							<LoginButtonWithMenu />
						) : (
							<Button
								variant='primary'
								className='header-loginza__login btn btn-primary rounded-pill'
								onClick={changeModalIsShown({modalName: 'login', show: true})}
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
