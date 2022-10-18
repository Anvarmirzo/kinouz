import type {AppProps} from 'next/app';
import {wrapper} from '../core/store';
import {useEffect} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'video-player-for-react/dist/index.css';
import '../styles/sass/main.sass';
import {useAppDispatch} from '../core/hooks';
import {autoLoginThunk} from '../core/store/auth/auth.thunks';
import {LoginModal, SignUpModal} from '../components/Main';
import {getMainCategoriesThunk} from '../core/store/category/category.thunks';
import {setMainCategoriesAction} from '../core/store/category/category.slices';

function MyApp({Component, pageProps}: AppProps) {
	// redux hooks
	const dispatch = useAppDispatch();

	// react hooks
	useEffect(() => {
		dispatch(autoLoginThunk());
		dispatch(getMainCategoriesThunk({skip: 0}));

		return () => {
			dispatch(setMainCategoriesAction({count: 0, list: []}));
		};
	}, []);

	return (
		<div className='app'>
			<ToastContainer />
			<LoginModal />
			<SignUpModal />
			<Component {...pageProps} />
		</div>
	);
}

export default wrapper.withRedux(MyApp);
