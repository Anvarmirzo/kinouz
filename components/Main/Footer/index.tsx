import React from 'react';
import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container container-fluid">
                <div className="footer__info">
                    <div className="footer__logo">
                        <Image src="/img/dist/logo.png" alt="logo" width={156} height={32}/>
                    </div>
                    <div className="footer__copy">© 2003 — 2022 <span>I</span> kinouz.uz</div>
                </div>
                <div className="footer__menu footer-menu">
                    <ul className="footer-menu__list">
                        <li className="footer-menu__item"><a href="#" className="footer-menu__link"><span
                            className="icon icon-account_balance_wallet"></span>Подписка и оплата</a></li>
                        <li className="footer-menu__item"><a href="#" className="footer-menu__link"><span
                            className="icon icon-ondemand_video"></span>Устройства</a></li>
                        <li className="footer-menu__item"><a href="#" className="footer-menu__link"><span
                            className="icon icon-portrait"></span>Профиль</a></li>
                        <li className="footer-menu__item"><a href="#" className="footer-menu__link"><span
                            className="icon icon-logout"></span>Выйти из учетной записи</a></li>
                    </ul>
                </div>
                <div className="footer__mobile-app mobile-app">
                    <ul className="mobile-app__list">
                        <li className="mobile-app__item">
                            <a href="#" className="mobile-app__link btn"><span className="icon icon-google-play"></span></a>
                        </li>
                        <li className="mobile-app__item">
                            <a href="#" className="mobile-app__link btn"><span
                                className="icon icon-app-store"></span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};