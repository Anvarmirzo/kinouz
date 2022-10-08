import Head from 'next/head';
import {Footer, Header, HeroLargeSlider, MovieSlider} from '../../components/Main';
import {useAppDispatch, useAppSelector} from '../../core/hooks';
import {useEffect} from 'react';
import {getFavoriteMoviesThunk, getMoviesThunk} from '../../core/store/movie/movie.thunks';
import {setFavoriteMoviesAction, setNewMoviesAction} from '../../core/store/movie/movie.slices';

const MyFavorites = () => {
	// redux hooks
	const dispatch = useAppDispatch();
	const [favoriteMovies, newMovies] = useAppSelector(({movies}) => [
		movies.favoritesList,
		movies.newMoviesList,
	]);

	// react hooks
	useEffect(() => {
		dispatch(getMoviesThunk({params: {isNew: true}}));
		dispatch(getFavoriteMoviesThunk());

		return () => {
			dispatch(setNewMoviesAction([]));
			dispatch(setFavoriteMoviesAction({count: 0, list: []}));
		};
	}, []);

	return (
		<>
			<Head>
				<title>Моя подборка | KinoUz</title>
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
				<HeroLargeSlider list={newMovies} />
				<MovieSlider title='Моя подборка' list={favoriteMovies.list} />
			</main>
			<Footer />
		</>
	);
};

export default MyFavorites;
