import type {AppProps} from 'next/app';
import {wrapper} from '../core/store';
import {useEffect} from 'react';
import {useAppDispatch} from '../core/hooks';
import {autoLoginThunk} from '../core/store/auth/auth.thunks';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'video-player-for-react/dist/index.css';
import '../styles/sass/main.sass';
import {LoginModal, SignUpModal} from '../components/Main';
import {getAllCategoriesThunk} from '../core/store/category/category.thunks';
import {setAllCategoriesAction} from '../core/store/category/category.slices';

function MyApp({Component, pageProps}: AppProps) {
	// redux hooks
	const dispatch = useAppDispatch();

	// react hooks
	useEffect(() => {
		dispatch(autoLoginThunk());
		dispatch(getAllCategoriesThunk({skip: 0, params: {}}));

		return () => {
			dispatch(setAllCategoriesAction({count: 0, list: []}));
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
