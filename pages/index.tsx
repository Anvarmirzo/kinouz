import type {NextPage} from 'next'
import Head from 'next/head'
import {Footer, Header, MovieModal} from '../components/Main'
import Image from 'next/image';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade} from 'swiper';
import {MovieSlider} from '../components/Home';
import {movieSlides} from '../fake-data';


const sliders = [
    {
        title: 'Фильмы',
        slides: movieSlides
    },
    {
        title: 'Сериалы',
        slides: movieSlides
    },
    {
        title: 'Шоу',
        slides: movieSlides
    },
    {
        title: 'Мультфильмы',
        slides: movieSlides
    },
    {
        title: 'Аниме',
        slides: movieSlides
    }
]

const Home: NextPage = () => {
    const renderSliders = () => {
        return sliders.map((slider, index) => {
            return <MovieSlider key={index} title={slider.title} slides={slider.slides}/>
        })
    }

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
                {renderSliders()}
            </main>
            <Footer/>
        </div>
    )
}

export default Home
