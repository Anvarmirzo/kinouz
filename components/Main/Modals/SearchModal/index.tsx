import React, {useEffect, useMemo, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {useForm, Controller} from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import {AppSelect} from '../../Select';
import {useAppDispatch, useAppSelector} from '../../../../core/hooks';
import {IAutoComplete, IAutoCompleteParams, MeiliSearchMovieModel} from '../../../../core/models';
import {autoCompleteThunk} from '../../../../core/store/globalUI/globalUI.thunks';
import {getGenresThunk} from '../../../../core/store/genre/genre.thunks';
import {setGenresAction} from '../../../../core/store/genre/genre.slices';
import {getCategoriesThunk} from '../../../../core/store/category/category.thunks';
import {setAllCategoriesAction} from '../../../../core/store/category/category.slices';
import {
	getActorsThunk,
	getDirectorsThunk,
} from '../../../../core/store/participant/participant.thunks';
import {
	setActorsAction,
	setDirectorsAction,
} from '../../../../core/store/participant/participant.slices';
import {setIsShownModalAction} from '../../../../core/store/globalUI/globalUI.slices';
import {getCountriesThunks} from '../../../../core/store/country/country.thunks';
import {setCountriesAction} from '../../../../core/store/country/country.slices';

interface IField {
	label: string;
	value: string;
}

interface IFormFields {
	title: string;
	genres: IField;
	countries: IField;
	acters: IField;
	categories: IField;
	directors: IField;
	year: IField;
}

const autoComplete = {
	categories: {label: 'категория', value: ''},
	genres: {label: 'жанр (все)', value: ''},
	actors: {label: 'актер', value: ''},
	directors: {label: 'режиссёр', value: ''},
	countries: {label: 'страна', value: ''},
	year: {label: 'год', value: ''},
};

const getYearsRange = (start: number, stop: number, step: number) => {
	return Array.from({length: (stop - start) / step + 1}, (_, i) => start + i * step);
};

export const SearchModal = () => {
	// redux hooks
	const dispatch = useAppDispatch();
	const {genres, categories, participant, countries, isShown} = useAppSelector(
		({genres, categories, globalUI, participant, country}) => ({
			genres,
			categories: categories.all,
			participant,
			isShown: globalUI.modals.search.isShown,
			countries: country.list,
		})
	);

	// react hook form
	const {register, control, handleSubmit, watch} = useForm<IFormFields>();

	// react hooks
	const [searchResults, setSearchResults] = useState<{
		query: string;
		hits: MeiliSearchMovieModel[];
		count: number;
	}>({
		query: '',
		hits: [],
		count: 0,
	});

	useEffect(() => {
		const promises = [
			dispatch(getGenresThunk()),
			dispatch(getCategoriesThunk()),
			dispatch(getActorsThunk()),
			dispatch(getDirectorsThunk()),
			dispatch(getCountriesThunks()),
		];

		onSubmit()();

		let timer: NodeJS.Timeout | null = null;
		const subscribe = watch((value, {name}) => {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(onSubmit(), 500);
		});

		return () => {
			promises.forEach((p) => p.abort());
			dispatch(setGenresAction(null));
			dispatch(setAllCategoriesAction(null));
			dispatch(setActorsAction(null));
			dispatch(setDirectorsAction(null));
			dispatch(setCountriesAction(null));

			subscribe.unsubscribe();

			if (timer) {
				clearTimeout(timer);
			}
		};
	}, []);

	const onShowModal = (show: boolean) => () => {
		dispatch(setIsShownModalAction({modalName: 'search', flag: show}));
	};

	const onSubmit = (offset?: number) => () => {
		handleSubmit(async (state) => {
			const searchParams: {
				search: string;
				index: IAutoCompleteParams['index'];
				filter: string[];
				offset?: number;
			} = {
				search: '',
				index: 'movies',
				filter: [],
				offset,
			};

			for (const stateKey in state) {
				if (stateKey) {
					const stateValue = state[stateKey as keyof IFormFields];
					console.log(stateValue);
					if (typeof stateValue === 'string') {
						searchParams.search = stateValue;
					} else if (stateValue?.value) {
						searchParams.filter.push(`${stateKey}=${stateValue.label}`);
					}
				}
			}

			const action = await dispatch(autoCompleteThunk(searchParams));

			if (action.payload) {
				setSearchResults(action.payload as typeof searchResults);
			}
		})();
	};

	const searchOptions = (index: IAutoCompleteParams['index']) => async (search: string) => {
		if (index === 'year') {
			const result = yearsRange
				.filter((y) => `${y}` === search)
				.map((y) => ({title: `${y}`, value: y, slug: '', id: y}));

			return {hits: result, query: search, count: result.length} as IAutoComplete;
		} else {
			const result = await dispatch(autoCompleteThunk({search, index}));
			if (result) {
				return result.payload as IAutoComplete;
			}
		}
	};

	const yearsRange = useMemo(() => {
		const currentYear = new Date().getFullYear();
		return getYearsRange(currentYear, 1980, -1);
	}, []);

	const onShowMore = () => {
		onSubmit(searchResults.count)();
	};

	const renderResults = () => {
		return (
			<div className='modal-search-result__list row gx-4 gx-lg-5 gy-3'>
				{searchResults.hits.map((movie) => (
					<div key={movie.id} className='col-12 col-sm-6 col-md-4' onClick={onShowModal(false)}>
						<div className='movie-card'>
							<div className='movie-card__body'>
								<div className='movie-card__img'>
									<Image
										src={movie.poster ?? ''}
										alt=''
										layout='fill'
										objectFit='cover'
										className='movie-card__img'
										crossOrigin='use-credentials'
										unoptimized
									/>
								</div>
								<div className='movie-card__ratings'>
									<div className='movie-card__rating'>
										<span className='icon icon-imdb'></span>
										{movie.imdb}
									</div>
									<div className='movie-card__rating'>
										<span className='icon icon-kinopoisk'></span>
										{movie.rating}
									</div>
								</div>
							</div>
							<div className='movie-card__name'>{movie.title}</div>
							<Link href={`/movies/${movie.slug}`}>
								<a className='movie-card__link'></a>
							</Link>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<Modal show={isShown} size='lg' onHide={onShowModal(false)} aria-labelledby='searchModalLabel'>
			<Modal.Body>
				<form className='modal-search'>
					<div className='modal-search__form row gy-0 gx-2'>
						<div className='modal-search__item col-12 mb-3'>
							<div className='modal-search__search'>
								<input
									type='text'
									className='form-control'
									placeholder='поиск по названию жанру или актеру...'
									{...register('title')}
								/>
								<button onClick={onSubmit()} className='btn' type='button'>
									<span className='icon icon-search'></span>
								</button>
							</div>
						</div>
						<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2'>
							<Controller
								name='categories'
								control={control}
								render={({field}) => (
									<AppSelect
										{...field}
										isAsync
										isSearchable
										searchOptions={searchOptions('categories')}
										options={categories.list.map((c) => ({label: c.title, value: c.id}))}
										defaultValue={autoComplete.categories}
										className='form-select-react'
									/>
								)}
							/>
						</div>
						<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2'>
							<Controller
								name='genres'
								control={control}
								render={({field}) => (
									<AppSelect
										{...field}
										isAsync
										isSearchable
										searchOptions={searchOptions('genres')}
										options={genres.list.map((g) => ({label: g.title, value: g.id}))}
										defaultValue={autoComplete.genres}
										className='form-select-react'
									/>
								)}
							/>
						</div>
						<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2'>
							<Controller
								name='acters'
								control={control}
								render={({field}) => (
									<AppSelect
										{...field}
										isAsync
										isSearchable
										formatOptionLabel={(option) => (
											<div className='form-select-react-img__item'>
												{option.img && (
													<Image
														src={option.img}
														width={30}
														height={30}
														alt={option.label}
														objectFit='cover'
														crossOrigin='use-credentials'
														unoptimized
													/>
												)}
												<span>{option.label}</span>
											</div>
										)}
										searchOptions={searchOptions('acters')}
										options={participant.actors.list.map((a) => ({
											label: a.name,
											value: a.id,
											img: a.avatar.url,
										}))}
										defaultValue={autoComplete.actors}
										className='form-select-react'
									/>
								)}
							/>
						</div>
						<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2'>
							<Controller
								name='directors'
								control={control}
								render={({field}) => (
									<AppSelect
										{...field}
										isAsync
										isSearchable
										formatOptionLabel={(option) => (
											<div className='form-select-react-img__item'>
												{option.img && (
													<Image
														src={option.img}
														width={30}
														height={30}
														alt={option.label}
														crossOrigin='use-credentials'
														unoptimized
														objectFit='cover'
													/>
												)}
												<span>{option.label}</span>
											</div>
										)}
										searchOptions={searchOptions('directors')}
										options={participant.directors.list.map((a) => ({
											label: a.name,
											value: a.id,
											img: a.avatar?.url,
										}))}
										defaultValue={autoComplete.directors}
										className='form-select-react'
									/>
								)}
							/>
						</div>
						<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2 mb-md-0'>
							<Controller
								name='countries'
								control={control}
								render={({field}) => (
									<AppSelect
										{...field}
										isAsync
										isSearchable
										searchOptions={searchOptions('countries')}
										options={countries.map((c) => ({label: `${c.title}`, value: c.id}))}
										defaultValue={autoComplete.countries}
										className='form-select-react'
									/>
								)}
							/>
						</div>
						<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2 mb-md-0'>
							<Controller
								name='year'
								control={control}
								render={({field}) => (
									<AppSelect
										{...field}
										isSearchable
										searchOptions={searchOptions('year')}
										options={yearsRange.map((y) => ({label: `${y}`, value: y}))}
										defaultValue={autoComplete.year}
										className='form-select-react'
									/>
								)}
							/>
						</div>
					</div>
					<div className='modal-search__result modal-search-result'>
						<div className='modal-search-result__header'>
							<h2 className='modal-search-result__title'>Найдено:</h2>
						</div>
						<div className='modal-search-result__body'>
							{renderResults()}
							{searchResults.count > 10 && (
								<div className='modal-search-result__more'>
									<button onClick={onShowMore} className='btn' type='button'>
										<span className='icon icon-expand_more'></span>
									</button>
								</div>
							)}
						</div>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	);
};
