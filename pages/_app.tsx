import type {AppProps} from 'next/app'
import '../styles/sass/main.sass'

function MyApp({Component, pageProps}: AppProps) {
    return <div className="app"><Component {...pageProps} /></div>
}

export default MyApp
