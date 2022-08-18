import React from 'react';
import Image from 'next/image';
import {LoginModal} from '../index';
import {SearchModal} from '../Modals/SearchModal';

export const Header = () => {
    return (
        <header className="header">
            <div className="header__container container-fluid">
                <button className="header__hamburger btn hamburger" type="button" title="Навигация">
			<span className="hamburger__body">
				<span className="hamburger__inner">Навигация</span>
			</span>
                </button>
                <a href="index.html" className="header__logo">
                    <Image src="/img/dist/logo.png" alt="logo" width={156} height={32}/>
                </a>
                <div className="header__menus">
                    <nav className="header__main-menu main-menu">
                        <ul className="main-menu__list">
                            <li className="main-menu__item"><a href="components/Main/Header/index#"
                                                               className="main-menu__link">TV</a></li>
                            <li className="main-menu__item main-menu__item_active"><a href="films.html"
                                                                                      className="main-menu__link">Фильмы</a>
                            </li>
                            <li className="main-menu__item"><a href="components/Main/Header/index#"
                                                               className="main-menu__link">Сериалы</a></li>
                            <li className="main-menu__item"><a href="components/Main/Header/index#"
                                                               className="main-menu__link">Шоу</a></li>
                            <li className="main-menu__item"><a href="components/Main/Header/index#"
                                                               className="main-menu__link">Мультфильмы</a>
                            </li>
                            <li className="main-menu__item"><a href="components/Main/Header/index#"
                                                               className="main-menu__link">Аниме</a></li>
                        </ul>
                    </nav>
                    <nav className="header__user-menu user-menu">
                        <ul className="user-menu__list">
                            <li className="user-menu__item"><a href="components/Main/Header/index#"
                                                               className="user-menu__link">Моя подборка</a>
                            </li>
                            <li className="user-menu__item"><a href="components/Main/Header/index#"
                                                               className="user-menu__link">История
                                просмотров</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="header__search">
                    <SearchModal/>
                </div>
                <div className="header__loginza header-loginza">
                    <LoginModal/>
                    <button className="header-loginza__user btn" type="button">
                        <div className="header-loginza__user-ava">A</div>
                        <div className="header-loginza__user-name">Arkein</div>
                    </button>
                    <div className="header-loginza__user-sidebar user-sidebar">
                        <nav className="user-sidebar__user-sidebar-menu user-sidebar-menu">
                            <ul className="user-sidebar-menu__list">
                                <li className="user-sidebar-menu__item">
                                    <a href="account.html" className="user-sidebar-menu__link"><span
                                        className="icon icon-portrait"></span>Аккаунт</a>
                                </li>
                                <li className="user-sidebar-menu__item hus-sub-list">
                                    <a href="components/Main/Header/index#" className="user-sidebar-menu__link"><span
                                        className="icon icon-people"></span>Профили</a>
                                    <ul className="user-sidebar-menu__sub-list">
                                        <li className="user-sidebar-menu__sub-item"><a
                                            href="components/Main/Header/index#"
                                            className="user-sidebar-menu__sub-link"><span
                                            className="ava bg-danger">A</span>Arkein</a></li>
                                        <li className="user-sidebar-menu__sub-item"><a
                                            href="components/Main/Header/index#"
                                            className="user-sidebar-menu__sub-link"><span
                                            className="ava bg-success">T</span>Trall</a></li>
                                        <li className="user-sidebar-menu__sub-item"><a
                                            href="components/Main/Header/index#"
                                            className="user-sidebar-menu__sub-link"><span
                                            className="ava bg-warning">G</span>Gerson</a></li>
                                        <li className="user-sidebar-menu__sub-item"><a
                                            href="components/Main/Header/index#"
                                            className="user-sidebar-menu__sub-link"><span
                                            className="ava bg-info">D</span>Dryoma</a></li>
                                        <li className="user-sidebar-menu__sub-item"><a
                                            href="components/Main/Header/index#"
                                            className="user-sidebar-menu__sub-link"><span
                                            className="ava bg-secondary">B</span>Butcher</a></li>
                                    </ul>
                                </li>
                                <li className="user-sidebar-menu__item">
                                    <a href="components/Main/Header/index#" className="user-sidebar-menu__link"><span
                                        className="icon icon-logout"></span>Выйти из аккаунта</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="user-sidebar__mobile-app mobile-app">
                            <ul className="mobile-app__list">
                                <li className="mobile-app__item">
                                    <a href="components/Main/Header/index#" className="mobile-app__link btn"><span
                                        className="icon icon-google-play"></span></a>
                                </li>
                                <li className="mobile-app__item">
                                    <a href="components/Main/Header/index#" className="mobile-app__link btn"><span
                                        className="icon icon-app-store"></span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};