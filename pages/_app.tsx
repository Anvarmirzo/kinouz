import type {AppProps} from 'next/app'
import '../styles/sass/main.sass'
import '../styles/globals.css'

function MyApp({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
