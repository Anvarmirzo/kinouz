import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {CommentModal, Footer, Header, Player} from '../../components/Main';
import {ActorCarouselSlider} from '../../components/Movie';
import {useAppDispatch, useAppSelector} from '../../core/hooks';
import {getMovieThunk} from '../../core/store/movie/movie.thunks';
import {eMovieQuality} from '../../core/models';
import {setCommentsAction} from '../../core/store/comment/comment.slices';
import {setMovieAction} from '../../core/store/movie/movie.slices';

const Movie = () => {
	// next hooks
	const {
		query: {movieSlug},
	} = useRouter();

	// redux hooks
	const dispatch = useAppDispatch();
	const movies = useAppSelector(({movies, comments}) => movies);

	// react hooks
	const [isPlayerVisible, setIsPlayerVisible] = useState(false);
	const [currentQuality, setCurrentQuality] = useState(eMovieQuality.CD);

	useEffect(() => {
		if (movieSlug) {
			dispatch(getMovieThunk(movieSlug as string));
		}

		return () => {
			dispatch(setMovieAction(null));
			dispatch(setCommentsAction({count: 0, list: []}));
		};
	}, [movieSlug]);

	const changeQuality = (quality: typeof currentQuality) => () => {
		if (!currentQuality && movies.current?.file?.qualitiesList[0].quality) {
			setCurrentQuality(movies.current?.file?.qualitiesList[0].quality);
		} else {
			setIsPlayerVisible(false);

			setTimeout(() => {
				setCurrentQuality(quality);
				setIsPlayerVisible(true);
			}, 10);
		}
	};

	const renderQualities = () => {
		return movies.current?.file?.qualitiesList.map((q, index) => (
			<div className='form-check form-check-inline' key={q.file.id}>
				<label
					onClick={changeQuality(q.quality)}
					className='form-check-label'
					htmlFor={`inlineRadio${q.file.id}`}
				>
					<input
						className='form-check-input'
						type='radio'
						name='inlineRadioOptions'
						id={`inlineRadio${q.file.id}`}
						defaultChecked={!index}
					/>
					{q.quality.toUpperCase()}
				</label>
			</div>
		));
	};

	return (
		<div>
			<Head>
				<title>{movies.current?.title ?? ''} | KinoUZ</title>
			</Head>
			<Header />
			<main className='content'>
				{movies.current ? (
					<>
						<section className='page-movie-card margin-under-header'>
							<div
								className='page-movie-card__img'
								style={{
									backgroundImage: `url(${movies.current.poster?.url})`,
								}}
							/>
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
											{movies.current.year} <span className='text-primary'>I </span>
											{movies.current.categoriesTitle && (
												<>
													{movies.current.categoriesTitle} <span className='text-primary'>I </span>
												</>
											)}
											{movies.current.countriesTitle && (
												<>
													{movies.current.countriesTitle} <span className='text-primary'>I</span>{' '}
													145 минут <span className='text-primary'>I </span>
												</>
											)}
											<span className='text-primary'>{movies.current.ageRemark}+</span>
										</div>
										<div className='page-movie-card__btns'>
											<button
												onClick={() => setIsPlayerVisible((prev) => !prev)}
												className='btn btn-primary btn-icon rounded-pill'
												type='button'
											>
												смотреть<span className='icon icon-play_circle'></span>
											</button>
											<CommentModal movieId={movies.current.id} />
											<button className='btn btn-secondary btn-bookmark rounded-pill' type='button'>
												<span className='icon icon-bookmark_border'></span>
											</button>
										</div>
										<div className='page-movie-card__quality'>{renderQualities()}</div>
									</div>
									<div className='col-12 col-lg-6 mb-5'>
										<div className='page-movie-card__description'>
											<div className='page-movie-card__description-title'>Описание:</div>
											<p>{movies.current.description}</p>
										</div>
									</div>
								</div>
							</div>
						</section>
						{isPlayerVisible && (
							<div className='movie-slug-player container-fluid mb-5'>
								<Player
									thumbnail={movies.current.poster?.url}
									url={movies.current.file?.[currentQuality]?.url ?? ''}
								/>
							</div>
						)}
					</>
				) : null}
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
