import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper';
import {useSwiperRef} from '../../../../core/hooks';
import {ActorModel} from '../../../../core/interfaces';

interface Data {
	title: string;
	actors: ActorModel[];
}

export const ActorCarouselSlider = ({title, actors}: Data) => {
	// custom hooks
	const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
	const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();

	const renderSlides = () => {
		return actors.map((actor) => (
			<SwiperSlide key={actor.id}>
				<div className='actor-carousel__item'>
					<div className='actor-card'>
						<div
							className='actor-card__img'
							style={{backgroundImage: `url(${actor.avatar.url})`}}
						></div>
						{/* TODO: removed <br/>, check after receiving data from API*/}
						<div className='actor-card__name'>{actor.name}</div>
						<a href='#' className='actor-card__link'></a>
					</div>
				</div>
			</SwiperSlide>
		));
	};

	return (
		<section className='actor-carousel'>
			<div className='container-fluid'>
				<div className='actor-carousel__header'>
					<h2 className='actor-carousel__title'>{title}</h2>
				</div>
			</div>
			<Swiper
				className='actor-carousel__swiper container-fluid actorCarousel'
				modules={[Navigation]}
				slidesPerView={6}
				spaceBetween={12}
				watchSlidesProgress
				navigation={{nextEl, prevEl}}
				breakpoints={{
					0: {
						slidesPerView: 2,
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
			>
				{renderSlides()}
				<button ref={prevElRef} className='actor-carousel__nav_prev swiper-button-prev'></button>
				<button ref={nextElRef} className='actor-carousel__nav_next swiper-button-next'></button>
			</Swiper>
		</section>
	);
};
