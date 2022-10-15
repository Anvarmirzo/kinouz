import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {AppSelect} from '../../Select';
import {useForm, Controller} from 'react-hook-form';
import {useAppDispatch} from '../../../../core/hooks';
import {searchMovieThunk} from '../../../../core/store/movie/movie.thunks';
import {
	IAutoComplete,
	IAutoCompleteParams,
	IMovieSearchParams,
	MovieModel,
} from '../../../../core/models';
import {autoCompleteThunk} from '../../../../core/store/globalUI/globalUI.thunks';
import Link from 'next/link';

interface ISelect {
	label: string;
	value: string;
}

export const SearchModal = () => {
	// redux hooks
	const dispatch = useAppDispatch();

	// react hook form
	const {
		register,
		control,
		handleSubmit,
		setValue,
		watch,
		formState: {errors},
	} = useForm<IMovieSearchParams['params']['current']>();

	// react hooks
	const [show, setShow] = useState(false);
	const [searchResults, setSearchResults] = useState<{count: number; data: MovieModel[]}>({
		count: 0,
		data: [],
	});

	const [autoComplete, setAutoComplete] = useState<{
		categories: ISelect;
		actors: ISelect;
		genres: ISelect;
		countries: ISelect;
	}>({
		categories: {label: 'категория', value: ''},
		genres: {label: 'жанр (все)', value: ''},
		actors: {label: 'актер', value: ''},
		countries: {label: 'страна', value: ''},
	});

	useEffect(() => {
		let timer: NodeJS.Timeout | null = null;
		const subscribe = watch((value, {name}) => {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(onSubmit, 500);
		});

		return () => {
			subscribe.unsubscribe();
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, []);

	const onShowModal = (show: boolean) => () => {
		setShow(show);
	};

	const onSubmit = () => {
		handleSubmit(async (state) => {
			const action = await dispatch(searchMovieThunk({params: {current: state}}));

			if (action.payload) {
				setSearchResults(action.payload as typeof searchResults);
			}
		})();
	};

	const searchOptions = (index: IAutoCompleteParams['index']) => async (search: string) => {
		const result = await dispatch(autoCompleteThunk({search, index}));
		if (result) {
			return result.payload as IAutoComplete;
		}
	};

	const renderResults = () => {
		return searchResults.data.map((movie) => (
			<div className='modal-search-result__list row gx-4 gx-lg-5 gy-3' key={movie.id}>
				<div className='col-12 col-sm-6 col-md-4'>
					<div className='movie-card'>
						<div className='movie-card__body'>
							<div
								className='movie-card__img'
								style={{backgroundImage: `url("${movie.poster?.url}")`}}
							></div>
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
						<Link href={`movies/${movie.slug}`}>
							<a className='movie-card__link'></a>
						</Link>
					</div>
				</div>
			</div>
		));
	};

	return (
		<>
			<Button variant='secondary' className='rounded-pill' onClick={onShowModal(true)}>
				<span className='icon icon-search'></span>
			</Button>
			<Modal show={show} size='lg' onHide={onShowModal(false)} aria-labelledby='searchModalLabel'>
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
									<button onClick={onSubmit} className='btn' type='button'>
										<span className='icon icon-search'></span>
									</button>
								</div>
							</div>
							<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2'>
								<Controller
									name='categoryId'
									control={control}
									render={({field}) => (
										<AppSelect
											{...field}
											isAsync
											isSearchable
											searchOptions={searchOptions('categories')}
											options={[]}
											defaultValue={autoComplete.categories}
											className='form-select-react'
										/>
									)}
								/>
							</div>
							<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2'>
								<Controller
									name='genreId'
									control={control}
									render={({field}) => (
										<AppSelect
											{...field}
											isAsync
											isSearchable
											searchOptions={searchOptions('genres')}
											options={[]}
											defaultValue={autoComplete.genres}
											className='form-select-react'
										/>
									)}
								/>
							</div>
							<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2'>
								<Controller
									name='acterId'
									control={control}
									render={({field}) => (
										<AppSelect
											{...field}
											isAsync
											isSearchable
											searchOptions={searchOptions('acters')}
											options={[]}
											defaultValue={autoComplete.actors}
											className='form-select-react'
										/>
									)}
								/>
							</div>
							<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2 mb-md-0'>
								<Controller
									name='countryId'
									control={control}
									render={({field}) => (
										<AppSelect
											{...field}
											isAsync
											isSearchable
											searchOptions={searchOptions('countries')}
											options={[]}
											defaultValue={autoComplete.countries}
											className='form-select-react'
										/>
									)}
								/>
							</div>
							<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2 mb-md-0'>
								<input
									type='text'
									className='form-control h-100'
									placeholder='год'
									{...register('year', {
										valueAsNumber: true,
										pattern: /^\d+$/,
										onChange: (e) => setValue('year', +e.target.value.replace(/\D+/g, '')),
									})}
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
										<button className='btn' type='button'>
											<span className='icon icon-expand_more'></span>
										</button>
									</div>
								)}
							</div>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
};
