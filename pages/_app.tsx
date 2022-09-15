import type {AppProps} from 'next/app';
import '../styles/sass/main.sass';
import {wrapper} from '../core/store';
import {useEffect} from 'react';
import {useAppDispatch} from '../core/hooks';
import {autoLoginThunk} from '../core/store/auth/auth.thunks';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'video-player-for-react/dist/index.css';

function MyApp({Component, pageProps}: AppProps) {
	// redux hooks
	const dispatch = useAppDispatch();

	// react hooks
	useEffect(() => {
		dispatch(autoLoginThunk());
	}, []);

	return (
		<div className='app'>
			<ToastContainer />
			<Component {...pageProps} />
		</div>
	);
}

export default wrapper.withRedux(MyApp);
