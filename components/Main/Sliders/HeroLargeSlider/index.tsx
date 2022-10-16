import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade} from 'swiper';
import {MovieModal} from '../../Modals/MovieModal';
import LightGallery from 'lightgallery/react';
import lgVideo from 'lightgallery/plugins/video';
import {MovieModel} from '../../../../core/models';
import Link from 'next/link';

interface HeroLargeSliderProps {
	list: MovieModel[];
}

export const HeroLargeSlider = ({list}: HeroLargeSliderProps) => {
	const renderSlides = () => {
		return list.map((movie) => (
			<SwiperSlide className='movie-slider__item' key={movie.id}>
				<div
					className='movie-slider__img'
					style={{backgroundImage: `url("${movie.poster?.url}")`}}
				></div>
				<div className='movie-slider__container container-fluid'>
					<div className='movie-slider__text'>
						<h2 className='movie-slider__name'>{movie.title}</h2>
						<div className='movie-slider__desc'>{movie.description}</div>
						<div className='movie-slider__btns'>
							{/* TODO: URGENT NEED TO REPLACE 'movies' with 'movies.categories.slug' */}
							<Link href={`/movies/${movie.slug}`}>
								<a className='btn btn-primary btn-icon rounded-pill'>
									смотреть<span className='icon icon-play_circle'></span>
								</a>
							</Link>
							<MovieModal buttonIcon='icon-info' movie={movie} />
						</div>
					</div>
					<div className='movie-slider__movie-trailer lg-video-gallery'>
						<LightGallery
							licenseKey={process.env.NEXT_PUBLIC_LIGHT_GALLERY_KEY}
							plugins={[lgVideo]}
							mode='lg-fade'
						>
							<a
								className='btn btn-icon rounded-pill'
								data-lg-size='1280-720'
								data-video={`{"source": [{"src":"${movie.trailer?.url}", "type":"video/mp4"}], "attributes": {"preload": false, "playsinline": true}}`}
								data-poster={movie.poster?.url}
							>
								Трейлер<span className='icon icon-play_circle'></span>
							</a>
						</LightGallery>
					</div>
				</div>
			</SwiperSlide>
		));
	};

	return (
		<section className='movie-slider margin-under-header'>
			<Swiper
				modules={[Autoplay, EffectFade]}
				effect='fade'
				speed={1000}
				fadeEffect={{crossFade: true}}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				className='movie-slider__swiper movieSlider'
			>
				{renderSlides()}
			</Swiper>
		</section>
	);
};
