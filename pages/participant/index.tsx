import {useEffect} from 'react';
import type {NextPage} from 'next';
import Head from 'next/head';
import {Footer, Header, LargeLoader, PremierSlider} from '../../components/Main';
import {MovieSlider} from '../../components/Main';
import {useAppDispatch, useAppSelector} from '../../core/hooks';
import {getMoviesThunk, getPremiersThunk} from '../../core/store/movie/movie.thunks';
import {setMoviesAction, setNewMoviesAction} from '../../core/store/movie/movie.slices';
import {useRouter} from 'next/router';

const DynamicPage: NextPage = () => {
	// next hooks
	const {query} = useRouter();

	// redux hooks
	const [newMovies, movies] = useAppSelector(({movies}) => [movies.newMoviesList, movies]);
	const dispatch = useAppDispatch();

	// react hooks
	useEffect(() => {
		if (query) {
			const {type, id} = query as {
				id: string;
				type: 'acterId' | 'directorId' | 'producerId';
			};
			const promises = [
				dispatch(getMoviesThunk({params: {[type]: +id}})),
				dispatch(getPremiersThunk({params: {}})),
			];

			return () => {
				promises.forEach((p) => p.abort());
				dispatch(setMoviesAction(null));
				dispatch(setNewMoviesAction([]));
			};
		}
	}, [query]);

	const loadMoreCb = () => {
		const {type, id} = query as {
			id: string;
			type: 'acterId' | 'directorId' | 'producerId';
		};

		dispatch(getMoviesThunk({skip: movies.count, params: {[type]: +id}}));
	};

	return (
		<>
			<Head>
				<title>{query?.name ?? 'Загрузка...'} | KinoUz</title>
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
			{query ? (
				<main className='content'>
					<PremierSlider list={newMovies} />
					<MovieSlider loadMoreCb={loadMoreCb} title='Все фильмы' list={movies.list} />
				</main>
			) : (
				<LargeLoader />
			)}
			<Footer />
		</>
	);
};

export default DynamicPage;
