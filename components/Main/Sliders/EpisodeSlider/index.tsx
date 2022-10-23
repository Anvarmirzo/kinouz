import React, {Dispatch, SetStateAction} from 'react';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper';
import {useSwiperRef} from '../../../../core/hooks';
import {EpisodeModel} from '../../../../core/models';
import cn from 'classnames';
import Image from 'next/image';

interface MovieSliderProps extends SwiperProps {
	list: EpisodeModel[];
	title: string;
	seasonNumber: number;
	posterUrl?: string;
	setCurrentUrl: Dispatch<SetStateAction<string>>;
}

export const EpisodeSlider = ({
	title,
	setCurrentUrl,
	seasonNumber,
	posterUrl,
	list,
	...props
}: MovieSliderProps) => {
	// custom hooks
	const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
	const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();
	const [paginationEl, paginationElRef] = useSwiperRef<HTMLDivElement>();

	const onSetUrl = (url: string) => () => {
		setCurrentUrl('');
		setTimeout(() => {
			setCurrentUrl(url);
		}, 10);
	};

	const renderSlides = () => {
		return list.map((movie, index) => (
			<SwiperSlide className='transform-none' key={movie.id}>
				<div className={cn('movie-card', {first: index === 0})}>
					<div className='movie-card__body'>
						<div className='movie-card__img'>
							<Image
								src={posterUrl ?? ''}
								alt=''
								layout='fill'
								className='movie-card__img'
								crossOrigin='use-credentials'
								unoptimized
								objectFit='cover'
							/>
						</div>
						<div className='movie-card__labels'>
							<div className='movie-card__label bg-primary'>Просмотрено</div>
						</div>
					</div>
					<div className='movie-card__name'>
						{seasonNumber} Сезон {movie.episode} Серия
					</div>
					<a
						href='javascript:void(0)'
						onClick={onSetUrl(movie.file.url)}
						className='movie-card__link'
					></a>
				</div>
			</SwiperSlide>
		));
	};

	// TODO: duplicate
	return (
		<section className='movie-carousel'>
			<div className='container-fluid'>
				<div className='movie-carousel__header'>
					<h2 className='movie-carousel__title'>
						<a href='components/Main/Sliders/MovieSlider/index#'>{title}</a>
					</h2>
					<a href='#' className='movie-carousel__title-info'>
						<span className='icon icon-pending'></span>
					</a>
				</div>
			</div>
			<Swiper
				modules={[Navigation, Pagination]}
				slidesPerView={6}
				spaceBetween={12}
				watchSlidesProgress
				navigation={{prevEl, nextEl}}
				pagination={{
					el: paginationEl,
					clickable: true,
					renderBullet: (index, className) => {
						return '<span class="' + className + '">' + '</span>';
					},
				}}
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
						slidesPerView: 4,
					},
					1300: {
						slidesPerView: 5,
					},
					1600: {
						slidesPerView: 6,
					},
				}}
				className='movie-carousel__swiper container-fluid movieCarousel'
				{...props}
			>
				{renderSlides()}
				<div ref={paginationElRef} className='movie-carousel__pagination swiper-pagination'></div>
				<button
					ref={prevElRef}
					className='movie-carousel__nav_prev swiper-button-prev border-0'
				></button>
				<button
					ref={nextElRef}
					className='movie-carousel__nav_next swiper-button-next border-0'
				></button>
			</Swiper>
		</section>
	);
};
