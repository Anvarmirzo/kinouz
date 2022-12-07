import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {
	AddToFavoritesBtn,
	CommentModal,
	EpisodeSlider,
	Footer,
	Header,
	LargeLoader,
	Player,
} from '../../components/Main';
import {ParticipantCarouselSlider} from '../../components/Movie';
import {useAppDispatch, useAppSelector} from '../../core/hooks';
import {addMovieToHistoryThunk, getMovieThunk} from '../../core/store/movie/movie.thunks';
import {eMovieQuality, EpisodeModel} from '../../core/models';
import {setCommentsAction} from '../../core/store/comment/comment.slices';
import {setMovieAction} from '../../core/store/movie/movie.slices';
import {setIsShownModalAction} from '../../core/store/globalUI/globalUI.slices';
import Image from 'next/image';
import {Button} from 'react-bootstrap';
import {getCommentsThunk} from '../../core/store/comment/comment.thunks';
import cn from 'classnames';

const Movie = () => {
	// redux hooks
	const dispatch = useAppDispatch();
	const [currentMovie, user, commentsCount, isCommentModalShown] = useAppSelector(
		({globalUI, movies, auth, comments}) => [
			movies.current,
			auth.user,
			comments.count,
			globalUI.modals.comment.isShown,
		]
	);

	// next hooks
	const {
		query: {movieSlug},
	} = useRouter();

	// react hooks
	const playerRef = useRef<HTMLVideoElement | null>(null);

	const [isPlayerVisible, setIsPlayerVisible] = useState(false);
	const [currentQuality, setCurrentQuality] = useState(eMovieQuality.CD);
	const [currentEpisode, setCurrentEpisode] = useState<undefined | EpisodeModel>(undefined);
	const [hasVideosAround, setHasVideosAround] = useState({prev: false, next: false});
	const [currentUrl, setCurrentUrl] = useState('');

	useEffect(() => {
		if (movieSlug) {
			const promise = dispatch(getMovieThunk(movieSlug as string));

			return () => {
				promise.abort();
				dispatch(setMovieAction(null));
				dispatch(setCommentsAction(null));
			};
		}
	}, [movieSlug]);

	useEffect(() => {
		if (currentMovie?.id) {
			dispatch(getCommentsThunk({movieId: currentMovie.id}));
		}
	}, [currentMovie?.id]);

	const changeQuality = (quality: typeof currentQuality) => () => {
		if (user) {
			if (currentMovie?.access) {
				if (!currentQuality && currentMovie.file?.qualitiesList[0].quality) {
					setCurrentQuality(currentMovie.file?.qualitiesList[0].quality);
				} else {
					setIsPlayerVisible(false);

					setTimeout(() => {
						setCurrentQuality(quality);
						setIsPlayerVisible(true);
						scrollToPlayer();
					}, 10);
				}
			} else {
				dispatch(setIsShownModalAction({modalName: 'subscribe', flag: true}));
			}
		} else {
			dispatch(setIsShownModalAction({modalName: 'login', flag: true}));
		}
	};

	const togglePlayerVisibility = () => {
		if (user) {
			if (!currentMovie?.access) {
				dispatch(setIsShownModalAction({modalName: 'subscribe', flag: true}));
			} else {
				scrollToPlayer();
				setIsPlayerVisible((prev) => !prev);
			}
		} else {
			dispatch(setIsShownModalAction({modalName: 'login', flag: true}));
		}
	};

	const changeModalVisibility = (flag: boolean) => () => {
		dispatch(setIsShownModalAction({modalName: 'comment', flag}));
	};

	const onAddToHistory = (id: number) => () => {
		dispatch(addMovieToHistoryThunk(id));
	};

	const scrollToPlayer = () => {
		setTimeout(() => {
			playerRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
		}, 500);
	};

	const findEpisode = (mode: 'prev' | 'next') => () => {
		if (currentEpisode) {
			const currentSeason = currentMovie?.seasons?.find(
				(x) => x.season === currentEpisode?.season?.season
			);

			const nearEpisodeNumber =
				mode === 'prev' ? currentEpisode.episode - 1 : currentEpisode.episode + 1;

			if (currentSeason) {
				let nearEpisode = currentSeason?.episodes.find((x) => x.episode === nearEpisodeNumber);

				if (nearEpisode) {
					onSetCurrentEpisode({...nearEpisode, season: {...currentSeason, episodes: []}})();
				} else {
					const nearSeasonNumber =
						mode === 'prev' ? currentSeason.season - 1 : currentSeason.season + 1;

					const nearSeason = currentMovie?.seasons?.find((x) => x.season === nearSeasonNumber);

					if (nearSeason) {
						nearEpisode = nearSeason.episodes[mode === 'prev' ? nearSeason.episodes.length - 1 : 0];

						if (nearEpisode) {
							onSetCurrentEpisode({...nearEpisode, season: {...nearSeason, episodes: []}})();
						} else {
							setHasVideosAround((prev) => ({...prev, [mode]: false}));
						}
					} else {
						setHasVideosAround((prev) => ({...prev, [mode]: false}));
					}
				}
			}
		}
	};

	const onSetCurrentEpisode = (episode: EpisodeModel) => () => {
		setCurrentUrl('');

		if (currentMovie?.seasons?.length) {
			const firstSeason = currentMovie.seasons[0];
			const currentSeason = currentMovie?.seasons?.find((x) => x.season === episode.season?.season);
			const lastSeason = currentMovie.seasons[currentMovie.seasons.length - 1];

			setHasVideosAround({
				prev:
					currentSeason?.episodes[0].episode !== episode.episode ||
					firstSeason.season !== episode.season?.season,
				next:
					currentSeason?.episodes[currentSeason?.episodes.length - 1].episode !== episode.episode ||
					lastSeason.season !== episode.season?.season,
			});
		}

		setTimeout(() => {
			setCurrentEpisode(episode);
			setCurrentUrl(episode.file.url);
		}, 10);
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

	return (
		<div>
			<Head>
				<title>{currentMovie?.title ?? 'Загрузка...'} | KinoUZ</title>
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
			{currentMovie ? (
				<main className='content'>
					{isCommentModalShown && <CommentModal movieId={currentMovie.id} />}
					<section className='page-movie-card margin-under-header'>
						<Image
							src={currentMovie.posterForPremier?.url ?? currentMovie.poster?.url ?? ''}
							alt=''
							layout='fill'
							className='page-movie-card__img'
							crossOrigin='use-credentials'
							unoptimized
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
										{!currentMovie.isSerial && (
											<button
												onClick={togglePlayerVisibility}
												className='btn btn-primary btn-icon rounded-pill'
												type='button'
											>
												смотреть<span className='icon icon-play_circle'></span>
											</button>
										)}
										<Button
											onClick={changeModalVisibility(true)}
											variant='outline-light'
											className='btn-icon rounded-pill position-relative'
										>
											отзывы<span className='icon icon-sms'></span>
											<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary'>
												{commentsCount}
											</span>
										</Button>
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
					{(isPlayerVisible || currentUrl) && (
						<div className='movie-slug-player container-fluid mb-5'>
							<Player
								ref={playerRef}
								onClick={onAddToHistory(currentMovie.id)}
								thumbnail={currentMovie.poster?.url}
								url={currentMovie.file?.[currentQuality]?.url ?? currentUrl}
							/>
							{currentMovie.isSerial && (
								<div className='movie-player__btns'>
									<button
										className={cn(
											'btn btn-primary btn-icon rounded-pill',
											!hasVideosAround.prev && 'opacity-0'
										)}
										disabled={!hasVideosAround.prev}
										onClick={findEpisode('prev')}
									>
										Пред
									</button>

									<span>
										{currentEpisode?.season?.season} Сезон {currentEpisode?.episode} Серия
									</span>

									<button
										className={cn(
											'btn btn-primary btn-icon rounded-pill',
											!hasVideosAround.next && 'opacity-0'
										)}
										disabled={!hasVideosAround.next}
										onClick={findEpisode('next')}
									>
										След
									</button>
								</div>
							)}
						</div>
					)}
					{currentMovie.isSerial &&
						currentMovie.seasons?.map((season) => {
							if (!season.episodes.length) return null;

							return (
								<EpisodeSlider
									key={season.id}
									title={`Сезон ${season.season}`}
									posterUrl={currentMovie.poster?.url}
									seasonNumber={season.season}
									list={season.episodes}
									setCurrentEpisode={onSetCurrentEpisode}
								/>
							);
						})}
					{currentMovie?.actors?.length ? (
						<ParticipantCarouselSlider participants={currentMovie.actors} title='В ролях' />
					) : null}
					{currentMovie?.producers?.length ? (
						<ParticipantCarouselSlider participants={currentMovie.producers} title='Продюсеры' />
					) : null}
					{currentMovie?.directors?.length ? (
						<ParticipantCarouselSlider participants={currentMovie.directors} title='Режиссёры' />
					) : null}
				</main>
			) : (
				<LargeLoader />
			)}

			<Footer />
		</div>
	);
};
export default Movie;

