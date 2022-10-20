import type {AppProps} from 'next/app';
import {wrapper} from '../core/store';
import {useEffect} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'video-player-for-react/dist/index.css';
import '../styles/sass/main.sass';
import {useAppDispatch, useAppSelector} from '../core/hooks';
import {autoLoginThunk} from '../core/store/auth/auth.thunks';
import {LoginModal, SearchModal, SignUpModal} from '../components/Main';
import {getMainCategoriesThunk} from '../core/store/category/category.thunks';
import {setMainCategoriesAction} from '../core/store/category/category.slices';
import {useRouter} from 'next/router';

function MyApp({Component, pageProps}: AppProps) {
	// next hooks
	const router = useRouter();

	// redux hooks
	const dispatch = useAppDispatch();
	const [isSearchModalShown, user] = useAppSelector(({globalUI, auth}) => [
		globalUI.modals.search.isShown,
		auth.user,
	]);

	// react hooks
	useEffect(() => {
		dispatch(autoLoginThunk());
		dispatch(getMainCategoriesThunk({skip: 0}));

		return () => {
			dispatch(setMainCategoriesAction({count: 0, list: []}));
		};
	}, []);

	useEffect(() => {
		if (user && router.query['returnUrl']) {
			router.push(router.query['returnUrl'] as string);
		}
	}, [router.query, user]);

	return (
		<div className='app'>
			<ToastContainer />
			<LoginModal />
			<SignUpModal />
			{isSearchModalShown && <SearchModal />}
			<Component {...pageProps} />
		</div>
	);
}

export default wrapper.withRedux(MyApp);
