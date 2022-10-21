import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade} from 'swiper';
import {MovieModal} from '../../Modals/MovieModal';
import LightGallery from 'lightgallery/react';
import lgVideo from 'lightgallery/plugins/video';
import {MovieModel} from '../../../../core/models';
import Link from 'next/link';
import Image from 'next/image';

interface HeroLargeSliderProps {
	list: MovieModel[];
}

export const PremierSlider = ({list}: HeroLargeSliderProps) => {
	const renderSlides = () => {
		return list.map((movie) => (
			<SwiperSlide className='movie-slider__item' key={movie.id}>
				<Image
					src={movie.posterForPremier?.url ?? movie.poster?.url ?? ''}
					alt=''
					layout='fill'
					objectFit='cover'
					className='movie-slider__img'
					crossOrigin='use-credentials'
					unoptimized={true}
				/>
				<div className='movie-slider__container container-fluid'>
					<div className='movie-slider__text'>
						<h2 className='movie-slider__name'>{movie.title}</h2>
						<div className='movie-slider__desc'>{movie.description}</div>
						<div className='movie-slider__btns'>
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
							download={false}
							licenseKey={process.env.NEXT_PUBLIC_LIGHT_GALLERY_KEY}
							plugins={[lgVideo]}
							mode='lg-fade'
						>
							<a
								className='btn btn-icon rounded-pill'
								data-lg-size='1280-720'
								data-video={`{"source": [{"src":"${movie.trailer?.url}", "type":"video/mp4"}], "attributes": {"preload": false, "crossOrigin":"use-credentials", "playsinline": true}}`}
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
