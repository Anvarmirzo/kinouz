import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {CommentModal, Footer, Header, Player} from '../../components/Main';
import {ActorCarouselSlider} from '../../components/Movie';
import {useAppDispatch, useAppSelector} from '../../core/hooks';
import {getMovieThunk} from '../../core/store/movie/movie.thunks';

const Movie = () => {
	// next hooks
	const {
		query: {movieSlug},
	} = useRouter();

	// redux hooks
	const dispatch = useAppDispatch();
	const movies = useAppSelector(({movies}) => movies);

	// react hooks
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (movieSlug) {
			dispatch(getMovieThunk(+movieSlug));
		}
	}, [movieSlug]);

	return (
		<div>
			<Head>
				<title>{movies.current?.title ?? ''} | KinoUZ</title>
			</Head>
			<Header />
			<main className='content'>
				<section className='page-movie-card margin-under-header'>
					{movies.current ? (
						<>
							<div
								className='page-movie-card__img'
								style={{
									backgroundImage: `url(${
										movies.current.poster?.url ||
										process.env.NEXT_PUBLIC_API_URL + (movies.current.file?.cd?.url || '')
									})`,
								}}
							></div>
							<div className='page-movie-card__container container-fluid'>
								<div className='page-movie-card__text row w-100'>
									<div className='col-12 col-lg-6 mb-5'>
										<h1 className='page-movie-card__title'>{movies.current.title}</h1>
										<div className='page-movie-card__ratings'>
											<div className='page-movie-card__rating'>
												<span className='icon icon-imdb'></span>
												{movies.current.imdb}
											</div>
											<div className='page-movie-card__rating'>
												<span className='icon icon-kinopoisk'></span>
												{movies.current.rating}
											</div>
										</div>
										<div className='page-movie-card__info'>
											{movies.current.year} <span className='text-primary'>I</span> фантастика,
											боевик <span className='text-primary'>I</span> {movies.current.countriesTitle}{' '}
											<span className='text-primary'>I</span> 145 минут{' '}
											<span className='text-primary'>I</span>{' '}
											<span className='text-primary'>{movies.current.ageRemark}+</span>
										</div>
										<div className='page-movie-card__btns'>
											<Player
												isPlaying={isPlaying}
												thumbnail={movies.current.poster?.url}
												url={movies.current.file?.cd?.url ?? ''}
											/>
											<button
												onClick={() => setIsPlaying((prev) => !prev)}
												className='btn btn-primary btn-icon rounded-pill'
												type='button'
											>
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
											<p>{movies.current.description}</p>
										</div>
									</div>
								</div>
							</div>
						</>
					) : (
						''
					)}
				</section>
				{movies.current ? (
					<ActorCarouselSlider actors={movies.current.actors ?? []} title='В ролях' />
				) : null}
				{/*<MovieSlider list={movieSlides} title='Коллекция:' />*/}
				{/*<MovieSlider list={movieSlides} title='Похожие:' />*/}
			</main>
			<Footer />
		</div>
	);
};
export default Movie;
