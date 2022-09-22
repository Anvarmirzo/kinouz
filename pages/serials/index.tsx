import type {NextPage} from 'next';
import Head from 'next/head';
import {Footer, Header, HeroLargeSlider} from '../../components/Main';
import {MovieSlider} from '../../components/Main';
import {useEffect} from 'react';
import {getMoviesThunk} from '../../core/store/movie/movie.thunks';
import {useAppDispatch, useAppSelector} from '../../core/hooks';

const Movies: NextPage = () => {
	// redux hooks
	const dispatch = useAppDispatch();
	const movies = useAppSelector(({movies}) => movies);

	// react hooks
	useEffect(() => {
		dispatch(getMoviesThunk());
	}, []);

	return (
		<>
			<Head>
				<title>Сериалы | KinoUz</title>
			</Head>

			<Header />
			<main className='content'>
				<HeroLargeSlider />
				<MovieSlider title='Фильмы' list={movies.list} />
			</main>
			<Footer />
		</>
	);
};

export default Movies;
