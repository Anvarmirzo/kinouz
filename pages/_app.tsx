import type {AppProps} from 'next/app';
import '../styles/sass/main.sass';
import {wrapper} from '../core/store/store';

function MyApp({Component, pageProps}: AppProps) {
	return (
		<div className='app'>
			<Component {...pageProps} />
		</div>
	);
}

export default wrapper.withRedux(MyApp);
