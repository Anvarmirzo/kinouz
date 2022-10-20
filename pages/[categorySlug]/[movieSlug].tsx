import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {AddToFavoritesBtn, CommentModal, Footer, Header, Player} from '../../components/Main';
import {ParticipantCarouselSlider} from '../../components/Movie';
import {useAppDispatch, useAppSelector} from '../../core/hooks';
import {getMovieThunk} from '../../core/store/movie/movie.thunks';
import {eMovieQuality} from '../../core/models';
import {setCommentsAction} from '../../core/store/comment/comment.slices';
import {setMovieAction} from '../../core/store/movie/movie.slices';
import {setIsShownModalAction} from '../../core/store/globalUI/globalUI.slices';
import Image from 'next/image';

const Movie = () => {
	// redux hooks
	const dispatch = useAppDispatch();
	const [currentMovie, user] = useAppSelector(({movies, auth}) => [movies.current, auth.user]);

	// next hooks
	const {
		query: {movieSlug},
	} = useRouter();

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
		if (user) {
			if (!currentQuality && currentMovie && currentMovie.file?.qualitiesList[0].quality) {
				setCurrentQuality(currentMovie.file?.qualitiesList[0].quality);
			} else {
				setIsPlayerVisible(false);

				setTimeout(() => {
					setCurrentQuality(quality);
					setIsPlayerVisible(true);
				}, 10);
			}
		} else {
			dispatch(setIsShownModalAction({modalName: 'login', flag: true}));
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

	const togglePlayerVisibility = () => {
		if (user) {
			setIsPlayerVisible((prev) => !prev);
		} else {
			dispatch(setIsShownModalAction({modalName: 'login', flag: true}));
		}
	};

	if (!currentMovie) return null;

	return (
		<div>
			<Head>
				<title>{currentMovie.title ?? ''} | KinoUZ</title>
				<meta name='description' content='KINOUZ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='msapplication-TileColor' content='#040724' />
				<meta name='msapplication-config' content='img/favicon/browserconfig.xml' />
				<meta name='theme-color' content='#040724' />
				<link rel='apple-touch-icon' sizes='180x180' href='/img/favicon/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/img/favicon/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/img/favicon/favicon-16x16.png' />
				<link rel='manifest' href='/img/favicon/site.webmanifest' />
				<link rel='mask-icon' href='/img/favicon/safari-pinned-tab.svg' color='#040724' />
				<link rel='shortcut icon' href='/img/favicon/favicon.ico' />
			</Head>
			<Header />
			<main className='content'>
				<section className='page-movie-card margin-under-header'>
					<Image
						src={currentMovie.poster?.url ?? ''}
						alt=''
						layout='fill'
						className='page-movie-card__img'
						crossOrigin='use-credentials'
						unoptimized={true}
						objectFit='cover'
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
										onClick={togglePlayerVisibility}
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
				{currentMovie?.actors ? (
					<ParticipantCarouselSlider participants={currentMovie.actors} title='В ролях' />
				) : null}
				{currentMovie?.producers ? (
					<ParticipantCarouselSlider participants={currentMovie.producers} title='Продюсеры' />
				) : null}
				{currentMovie?.directors ? (
					<ParticipantCarouselSlider participants={currentMovie.directors} title='Режиссёры' />
				) : null}
			</main>
			<Footer />
		</div>
	);
};
export default Movie;
