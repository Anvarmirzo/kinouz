import React, {MouseEvent} from 'react';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper';
import Link from 'next/link';
import cn from 'classnames';
import Image from 'next/image';
import {useSwiperRef} from '../../../../core/hooks';
import {MovieModel} from '../../../../core/models';
import {Player} from '../../Player';
import {AddToFavoritesBtn} from '../../Buttons/AddToFavoritesBtn';
import {MovieModal} from '../../Modals/MovieModal';

interface MovieSliderProps extends SwiperProps {
	list: MovieModel[];
	title: string;
	loadMoreCb: () => void;
}

export const MovieSlider = ({title, list, loadMoreCb, ...props}: MovieSliderProps) => {
	// custom hooks
	const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
	const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();
	const [paginationEl, paginationElRef] = useSwiperRef<HTMLDivElement>();

	const onMouseOver = (e: MouseEvent<HTMLDivElement>) => {
		e.currentTarget.querySelector('video')?.play();
	};

	const onMouseOut = (e: MouseEvent<HTMLDivElement>) => {
		e.currentTarget.querySelector('video')?.pause();
	};

	const onSlideChange = (swiper: {isEnd: boolean}) => {
		if (swiper.isEnd) {
			loadMoreCb();
		}
	};

	const renderSlides = () => {
		return list.map((movie, index) => (
			<SwiperSlide className='transform-none' key={movie.id}>
				<div
					onMouseOver={onMouseOver}
					onMouseOut={onMouseOut}
					className={cn('movie-card', {first: index === 0})}
				>
					<div className='movie-card__body'>
						<div className='movie-card__img'>
							<Image
								src={movie.poster?.url ?? ''}
								alt=''
								layout='fill'
								className='movie-card__img'
								crossOrigin='use-credentials'
								unoptimized
								objectFit='cover'
							/>
						</div>
						<div className='movie-card__labels'>
							<div className='movie-card__label bg-primary'>FullHD</div>
							<div className='movie-card__label bg-secondary'>HD</div>
							{movie.isNew && <div className='movie-card__label bg-danger'>NEW</div>}
							{!movie.bySubscription && (
								<div className='movie-card__label bg-orange'>Бесплатно</div>
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
							<Player
								muted
								onMouseOver={(event) => {
									//@ts-ignore
									event.target.play();
								}}
								onMouseOut={(event) => {
									//@ts-ignore
									event.target.pause();
								}}
								wrapperClassName='movie-card-player-wrapper'
								url={movie.trailer?.url ?? ''}
								thumbnail={movie.poster?.url ?? ''}
							/>
						</div>
						<div className='movie-card-more-info__body'>
							<div className='movie-card-more-info__header'>
								<div className='movie-card-more-info__title'>{movie.title}</div>
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
						<a href='#'>{title}</a>
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
				onSlideChange={onSlideChange}
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
