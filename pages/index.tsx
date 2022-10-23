import {useEffect} from 'react';
import type {NextPage} from 'next';
import Head from 'next/head';
import {Footer, Header, PremierSlider} from '../components/Main';
import {MovieSlider} from '../components/Main';
import {useAppDispatch, useAppSelector} from '../core/hooks';
import {getMainCategoriesThunk} from '../core/store/category/category.thunks';
import {getPremiersThunk} from '../core/store/movie/movie.thunks';
import {setMainCategoriesWithVideoAction} from '../core/store/category/category.slices';

const Home: NextPage = () => {
	// redux hooks
	const [categories, newMovies] = useAppSelector(({categories, movies}) => [
		categories,
		movies.newMoviesList,
	]);
	const dispatch = useAppDispatch();

	// react hooks
	useEffect(() => {
		const promises = [
			dispatch(getMainCategoriesThunk({skip: 0, params: {movies: true}})),
			dispatch(getPremiersThunk({params: {}})),
		];

		return () => {
			promises.forEach((p) => p.abort());
			dispatch(setMainCategoriesWithVideoAction({list: [], count: 0}));
		};
	}, []);

	const loadMoreCb = () => {
		dispatch(getMainCategoriesThunk({skip: categories.mainVideo.count, params: {movies: true}}));
	};

	const renderCategories = () => {
		return categories.mainVideo.list.map((c) =>
			c.movies ? (
				<MovieSlider loadMoreCb={loadMoreCb} key={c.id} title={c.title} list={c.movies} />
			) : null
		);
	};

	return (
		<>
			<Head>
				<title>Главная | KinoUz</title>
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
				<PremierSlider list={newMovies} />
				{renderCategories()}
			</main>
			<Footer />
		</>
	);
};

export default Home;
