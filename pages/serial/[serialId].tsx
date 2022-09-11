import React from 'react';
import {useRouter} from 'next/router';
import {Footer, Header, HeroLargeSlider, MovieSlider} from '../../components/Main';
import Head from 'next/head';
import {movieSlides} from '../../fake-data';

const sliders = [
	{
		title: '1-сезон',
		slides: movieSlides,
	},
	{
		title: '2-сезон',
		slides: movieSlides,
	},
];

const Serial = () => {
	// next hooks
	const {
		query: {serialId},
	} = useRouter();

	const renderSliders = () => {
		return sliders.map((slider, index) => {
			return <MovieSlider key={index} title={slider.title} list={slider.slides} />;
		});
	};
	return (
		<>
			<Head>
				<title>Сериал {serialId} | KinoUz</title>
			</Head>
			<Header />
			<main className='content'>
				<HeroLargeSlider />
				{renderSliders()}
			</main>
			<Footer />
		</>
	);
};

export default Serial;
