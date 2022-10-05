import React, {useRef, useState} from 'react';
import {useAppDispatch, useOnClickOutside} from '../../../../core/hooks';
import cn from 'classnames';
import Link from 'next/link';
import AnimateHeight from 'react-animate-height';
import {logoutThunk} from '../../../../core/store/auth/auth.thunks';
import {UserModel} from '../../../../core/models';

export const LoginButtonWithMenu = ({user}: {user: UserModel}) => {
	// redux hooks
	const dispatch = useAppDispatch();

	// react hooks
	const [isMenuOpen, setIsMenuOpen] = useState({mainMenu: false, profilesDropdown: false});
	const [height, setHeight] = useState<'auto' | number>(0);
	const userMenuRef = useRef<HTMLDivElement>(null);

	// custom hooks
	useOnClickOutside(userMenuRef, () => {
		setIsMenuOpen((prev) => ({...prev, mainMenu: false}));
	});

	const toggleOpenFlag =
		(key: keyof typeof isMenuOpen) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
			e.preventDefault();
			if (key === 'profilesDropdown') setHeight(height === 0 ? 'auto' : 0);
			setIsMenuOpen((prev) => ({...prev, [key]: !prev[key]}));
		};

	const onLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		dispatch(logoutThunk());
	};

	const renderAccountsList = () => {
		if (user.subUsers) {
			return (
				<ul className='user-sidebar-menu__sub-list' style={{display: 'block'}}>
					{user.subUsers?.map((s) => (
						<li className='user-sidebar-menu__sub-item' key={s.id}>
							<a href='#' className='user-sidebar-menu__sub-link'>
								<span className='ava bg-danger'>{s.name.charAt(0)}</span>
								{s.name}
							</a>
						</li>
					))}
				</ul>
			);
		}
	};

	return (
		<div
			className={cn({
				'user-sidebar-open': isMenuOpen.mainMenu,
			})}
			ref={userMenuRef}
		>
			<button className='header-loginza__user btn' onClick={toggleOpenFlag('mainMenu')}>
				<div className='header-loginza__user-ava'>{user.name?.charAt(0)}</div>
				<div className='header-loginza__user-name'>{user.name}</div>
			</button>
			<div className='header-loginza__user-sidebar user-sidebar'>
				<nav className='user-sidebar__user-sidebar-menu user-sidebar-menu'>
					<ul className='user-sidebar-menu__list'>
						<li className='user-sidebar-menu__item'>
							<Link href='/account' className='user-sidebar-menu__link'>
								<a>
									<span className='icon icon-portrait'></span>Аккаунт
								</a>
							</Link>
						</li>
						<li className='user-sidebar-menu__item hus-sub-list'>
							<a
								href='#'
								onClick={toggleOpenFlag('profilesDropdown')}
								className={cn('user-sidebar-menu__link', {
									open: isMenuOpen.profilesDropdown,
								})}
							>
								<span className='icon icon-people'></span>Профили
							</a>
							<AnimateHeight duration={300} height={height}>
								{renderAccountsList()}
							</AnimateHeight>
						</li>
						<li className='user-sidebar-menu__item'>
							<a onClick={onLogout} href='#' className='user-sidebar-menu__link'>
								<span className='icon icon-logout'></span>Выйти из аккаунта
							</a>
						</li>
					</ul>
				</nav>
				<div className='user-sidebar__mobile-app mobile-app'>
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
		</div>
	);
};
