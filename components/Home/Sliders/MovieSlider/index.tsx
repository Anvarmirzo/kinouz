import React, {useEffect, useRef, useState} from 'react';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper';

interface MovieSliderProps extends SwiperProps {
    slides: {
        img: string,
        rating: {
            imdb: string | number,
            kinopoisk: string | number,
        }
        movieName: string,
        video: {
            src: string;
            poster: string;
        }
    }[]
    title: string
}

export const MovieSlider = ({title, slides, ...props}: MovieSliderProps) => {
    // custom hooks
    const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>()
    const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>()
    const [paginationEl, paginationElRef] = useSwiperRef<HTMLDivElement>()

    const renderSlides = () => {
        return slides.map((slide, index) => (
            <SwiperSlide key={index}>
                <div className="movie-card">
                    <div className="movie-card__body">
                        <div className="movie-card__img" style={{backgroundImage: `url('${slide.img}')`}}></div>
                        <div className="movie-card__labels">
                            <div className="movie-card__label bg-primary">FullHD</div>
                            <div className="movie-card__label bg-secondary">HD</div>
                            <div className="movie-card__label bg-danger">NEW</div>
                        </div>
                        <div className="movie-card__ratings">
                            <div className="movie-card__rating">
                                <span className="icon icon-imdb"></span>{slide.rating.imdb}
                            </div>
                            <div className="movie-card__rating">
                                <span className="icon icon-kinopoisk"></span>{slide.rating.kinopoisk}
                            </div>
                        </div>
                    </div>
                    <div className="movie-card__name">{slide.movieName}</div>
                    <a href="#" className="movie-card__link"></a>
                    <div className="movie-card__more-info movie-card-more-info">
                        <div className="movie-card-more-info__video">
                            <video className="video-js" controls preload="false"
                                   poster={slide.video.poster} data-setup="{}">
                                <source src={slide.video.src} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="movie-card-more-info__body">
                            <div className="movie-card-more-info__header">
                                <div className="movie-card-more-info__title">{slide.movieName}</div>
                                <button
                                    className="movie-card-more-info__bookmark btn btn-bookmark"
                                    type="button"
                                    data-bs-toggle="tooltip" data-bs-placement="right"
                                    title="добавить в «моя подборка»"
                                >
                                    <span className="icon icon-bookmark_border"></span>
                                </button>
                            </div>
                            <div className="movie-card-more-info__desc">
                                <div className="movie-card-more-info__ratings">
                                    <div className="movie-card-more-info__rating"><span
                                        className="icon icon-imdb"></span>{slide.rating.imdb}
                                    </div>
                                    <div className="movie-card-more-info__rating"><span
                                        className="icon icon-kinopoisk"></span>{slide.rating.kinopoisk}
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
        ))
    }

    return (
        <section className="movie-carousel">
            <div className="container-fluid">
                <div className="movie-carousel__header">
                    <h2 className="movie-carousel__title"><a href="#">{title}</a></h2>
                    <a href="#" className="movie-carousel__title-info"><span
                        className="icon icon-pending"></span></a>
                </div>
            </div>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={6}
                spaceBetween={12}
                watchSlidesProgress
                navigation={{prevEl, nextEl}}
                pagination={
                    {
                        el: paginationEl,
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
                {...props}
            >
                {renderSlides()}
                <div ref={paginationElRef} className="movie-carousel__pagination swiper-pagination"></div>
                <button ref={prevElRef} className="movie-carousel__nav_prev swiper-button-prev"></button>
                <button ref={nextElRef} className="movie-carousel__nav_next swiper-button-next"></button>
            </Swiper>
        </section>
    );
};

const useSwiperRef = <T extends HTMLElement>(): [T | null, React.Ref<T>] => {
    // react hooks
    const [wrapper, setWrapper] = useState<T | null>(null)
    const ref = useRef<T>(null)

    useEffect(() => {
        if (ref.current) {
            setWrapper(ref.current)
        }
    }, [])

    return [wrapper, ref]
}