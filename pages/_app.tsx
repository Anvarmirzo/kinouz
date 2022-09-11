import type {AppProps} from 'next/app';
import '../styles/sass/main.sass';
import {wrapper} from '../core/store';
import {useEffect} from 'react';
import {useAppDispatch} from '../core/hooks';
import {autoLoginThunk} from '../core/store/auth/auth.thunks';

function MyApp({Component, pageProps}: AppProps) {
	// redux hooks
	const dispatch = useAppDispatch();

	// react hooks
	useEffect(() => {
		dispatch(autoLoginThunk());
	}, []);

	return (
		<div className='app'>
			<Component {...pageProps} />
		</div>
	);
}

export default wrapper.withRedux(MyApp);
