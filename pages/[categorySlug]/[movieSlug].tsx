import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {AddToFavoritesBtn, CommentModal, Footer, Header, Player} from '../../components/Main';
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
	const currentMovie = useAppSelector(({movies}) => movies.current);

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
		if (!currentQuality && currentMovie && currentMovie.file?.qualitiesList[0].quality) {
			setCurrentQuality(currentMovie.file?.qualitiesList[0].quality);
		} else {
			setIsPlayerVisible(false);

			setTimeout(() => {
				setCurrentQuality(quality);
				setIsPlayerVisible(true);
			}, 10);
		}
	};

	const renderQualities = () => {
		if (currentMovie) {
			return currentMovie.file?.qualitiesList.map((q, index) => (
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
		}
	};

	if (!currentMovie) return null;

	return (
		<div>
			<Head>
				<title>{currentMovie.title ?? ''} | KinoUZ</title>
			</Head>
			<Header />
			<main className='content'>
				<section className='page-movie-card margin-under-header'>
					<div
						className='page-movie-card__img'
						style={{
							backgroundImage: `url(${currentMovie.poster?.url})`,
						}}
					/>
					<div className='page-movie-card__container container-fluid'>
						<div className='page-movie-card__text row w-100'>
							<div className='col-12 col-lg-6 mb-5'>
								<h1 className='page-movie-card__title'>{currentMovie.title}</h1>
								<div className='page-movie-card__ratings'>
									<div className='page-movie-card__rating'>
										<span className='icon icon-imdb'></span>
										{currentMovie.imdb}
									</div>
									<div className='page-movie-card__rating'>
										<span className='icon icon-kinopoisk'></span>
										{currentMovie.rating}
									</div>
								</div>
								<div className='page-movie-card__info'>
									{currentMovie.year} <span className='text-primary'>I </span>
									{currentMovie.categoriesTitle && (
										<>
											{currentMovie.categoriesTitle} <span className='text-primary'>I </span>
										</>
									)}
									{currentMovie.countriesTitle && (
										<>
											{currentMovie.countriesTitle} <span className='text-primary'>I </span>
										</>
									)}
									<span className='text-primary'>{currentMovie.ageRemark}+</span>
								</div>
								<div className='page-movie-card__btns'>
									<button
										onClick={() => setIsPlayerVisible((prev) => !prev)}
										className='btn btn-primary btn-icon rounded-pill'
										type='button'
									>
										смотреть<span className='icon icon-play_circle'></span>
									</button>
									<CommentModal movieId={currentMovie.id} />
									<AddToFavoritesBtn
										movieId={currentMovie.id}
										className='btn-secondary rounded-pill'
									/>
								</div>
								<div className='page-movie-card__quality'>{renderQualities()}</div>
							</div>
							<div className='col-12 col-lg-6 mb-5'>
								<div className='page-movie-card__description'>
									<div className='page-movie-card__description-title'>Описание:</div>
									<p>{currentMovie.description}</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				{isPlayerVisible && (
					<div className='movie-slug-player container-fluid mb-5'>
						<Player
							thumbnail={currentMovie.poster?.url}
							url={currentMovie.file?.[currentQuality]?.url ?? ''}
						/>
					</div>
				)}
				{currentMovie ? (
					<ActorCarouselSlider actors={currentMovie.actors ?? []} title='В ролях' />
				) : null}
				{/*<MovieSlider list={movieSlides} title='Коллекция:' />*/}
				{/*<MovieSlider list={movieSlides} title='Похожие:' />*/}
			</main>
			<Footer />
		</div>
	);
};
export default Movie;
