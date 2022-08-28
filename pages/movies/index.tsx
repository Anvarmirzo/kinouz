import type {NextPage} from 'next'
import Head from 'next/head'
import {Footer, Header, HeroLargeSlider} from '../../components/Main'
import {MovieSlider} from '../../components/Main';
import {movieSlides} from '../../fake-data';


const sliders = [
    {
        title: 'Фильмы',
        slides: movieSlides
    },
    {
        title: 'Сериалы',
        slides: movieSlides
    },
    {
        title: 'Шоу',
        slides: movieSlides
    },
    {
        title: 'Мультфильмы',
        slides: movieSlides
    },
    {
        title: 'Аниме',
        slides: movieSlides
    }
]

const Home: NextPage = () => {
    const renderSliders = () => {
        return sliders.map((slider, index) => {
            return <MovieSlider key={index} title={slider.title} slides={slider.slides}/>
        })
    }

    return (
        <>
            <Head>
                <title>Фильмы | KinoUz</title>
            </Head>

            <Header/>
            <main className="content">
                <HeroLargeSlider/>
                {renderSliders()}
            </main>
            <Footer/>
        </>
    )
}

export default Home
