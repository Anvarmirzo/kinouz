import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper';
import {useSwiperRef} from '../../../../hooks';

interface Data {
	title: string;
	slides: {
		name: string;
		img: string;
	}[];
}

export const ActorCarouselSlider = ({title, slides}: Data) => {
	// custom hooks
	const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
	const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();

	const renderSlides = () => {
		// TODO: change key from index to id
		return slides.map((slide, index) => (
			<SwiperSlide key={index}>
				<div className='actor-carousel__item'>
					<div className='actor-card'>
						<div className='actor-card__img' style={{backgroundImage: `url(${slide.img})`}}></div>
						{/* TODO: removed <br/>, check after receiving data from API*/}
						<div className='actor-card__name'>{title}</div>
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
