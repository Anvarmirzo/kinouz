import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {AppSelect} from '../../Select';
import Image from 'next/image';

export const SearchModal = () => {
	// react hooks
	const [show, setShow] = useState(false);

	return (
		<>
			<Button variant='secondary' className='rounded-pill' onClick={() => setShow(true)}>
				<span className='icon icon-search'></span>
			</Button>
			<Modal show={show} size='lg' onHide={() => setShow(false)} aria-labelledby='searchModalLabel'>
				<Modal.Body>
					<div className='modal-search'>
						<div className='modal-search__form row gy-0 gx-2'>
							<div className='modal-search__item col-12 mb-3'>
								<div className='modal-search__search'>
									<input
										type='text'
										className='form-control'
										placeholder='поиск по названию жанру или актеру...'
									/>
									<button className='btn' type='submit'>
										<span className='icon icon-search'></span>
									</button>
								</div>
							</div>
							<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2'>
								<AppSelect
									options={[
										{label: 'One', value: '1'},
										{label: 'Two', value: '2'},
										{label: 'Three', value: '3'},
									]}
									defaultValue={{label: 'категория', value: ''}}
									className='form-select-react'
								/>
							</div>
							<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2'>
								<AppSelect
									options={[
										{label: 'One', value: '1'},
										{label: 'Two', value: '2'},
										{label: 'Three', value: '3'},
									]}
									defaultValue={{label: 'жанр (все)', value: ''}}
									className='form-select-react'
								/>
							</div>
							<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2'>
								<AppSelect
									className='form-select-react-img'
									defaultValue={{label: 'актер', value: ''}}
									options={[
										{
											value: 'TH',
											label: 'Том Харди',
											img: '/img/dist/actor-ava1.jpg',
										},
										{
											value: 'TH',
											label: 'Дженнифер Лопес',
											img: '/img/dist/actor-ava2.jpg',
										},
										{
											value: 'TH',
											label: 'Сара Джессика Паркер',
											img: '/img/dist/actor-ava3.jpg',
										},
										{
											value: 'TH',
											label: 'Стивен Сигал',
											img: '/img/dist/actor-ava4.jpg',
										},
										{
											value: 'TH',
											label: 'Роберт Паттинсон',
											img: '/img/dist/actor-ava5.jpg',
										},
									]}
									formatOptionLabel={(option) => (
										<div className='form-select-react-img__item'>
											{option.img && (
												<Image src={option.img} width={30} height={30} alt={option.label} />
											)}
											<span>{option.label}</span>
										</div>
									)}
								/>
							</div>
							<div className='modal-search__item col-12 col-sm-6 col-md-4 mb-2 mb-md-0'>
								<AppSelect
									options={[
										{label: 'One', value: '1'},
										{label: 'Two', value: '2'},
										{label: 'Three', value: '3'},
									]}
									defaultValue={{label: 'страна', value: ''}}
									className='form-select-react'
								/>
							</div>
							<div className='modal-search__item col-12 col-sm-4 col-md-2 mb-2 mb-sm-0'>
								<AppSelect
									options={[
										{label: 'One', value: '1'},
										{label: 'Two', value: '2'},
										{label: 'Three', value: '3'},
									]}
									defaultValue={{label: 'год', value: ''}}
									className='form-select-react'
								/>
							</div>
							<div className='modal-search__item col-12 col-sm-8 col-md-6'>
								<div className='modal-search__quality'>
									<div className='title'>качество:</div>
									<div className='list'>
										<div className='form-check form-check-inline'>
											<input
												className='form-check-input'
												type='radio'
												name='inlineRadioOptions'
												id='inlineRadio1'
												value='option1'
											/>
											<label className='form-check-label' htmlFor='inlineRadio1'>
												CD
											</label>
										</div>
										<div className='form-check form-check-inline'>
											<input
												className='form-check-input'
												type='radio'
												name='inlineRadioOptions'
												id='inlineRadio2'
												value='option2'
											/>
											<label className='form-check-label' htmlFor='inlineRadio2'>
												HD
											</label>
										</div>
										<div className='form-check form-check-inline'>
											<input
												className='form-check-input'
												type='radio'
												name='inlineRadioOptions'
												id='inlineRadio3'
												value='option3'
											/>
											<label className='form-check-label' htmlFor='inlineRadio3'>
												FullHD
											</label>
										</div>
										<div className='form-check form-check-inline'>
											<input
												className='form-check-input'
												type='radio'
												name='inlineRadioOptions'
												id='inlineRadio4'
												value='option4'
											/>
											<label className='form-check-label' htmlFor='inlineRadio4'>
												UHD4k
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='modal-search__result modal-search-result'>
							<div className='modal-search-result__header'>
								<h2 className='modal-search-result__title'>Найдено:</h2>
								<div className='modal-search-result__sort movie-sort'>
									<button className='movie-sort__item btn' type='button'>
										<span className='icon icon-font_download'></span>по алфавиту
										<span className='ico-sort icon icon-unfold_more'></span>
									</button>
									<button className='movie-sort__item btn' type='button'>
										<span className='icon icon-calendar_month'></span>по дате
										<span className='ico-sort icon icon-unfold_more'></span>
									</button>
									<button className='movie-sort__item btn' type='button'>
										<span className='icon icon-imdb'></span>IMDb
										<span className='ico-sort icon icon-unfold_more'></span>
									</button>
									<button className='movie-sort__item btn' type='button'>
										<span className='icon icon-kinopoisk'></span>Кинопоиск
										<span className='ico-sort icon icon-unfold_more'></span>
									</button>
								</div>
							</div>
							<div className='modal-search-result__body'>
								<div className='modal-search-result__list row gx-4 gx-lg-5 gy-3'>
									<div className='col-12 col-sm-6 col-md-4'>
										<div className='movie-card'>
											<div className='movie-card__body'>
												<div
													className='movie-card__img'
													style={{
														backgroundImage: 'url("/img/dist/movie-card-img1.jpg")',
													}}
												></div>
												<div className='movie-card__ratings'>
													<div className='movie-card__rating'>
														<span className='icon icon-imdb'></span>7.2
													</div>
													<div className='movie-card__rating'>
														<span className='icon icon-kinopoisk'></span>
														6.8
													</div>
												</div>
											</div>
											<div className='movie-card__name'>Название фильма</div>
											<a href='#' className='movie-card__link'></a>
										</div>
									</div>
									<div className='col-12 col-sm-6 col-md-4'>
										<div className='movie-card'>
											<div className='movie-card__body'>
												<div
													className='movie-card__img'
													style={{
														backgroundImage: 'url("/img/dist/movie-card-img2.jpg")',
													}}
												></div>
												<div className='movie-card__ratings'>
													<div className='movie-card__rating'>
														<span className='icon icon-imdb'></span>7.2
													</div>
													<div className='movie-card__rating'>
														<span className='icon icon-kinopoisk'></span>
														6.8
													</div>
												</div>
											</div>
											<div className='movie-card__name'>
												Название фильма не одну, <br />а даже в две строки WoW
											</div>
											<a href='#' className='movie-card__link'></a>
										</div>
									</div>
									<div className='col-12 col-sm-6 col-md-4'>
										<div className='movie-card'>
											<div className='movie-card__body'>
												<div
													className='movie-card__img'
													style={{
														backgroundImage: 'url("/img/dist/movie-card-img3.jpg")',
													}}
												></div>
												<div className='movie-card__ratings'>
													<div className='movie-card__rating'>
														<span className='icon icon-imdb'></span>7.2
													</div>
													<div className='movie-card__rating'>
														<span className='icon icon-kinopoisk'></span>
														6.8
													</div>
												</div>
											</div>
											<div className='movie-card__name'>Название фильма</div>
											<a href='#' className='movie-card__link'></a>
										</div>
									</div>
									<div className='col-12 col-sm-6 col-md-4'>
										<div className='movie-card'>
											<div className='movie-card__body'>
												<div
													className='movie-card__img'
													style={{
														backgroundImage: 'url("/img/dist/movie-card-img4.jpg")',
													}}
												></div>
												<div className='movie-card__ratings'>
													<div className='movie-card__rating'>
														<span className='icon icon-imdb'></span>7.2
													</div>
													<div className='movie-card__rating'>
														<span className='icon icon-kinopoisk'></span>
														6.8
													</div>
												</div>
											</div>
											<div className='movie-card__name'>Название фильма</div>
											<a href='#' className='movie-card__link'></a>
										</div>
									</div>
									<div className='col-12 col-sm-6 col-md-4'>
										<div className='movie-card'>
											<div className='movie-card__body'>
												<div
													className='movie-card__img'
													style={{
														backgroundImage: 'url("/img/dist/movie-card-img5.jpg")',
													}}
												></div>
												<div className='movie-card__ratings'>
													<div className='movie-card__rating'>
														<span className='icon icon-imdb'></span>7.2
													</div>
													<div className='movie-card__rating'>
														<span className='icon icon-kinopoisk'></span>
														6.8
													</div>
												</div>
											</div>
											<div className='movie-card__name'>
												Название фильма не одну, <br />а даже в две строки WoW
											</div>
											<a href='#' className='movie-card__link'></a>
										</div>
									</div>
									<div className='col-12 col-sm-6 col-md-4'>
										<div className='movie-card'>
											<div className='movie-card__body'>
												<div
													className='movie-card__img'
													style={{
														backgroundImage: 'url("/img/dist/movie-card-img6.jpg")',
													}}
												></div>
												<div className='movie-card__ratings'>
													<div className='movie-card__rating'>
														<span className='icon icon-imdb'></span>7.2
													</div>
													<div className='movie-card__rating'>
														<span className='icon icon-kinopoisk'></span>
														6.8
													</div>
												</div>
											</div>
											<div className='movie-card__name'>Название фильма</div>
											<a href='#' className='movie-card__link'></a>
										</div>
									</div>
								</div>
								<div className='modal-search-result__more'>
									<button className='btn' type='button'>
										<span className='icon icon-expand_more'></span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};
