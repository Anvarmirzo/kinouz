import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade} from 'swiper';
import Image from 'next/image';
import {MovieModal} from '../../Modals/MovieModal';

interface HeroMovieSlidersProps {

}

export const HeroMovieSliders = (props: HeroMovieSlidersProps) => {
    return (
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
                         style={{backgroundImage: 'url("/img/dist/main-slider-img.jpg")'}}></div>
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
                                <MovieModal movie={{
                                    rating: {
                                        imdb: 7.2,
                                        kinopoisk: 6.8,
                                    },
                                    title: 'Название фильма',
                                    video: {poster: 'img/dist/main-slider-img.jpg', src: 'video/dune.mp4'}
                                }}/>
                            </div>
                        </div>
                        <div className="movie-slider__movie-trailer lg-video-gallery">
                            <button className="btn btn-icon rounded-pill" type="button" data-lg-size="1280-720"
                                    data-video='{"source": [{"src":"./video/dune.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "playsinline": true}}'
                                    data-poster="/img/dist/main-slider-img.jpg">Трейлер<span
                                className="icon icon-play_circle"></span></button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="movie-slider__item">
                    <div className="movie-slider__img"
                         style={{backgroundImage: 'url(\'/img/dist/main-slider-img2.jpg\')'}}></div>
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
                                <MovieModal movie={{
                                    rating: {
                                        imdb: 7.2,
                                        kinopoisk: 6.8,
                                    },
                                    title: 'Название фильма',
                                    video: {poster: 'img/dist/main-slider-img2.jpg', src: 'video/uncharted.mp4'}
                                }}/>
                            </div>
                        </div>
                        <div className="movie-slider__movie-trailer lg-video-gallery">
                            <a className="btn btn-icon rounded-pill" data-lg-size="1280-720"
                               data-video='{"source": [{"src":"./video/uncharted.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "playsinline": true}}'
                               data-poster="/img/dist/main-slider-img2.jpg">Трейлер<span
                                className="icon icon-play_circle"></span></a>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};