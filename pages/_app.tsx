import type {AppProps} from 'next/app'
import '../styles/sass/main.sass'

function MyApp({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
