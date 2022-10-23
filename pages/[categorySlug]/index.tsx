import type {NextPage} from 'next';
import Head from 'next/head';
import {Footer, Header, PremierSlider} from '../../components/Main';
import {MovieSlider} from '../../components/Main';
import {useAppDispatch, useAppSelector} from '../../core/hooks';
import {useEffect, useMemo} from 'react';
import {getMoviesThunk, getPremiersThunk} from '../../core/store/movie/movie.thunks';
import {setMoviesAction, setNewMoviesAction} from '../../core/store/movie/movie.slices';
import {useRouter} from 'next/router';

const DynamicPage: NextPage = () => {
	// next hooks
	const {
		query: {categorySlug},
	} = useRouter();

	// redux hooks
	const [categories, newMovies, movies] = useAppSelector(({categories, movies}) => [
		categories.main,
		movies.newMoviesList,
		movies.list,
	]);
	const dispatch = useAppDispatch();

	// react hooks
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
				setMoviesAction({list: [], count: 0});
				setNewMoviesAction([]);
			};
		}
	}, [currentCategory]);

	if (!currentCategory) return null;

	return (
		<>
			<Head>
				<title>{currentCategory.title} | KinoUz</title>
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
				<MovieSlider title={currentCategory.title} list={movies} />
			</main>
			<Footer />
		</>
	);
};

export default DynamicPage;
