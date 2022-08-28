import React from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {CommentModal, Footer, Header} from '../../components/Main';
import {ActorCarouselSlider} from '../../components/Movie';
import {MovieSlider} from '../../components/Main';
import {movieSlides} from '../../fake-data';

const actorSlides = [
	{name: 'Имя актера', img: '/img/dist/actor-carousel-img1.jpg'},
	{name: 'Имя актера', img: '/img/dist/actor-carousel-img2.jpg'},
	{name: 'Имя актера', img: '/img/dist/actor-carousel-img3.jpg'},
	{name: 'Имя актера', img: '/img/dist/actor-carousel-img4.jpg'},
	{name: 'Имя актера', img: '/img/dist/actor-carousel-img5.jpg'},
	{name: 'Имя актера', img: '/img/dist/actor-carousel-img6.jpg'},
];

const Movie = () => {
	const {
		query: {movieId},
	} = useRouter();
	return (
		<div>
			<Head>
				<title>Dune | KinoUZ</title>
			</Head>
			<Header />
			<main className='content'>
				<section className='page-movie-card margin-under-header'>
					<div
						className='page-movie-card__img'
						style={{backgroundImage: 'url("/img/dist/page-movie-img.jpg")'}}
					></div>
					<div className='page-movie-card__container container-fluid'>
						<div className='page-movie-card__text row'>
							<div className='col-12 col-lg-6 mb-5'>
								<h1 className='page-movie-card__title'>Дюна</h1>
								<div className='page-movie-card__ratings'>
									<div className='page-movie-card__rating'>
										<span className='icon icon-imdb'></span>7.2
									</div>
									<div className='page-movie-card__rating'>
										<span className='icon icon-kinopoisk'></span>6.8
									</div>
								</div>
								<div className='page-movie-card__info'>
									2021 <span className='text-primary'>I</span> фантастика, боевик{' '}
									<span className='text-primary'>I</span> США{' '}
									<span className='text-primary'>I</span> 145 минут{' '}
									<span className='text-primary'>I</span> <span className='text-primary'>16+</span>
								</div>
								<div className='page-movie-card__btns'>
									<button className='btn btn-primary btn-icon rounded-pill' type='button'>
										смотреть<span className='icon icon-play_circle'></span>
									</button>
									<CommentModal />
									<button className='btn btn-secondary btn-bookmark rounded-pill' type='button'>
										<span className='icon icon-bookmark_border'></span>
									</button>
								</div>
								<div className='page-movie-card__quality'>
									<div className='form-check form-check-inline'>
										<input
											className='form-check-input'
											type='radio'
											name='inlineRadioOptions'
											id='inlineRadio1'
											value='option1'
										/>
										<label className='form-check-label' htmlFor='inlineRadio1'>
											CD
										</label>
									</div>
									<div className='form-check form-check-inline'>
										<input
											className='form-check-input'
											type='radio'
											name='inlineRadioOptions'
											id='inlineRadio2'
											value='option2'
										/>
										<label className='form-check-label' htmlFor='inlineRadio2'>
											HD
										</label>
									</div>
									<div className='form-check form-check-inline'>
										<input
											className='form-check-input'
											type='radio'
											name='inlineRadioOptions'
											id='inlineRadio3'
											value='option3'
										/>
										<label className='form-check-label' htmlFor='inlineRadio3'>
											FullHD
										</label>
									</div>
									<div className='form-check form-check-inline'>
										<input
											className='form-check-input'
											type='radio'
											name='inlineRadioOptions'
											id='inlineRadio4'
											value='option4'
										/>
										<label className='form-check-label' htmlFor='inlineRadio4'>
											UHD4k
										</label>
									</div>
								</div>
							</div>
							<div className='col-12 col-lg-6 mb-5'>
								<div className='page-movie-card__description'>
									<div className='page-movie-card__description-title'>Описание:</div>
									<p>
										Человечество расселилось по далёким планетам, а за власть над обитаемым
										пространством постоянно борются разные могущественные семьи. В центре
										противостояния оказывается пустынная планета Арракис. Там обитают гигантские
										песчаные черви, а в пещерах затаились скитальцы-фремены, но её главная ценность
										— пряность, самое важное вещество во Вселенной. Тот, кто контролирует Арракис,
										контролирует пряность, а тот, кто контролирует пряность, контролирует Вселенную.
										В центре противостояния оказывается пустынная планета Арракис. Там обитают
										гигантские песчаные черви, а в пещерах затаились скитальцы-фремены, но её
										главная ценность — пряность, самое важное вещество во Вселенной. Тот, кто
										контролирует Арракис, контролирует пряность, а тот, кто контролирует пряность,
										контролирует Вселенную.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<ActorCarouselSlider slides={actorSlides} title='В ролях' />
				<MovieSlider slides={movieSlides} title='Коллекция:' />
				<MovieSlider slides={movieSlides} title='Похожие:' />
			</main>
			<Footer />
		</div>
	);
};
export default Movie;
