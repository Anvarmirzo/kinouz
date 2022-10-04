import React from 'react';
import {useRouter} from 'next/router';
import {Footer, Header, HeroLargeSlider, MovieSlider} from '../../components/Main';
import Head from 'next/head';
import {useAppSelector} from '../../core/hooks';

const Serial = () => {
	// next hooks
	const {
		query: {serialId},
	} = useRouter();

	// redux hooks
	const movies = useAppSelector(({movies}) => movies.list.filter((m) => m.isSerial));

	const sliders = [
		{
			title: '1-сезон',
			slides: movies,
		},
		{
			title: '2-сезон',
			slides: movies,
		},
	];

	const renderSliders = () => {
		return sliders.map((slider, index) =>
			slider.slides.length ? (
				<MovieSlider key={index} title={slider.title} list={slider.slides} />
			) : null
		);
	};

	return (
		<>
			<Head>
				<title>Сериал {serialId} | KinoUz</title>
			</Head>
			<Header />
			<main className='content'>
				<HeroLargeSlider list={[]} />
				{renderSliders()}
			</main>
			<Footer />
		</>
	);
};

export default Serial;
