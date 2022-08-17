import type {NextPage} from 'next'
import Head from 'next/head'
import {Footer, Header} from '../components/Main'
import Image from 'next/image';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade, Navigation, Pagination} from 'swiper';

const Home: NextPage = () => {
    return (
        <div className="app">
            <Head>
                <title>Главная | KinoUz</title>
                <meta name="description" content="KINOUZ"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="msapplication-TileColor" content="#040724"/>
                <meta name="msapplication-config" content="img/favicon/browserconfig.xml"/>
                <meta name="theme-color" content="#040724"/>
                <link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png"/>
                <link rel="manifest" href="img/favicon/site.webmanifest"/>
                <link rel="mask-icon" href="img/favicon/safari-pinned-tab.svg" color="#040724"/>
                <link rel="shortcut icon" href="img/favicon/favicon.ico"/>
            </Head>

            <Header/>
            <main className="content">
                <section className="movie-slider margin-under-header">
                    <Swiper
                        modules={[Autoplay, EffectFade]}
                        effect="fade"
                        speed={1000}
                        fadeEffect={{crossFade: true}}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        className="movie-slider__swiper movieSlider">
                        <SwiperSlide className="movie-slider__item">
                            <div className="movie-slider__img"
                                 style={{backgroundImage: 'url(\'./img/dist/main-slider-img.jpg\')'}}></div>
                            <div className="movie-slider__container container-fluid">
                                <div className="movie-slider__text">
                                    <div className="movie-slider__name">
                                        <Image src="/img/dist/dune-logo.png" alt="logo" width={489} height={47}/>
                                    </div>
                                    <div className="movie-slider__desc">Человечество расселилось по далёким
                                        планетам, <br/>а за
                                        власть над обитаемым пространством постоянно <br/>борются разные
                                        могущественные
                                        семьи. В центре <br/>противостояния оказывается пустынная планета
                                        Арракис.
                                    </div>
                                    <div className="movie-slider__btns">
                                        <a href="movie.html"
                                           className="btn btn-primary btn-icon rounded-pill">смотреть<span
                                            className="icon icon-play_circle"></span></a>
                                        <button className="btn btn-secondary btn-icon rounded-pill"
                                                data-bs-toggle="modal"
                                                data-bs-target="#movieInfoModal-1">подробнее<span
                                            className="icon icon-info"></span></button>
                                    </div>
                                </div>
                                <div className="movie-slider__movie-trailer lg-video-gallery">
                                    <a className="btn btn-icon rounded-pill" type="button" data-lg-size="1280-720"
                                       data-video='{"source": [{"src":"./video/dune.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "playsinline": true}}'
                                       data-poster="./img/dist/main-slider-img.jpg">Трейлер<span
                                        className="icon icon-play_circle"></span></a>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-slider__item">
                            <div className="movie-slider__img"
                                 style={{backgroundImage: 'url(\'./img/dist/main-slider-img2.jpg\')'}}></div>
                            <div className="movie-slider__container container-fluid">
                                <div className="movie-slider__text">
                                    <div className="movie-slider__name">
                                        <Image src="/img/dist/Uncharted_logo.png" alt="logo" width={570} height={133}/>
                                    </div>
                                    <div className="movie-slider__desc">Два искателя приключений Нейтан Дрейк и
                                        Виктор
                                        Салливан
                                        по прозвищу Салли отправляются на поиски величайшего сокровища мира. Кроме
                                        того, они
                                        надеются найти улики, которые приведут их к давно потерянному брату Нейтана.
                                    </div>
                                    <div className="movie-slider__btns">
                                        <a href="#" className="btn btn-primary btn-icon rounded-pill">смотреть<span
                                            className="icon icon-play_circle"></span></a>
                                        <button className="btn btn-secondary btn-icon rounded-pill"
                                                data-bs-toggle="modal"
                                                data-bs-target="#movieInfoModal-2">подробнее<span
                                            className="icon icon-info"></span></button>
                                    </div>
                                </div>
                                <div className="movie-slider__movie-trailer lg-video-gallery">
                                    <a className="btn btn-icon rounded-pill" type="button" data-lg-size="1280-720"
                                       data-video='{"source": [{"src":"./video/uncharted.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "playsinline": true}}'
                                       data-poster="./img/dist/main-slider-img2.jpg">Трейлер<span
                                        className="icon icon-play_circle"></span></a>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </section>

                <section className="movie-carousel">
                    <div className="container-fluid">
                        <div className="movie-carousel__header">
                            <h2 className="movie-carousel__title"><a href="#">Фильмы</a></h2>
                            <a href="#" className="movie-carousel__title-info"><span
                                className="icon icon-pending"></span></a>
                        </div>
                    </div>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={6}
                        spaceBetween={12}
                        watchSlidesProgress
                        navigation={{enabled: true}}
                        pagination={
                            {
                                el: '.movie-carousel__pagination',
                                clickable: true,
                                renderBullet: (index, className) => {
                                    return '<span class="' + className + '">' + '</span>';
                                }
                            }
                        }
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 15,
                            },
                            576: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            992: {
                                slidesPerView: 4
                            },
                            1300: {
                                slidesPerView: 5
                            },
                            1600: {
                                slidesPerView: 6
                            }
                        }}
                        className="movie-carousel__swiper container-fluid movieCarousel"
                    >
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img1.jpg\')'}}></div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма</div>
                                <a href="#" className="movie-card__link"></a>
                                <div className="movie-card__more-info movie-card-more-info">
                                    <div className="movie-card-more-info__video">
                                        <video className="video-js" controls preload="false"
                                               poster="img/dist/main-slider-img.jpg" data-setup="{}">
                                            <source src="video/dune.mp4" type="video/mp4"/>
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className="movie-card-more-info__body">
                                        <div className="movie-card-more-info__header">
                                            <div className="movie-card-more-info__title">Название фильма</div>
                                            <button className="movie-card-more-info__bookmark btn btn-bookmark"
                                                    type="button"
                                                    data-bs-toggle="tooltip" data-bs-placement="right"
                                                    title="добавить в «моя подборка»"><span
                                                className="icon icon-bookmark_border"></span></button>
                                        </div>
                                        <div className="movie-card-more-info__desc">
                                            <div className="movie-card-more-info__ratings">
                                                <div className="movie-card-more-info__rating"><span
                                                    className="icon icon-imdb"></span>7.2
                                                </div>
                                                <div className="movie-card-more-info__rating"><span
                                                    className="icon icon-kinopoisk"></span>6.8
                                                </div>
                                            </div>
                                            <div className="movie-card-more-info__info">2021 <span
                                                className="text-primary">I</span>
                                                фантастика, боевик <span className="text-primary">I</span> США <span
                                                    className="text-primary">I</span> 145 минут <span
                                                    className="text-primary">I</span> <span
                                                    className="text-primary">16+</span>
                                            </div>
                                            <div className="movie-card-more-info__btns">
                                                <button className="btn btn-secondary btn-icon rounded-pill"
                                                        data-bs-toggle="modal" data-bs-target="#movieInfoModal-1">
                                                    подробнее<span className="icon icon-library_books"></span>
                                                </button>
                                                <button
                                                    className="btn btn-primary btn-icon rounded-pill">смотреть<span
                                                    className="icon icon-play_circle"></span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img2.jpg\')'}}></div>
                                    <div className="movie-card__labels">
                                        <div className="movie-card__label bg-primary">FullHD</div>
                                        <div className="movie-card__label bg-secondary">HD</div>
                                        <div className="movie-card__label bg-danger">NEW</div>
                                    </div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма не одну, <br/>а даже в две строки
                                    WoW
                                </div>
                                <a href="#" className="movie-card__link"></a>
                                <div className="movie-card__more-info movie-card-more-info">
                                    <div className="movie-card-more-info__video">
                                        <video className="video-js" controls preload="false"
                                               poster="img/dist/main-slider-img.jpg" data-setup="{}">
                                            <source src="video/dune.mp4" type="video/mp4"/>
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className="movie-card-more-info__body">
                                        <div className="movie-card-more-info__header">
                                            <div className="movie-card-more-info__title">Название фильма</div>
                                            <button className="movie-card-more-info__bookmark btn btn-bookmark"
                                                    type="button"
                                                    data-bs-toggle="tooltip" data-bs-placement="right"
                                                    title="добавить в «моя подборка»"><span
                                                className="icon icon-bookmark_border"></span></button>
                                        </div>
                                        <div className="movie-card-more-info__desc">
                                            <div className="movie-card-more-info__ratings">
                                                <div className="movie-card-more-info__rating"><span
                                                    className="icon icon-imdb"></span>7.2
                                                </div>
                                                <div className="movie-card-more-info__rating"><span
                                                    className="icon icon-kinopoisk"></span>6.8
                                                </div>
                                            </div>
                                            <div className="movie-card-more-info__info">2021 <span
                                                className="text-primary">I</span>
                                                фантастика, боевик <span className="text-primary">I</span> США <span
                                                    className="text-primary">I</span> 145 минут <span
                                                    className="text-primary">I</span> <span
                                                    className="text-primary">16+</span>
                                            </div>
                                            <div className="movie-card-more-info__btns">
                                                <button className="btn btn-secondary btn-icon rounded-pill"
                                                        data-bs-toggle="modal" data-bs-target="#movieInfoModal-1">
                                                    подробнее<span className="icon icon-library_books"></span>
                                                </button>
                                                <button
                                                    className="btn btn-primary btn-icon rounded-pill">смотреть<span
                                                    className="icon icon-play_circle"></span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img3.jpg\')'}}></div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма</div>
                                <a href="#" className="movie-card__link"></a>
                                <div className="movie-card__more-info movie-card-more-info"
                                     id="movieCardMoreInfo-1">
                                    <div className="movie-card-more-info__video">
                                        <video id="movieCardVideo-1" className="video-js" controls preload="false"
                                               poster="img/dist/main-slider-img.jpg" data-setup="{}">
                                            <source src="video/dune.mp4" type="video/mp4"/>
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className="movie-card-more-info__body">
                                        <div className="movie-card-more-info__header">
                                            <div className="movie-card-more-info__title">Название фильма</div>
                                            <button className="movie-card-more-info__bookmark btn btn-bookmark"
                                                    type="button"
                                                    data-bs-toggle="tooltip" data-bs-placement="right"
                                                    title="добавить в «моя подборка»"><span
                                                className="icon icon-bookmark_border"></span></button>
                                        </div>
                                        <div className="movie-card-more-info__desc">
                                            <div className="movie-card-more-info__ratings">
                                                <div className="movie-card-more-info__rating"><span
                                                    className="icon icon-imdb"></span>7.2
                                                </div>
                                                <div className="movie-card-more-info__rating"><span
                                                    className="icon icon-kinopoisk"></span>6.8
                                                </div>
                                            </div>
                                            <div className="movie-card-more-info__info">2021 <span
                                                className="text-primary">I</span>
                                                фантастика, боевик <span className="text-primary">I</span> США <span
                                                    className="text-primary">I</span> 145 минут <span
                                                    className="text-primary">I</span> <span
                                                    className="text-primary">16+</span>
                                            </div>
                                            <div className="movie-card-more-info__btns">
                                                <button className="btn btn-secondary btn-icon rounded-pill"
                                                        data-bs-toggle="modal" data-bs-target="#movieInfoModal-1">
                                                    подробнее<span className="icon icon-library_books"></span>
                                                </button>
                                                <button
                                                    className="btn btn-primary btn-icon rounded-pill">смотреть<span
                                                    className="icon icon-play_circle"></span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img4.jpg\')'}}></div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма</div>
                                <a href="#" className="movie-card__link"></a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img5.jpg\')'}}></div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма</div>
                                <a href="#" className="movie-card__link"></a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img6.jpg\')'}}></div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма</div>
                                <a href="#" className="movie-card__link"></a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img2.jpg\')'}}></div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма не одну, <br/>а даже в две строки
                                    WoW
                                </div>
                                <a href="#" className="movie-card__link"></a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img1.jpg\')'}}></div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма</div>
                                <a href="#" className="movie-card__link"></a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img2.jpg\')'}}></div>
                                    <div className="movie-card__labels">
                                        <div className="movie-card__label bg-primary">FullHD</div>
                                        <div className="movie-card__label bg-secondary">HD</div>
                                        <div className="movie-card__label bg-danger">NEW</div>
                                    </div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма не одну, <br/>а даже в две строки
                                    WoW
                                </div>
                                <a href="#" className="movie-card__link"></a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img3.jpg\')'}}></div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма</div>
                                <a href="#" className="movie-card__link"></a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img4.jpg\')'}}></div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма</div>
                                <a href="#" className="movie-card__link"></a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img5.jpg\')'}}></div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма</div>
                                <a href="#" className="movie-card__link"></a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img6.jpg\')'}}></div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма</div>
                                <a href="#" className="movie-card__link"></a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="movie-carousel__item">
                            <div className="movie-card">
                                <div className="movie-card__body">
                                    <div className="movie-card__img"
                                         style={{backgroundImage: 'url(\'./img/dist/movie-card-img2.jpg\')'}}></div>
                                    <div className="movie-card__ratings">
                                        <div className="movie-card__rating"><span className="icon icon-imdb"></span>7.2
                                        </div>
                                        <div className="movie-card__rating"><span
                                            className="icon icon-kinopoisk"></span>6.8
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-card__name">Название фильма не одну, <br/>а даже в две строки
                                    WoW
                                </div>
                                <a href="#" className="movie-card__link"></a>
                            </div>
                        </SwiperSlide>
                        <div className="movie-carousel__pagination swiper-pagination"></div>
                        <div className="movie-carousel__nav_prev swiper-button-prev"></div>
                        <div className="movie-carousel__nav_next swiper-button-next"></div>
                    </Swiper>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default Home
