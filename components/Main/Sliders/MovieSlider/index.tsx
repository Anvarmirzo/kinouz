import React from 'react';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper';
import {useSwiperRef} from '../../../../core/hooks';
import {MovieModel} from '../../../../core/models';
import Link from 'next/link';
import {Player} from '../../Player';
import {AddToFavoritesBtn} from '../../Buttons/AddToFavoritesBtn';
import {MovieModal} from '../../Modals/MovieModal';

interface MovieSliderProps extends SwiperProps {
	list: MovieModel[];
	title: string;
}

export const MovieSlider = ({title, list, ...props}: MovieSliderProps) => {
	// custom hooks
	const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
	const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();
	const [paginationEl, paginationElRef] = useSwiperRef<HTMLDivElement>();

	const renderSlides = () => {
		return list.map((movie) => (
			<SwiperSlide className='transform-none' key={movie.id}>
				<div className='movie-card'>
					<div className='movie-card__body'>
						<div
							className='movie-card__img'
							style={{backgroundImage: `url('${movie.poster?.url ?? ''}')`}}
						></div>
						<div className='movie-card__labels'>
							<div className='movie-card__label bg-primary'>FullHD</div>
							<div className='movie-card__label bg-secondary'>HD</div>
							{movie.isNew && <div className='movie-card__label bg-danger'>NEW</div>}
							{!movie.bySubscription && (
								<div className='movie-card__label bg-success'>БЕСПЛАТНО</div>
							)}
						</div>
						<div className='movie-card__ratings'>
							<div className='movie-card__rating'>
								<span className='icon icon-imdb'></span>
								{movie.imdb}
							</div>
							<div className='movie-card__rating'>
								<span className='icon icon-kinopoisk'></span>
								{movie.rating}
							</div>
						</div>
					</div>
					<div className='movie-card__name'>{movie.title}</div>
					<a href='#' className='movie-card__link'></a>
					<div className='movie-card__more-info movie-card-more-info'>
						<div className='movie-card-more-info__video'>
							<Player url={movie.trailer?.url ?? ''} thumbnail={movie.poster?.url ?? ''} />
						</div>
						<div className='movie-card-more-info__body'>
							<div className='movie-card-more-info__header'>
								<div className='movie-card-more-info__title'>{movie.title}</div>
								<AddToFavoritesBtn movieId={movie.id} className='movie-card-more-info__bookmark' />
							</div>
							<div className='movie-card-more-info__desc'>
								<div className='movie-card-more-info__ratings'>
									<div className='movie-card-more-info__rating'>
										<span className='icon icon-imdb'></span>
										{movie.imdb}
									</div>
									<div className='movie-card-more-info__rating'>
										<span className='icon icon-kinopoisk'></span>
										{movie.rating}
									</div>
								</div>
								<div className='movie-card-more-info__info'>
									{movie.year} <span className='text-primary'>I </span>
									{movie.categoriesTitle && (
										<>
											{movie.categoriesTitle} <span className='text-primary'>I </span>
										</>
									)}
									{movie.countriesTitle && (
										<>
											{movie.countriesTitle} <span className='text-primary'>I </span>
											<span className='text-primary'>I </span>
										</>
									)}
									<span className='text-primary'>{movie.ageRemark}+</span>
								</div>
								<div className='movie-card-more-info__btns'>
									<MovieModal movie={movie} buttonIcon='icon-library_books' />
									<Link href={`/movies/${movie.slug}`}>
										<a className='btn btn-primary btn-icon rounded-pill'>
											смотреть<span className='icon icon-play_circle'></span>
										</a>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</SwiperSlide>
		));
	};

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
