import React, {MouseEvent, useEffect, useMemo, useState} from 'react';
import type {NextPage} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {
	AddToFavoritesBtn,
	Footer,
	Header,
	LargeLoader,
	MovieModal,
	Player,
	PremierSlider,
	SmallLoader,
} from '../../components/Main';

import {useAppDispatch, useAppSelector, useInfiniteScroll} from '../../core/hooks';
import {getMoviesThunk, getPremiersThunk} from '../../core/store/movie/movie.thunks';
import {setMoviesAction, setNewMoviesAction} from '../../core/store/movie/movie.slices';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

const DynamicPage: NextPage = () => {
	// next hooks
	const {
		query: {categorySlug},
	} = useRouter();

	// redux hooks
	const [categories, newMovies, movies] = useAppSelector(({categories, movies}) => [
		categories.main,
		movies.newMoviesList,
		movies,
	]);
	const dispatch = useAppDispatch();

	// react hooks
	const [showLoader, setShowLoader] = useState(false);

	const currentCategory = useMemo(() => {
		return categories.list.find((c) => c.slug === categorySlug);
	}, [categories.list, categorySlug]);

	useEffect(() => {
		if (currentCategory) {
			const promises = [
				dispatch(getMoviesThunk({params: {categoryId: currentCategory.id}})),
				dispatch(getPremiersThunk({params: {categoryId: currentCategory.id}})),
			];

			return () => {
				promises.forEach((p) => p.abort());
				dispatch(setMoviesAction(null));
				dispatch(setNewMoviesAction([]));
				setIsFetching(false);
			};
		}
	}, [currentCategory]);

	// custom hooks
	const {isFetching, setIsFetching} = useInfiniteScroll(loadMoreCb);

	async function loadMoreCb() {
		if (currentCategory && movies.count > movies.list.length) {
			setShowLoader(true);
			await dispatch(
				getMoviesThunk({skip: movies.list.length, params: {categoryId: currentCategory.id}})
			);
			setShowLoader(false);
			setIsFetching(false);
		}
	}
	const onMouseOver = (e: MouseEvent<HTMLDivElement>) => {
		e.currentTarget.querySelector('video')?.play();
	};

	const onMouseOut = (e: MouseEvent<HTMLDivElement>) => {
		e.currentTarget.querySelector('video')?.pause();
	};

	return (
		<>
			<Head>
				<title>{currentCategory?.title ?? 'Загрузка...'} | KinoUz</title>
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
			{currentCategory ? (
				<main className='content'>
					<PremierSlider list={newMovies} />
					<section className='container-fluid'>
						<div className='movie-carousel__header'>
							<h2 className='movie-carousel__title'>
								<a href='#'>{currentCategory.title}</a>
							</h2>
							<a href='#' className='movie-carousel__title-info'>
								<span className='icon icon-pending'></span>
							</a>
						</div>
						<div
							className='gap-4 d-grid'
							style={{
								gridTemplateColumns: 'repeat(5,1fr)',
							}}
						>
							{movies.list.map((movie, index) => (
								<div className='transform-none' key={movie.id}>
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
													<AddToFavoritesBtn
														movieId={movie.id}
														className='movie-card-more-info__bookmark'
													/>
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
								</div>
							))}
						</div>
						{showLoader && (
							<div className='d-flex justify-content-center w-100'>
								<SmallLoader />
							</div>
						)}
					</section>
				</main>
			) : (
				<LargeLoader />
			)}
			<Footer />
		</>
	);
};

export default DynamicPage;
