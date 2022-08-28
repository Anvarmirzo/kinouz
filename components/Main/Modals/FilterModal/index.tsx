import React from 'react';
import {Button, Dropdown} from 'react-bootstrap';
import {AppSelect} from '../../Select';
import Image from 'next/image';

export const FilterModal = () => {
	return (
		<Dropdown className='movie-list__filter filter' id='dropdown-filter'>
			<Dropdown.Toggle className='filter__btn btn-icon' variant='dark'>
				Фильтр
				<span className='icon icon-filter_alt' />
			</Dropdown.Toggle>
			<Dropdown.Menu align='end' className='filter__dropdown' aria-labelledby='dropdownFilter'>
				<div className='filter__list row'>
					<div className='filter__item col-12 mb-3'>
						<AppSelect
							className='form-select-react'
							options={[
								{value: '1', label: 'One'},
								{value: '2', label: 'Two'},
								{value: '3', label: 'Three'},
							]}
							defaultValue={{label: 'жанр (все)', value: ''}}
						/>
					</div>
					<div className='filter__item col-12 mb-3'>
						<AppSelect
							className='form-select-react'
							options={[
								{value: '1', label: 'One'},
								{value: '2', label: 'Two'},
								{value: '3', label: 'Three'},
							]}
							defaultValue={{label: 'страна', value: ''}}
						/>
					</div>
					<div className='filter__item col-12 mb-4'>
						<AppSelect
							className='form-select-react-img'
							defaultValue={{label: 'актер', value: ''}}
							options={[
								{value: 'TH', label: 'Том Харди', img: '/img/dist/actor-ava1.jpg'},
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
					<div className='filter__item col-12 mb-4'>
						<div className='filter__quality'>
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
					<div className='filter__item col-6 mb-3'>
						<AppSelect
							className='form-select-react'
							options={[
								{value: '1', label: 'One'},
								{value: '2', label: 'Two'},
								{value: '3', label: 'Three'},
							]}
							defaultValue={{label: 'год', value: ''}}
						/>
					</div>
					<div className='col-6 mb-3 d-grid'>
						<Button variant='primary' className='rounded-pill'>
							применить
						</Button>
					</div>
				</div>
			</Dropdown.Menu>
		</Dropdown>
	);
};
