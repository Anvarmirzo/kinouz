import type {NextPage} from 'next';
import Head from 'next/head';
import {Footer, Header, HeroLargeSlider} from '../components/Main';
import {MovieSlider} from '../components/Main';
import {useAppDispatch, useAppSelector} from '../core/hooks';
import {useEffect} from 'react';
import {getCategoriesMainThunk} from '../core/store/category/category.thunks';

const Home: NextPage = () => {
	// redux hooks
	const categories = useAppSelector(({categories}) => categories.list);
	const dispatch = useAppDispatch();

	// react hooks
	useEffect(() => {
		dispatch(getCategoriesMainThunk());
	}, []);

	const renderCategories = () => {
		return categories.map((c) =>
			c.movies ? <MovieSlider key={c.id} title={c.title} list={c.movies} /> : null
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
				<link rel='apple-touch-icon' sizes='180x180' href='img/favicon/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='img/favicon/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='img/favicon/favicon-16x16.png' />
				<link rel='manifest' href='img/favicon/site.webmanifest' />
				<link rel='mask-icon' href='img/favicon/safari-pinned-tab.svg' color='#040724' />
				<link rel='shortcut icon' href='img/favicon/favicon.ico' />
			</Head>

			<Header />
			<main className='content'>
				<HeroLargeSlider />
				{renderCategories()}
			</main>
			<Footer />
		</>
	);
};

export default Home;
