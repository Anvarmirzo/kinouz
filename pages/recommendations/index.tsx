import React from 'react';
import Head from 'next/head';
import {
	AddToFavoritesBtn,
	FilterModal,
	Footer,
	Header,
	HeroLargeSlider,
	MovieModal,
	Player,
} from '../../components/Main';
import {useAppSelector} from '../../core/hooks';
import Link from 'next/link';

const Recommendations = () => {
	// redux hooks
	const movies = useAppSelector(({movies}) => movies);

	const renderList = () => {
		//TODO: create component for movie card
		return movies.list.map((movie, index) => (
			<div className='movie-list__item' key={index}>
				<div className='movie-card'>
					<div className='movie-card__body'>
						<div
							className='movie-card__img'
							style={{backgroundImage: `url(${movie.poster?.url})`}}
						/>
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
							<Player url={movie.trailer?.url ?? ''} thumbnail={movie.poster?.url ?? ''} />
						</div>
						<div className='movie-card-more-info__body'>
							<div className='movie-card-more-info__header'>
								<div className='movie-card-more-info__title'>{movie.title}</div>
								<AddToFavoritesBtn movieId={movie.id} className='movie-card-more-info__bookmark' />
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
											<span className='text-primary'>I </span>
										</>
									)}
									<span className='text-primary'>{movie.ageRemark}+</span>
								</div>
								<div className='movie-card-more-info__btns'>
									<MovieModal buttonIcon='icon-library_books' movie={movie} />
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
		));
	};
	return (
		<>
			<Head>
				<title>Рекомендации | KinoUz</title>
			</Head>
			<Header />
			<main className='content'>
				<HeroLargeSlider list={[]} />
				<div className='movie-list'>
					<div className='container-fluid'>
						<div className='movie-list__header'>
							<div className='movie-list__header-title'>
								<h2 className='movie-list__title'>Рекомендации</h2>
								<span className='movie-list__title-info'>
									<span className='icon icon-pending'></span>
								</span>
							</div>
							<div className='movie-list__sort-n-filter'>
								<div className='movie-list__sort'>
									<div className='movie-sort'>
										<button className='movie-sort__item btn' type='button'>
											<span className='icon icon-font_download'></span>по алфавиту
											<span className='ico-sort icon icon-unfold_more'></span>
										</button>
										<button className='movie-sort__item btn' type='button'>
											<span className='icon icon-calendar_month'></span>по дате
											<span className='ico-sort icon icon-unfold_more'></span>
										</button>
										<button className='movie-sort__item btn' type='button'>
											<span className='icon icon-imdb'></span>IMDb
											<span className='ico-sort icon icon-unfold_more'></span>
										</button>
										<button className='movie-sort__item btn' type='button'>
											<span className='icon icon-kinopoisk'></span>Кинопоиск
											<span className='ico-sort icon icon-unfold_more'></span>
										</button>
									</div>
								</div>
								<FilterModal />
							</div>
						</div>
					</div>
					<div className='container-fluid'>
						<div className='movie-list__list'>{renderList()}</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Recommendations;
