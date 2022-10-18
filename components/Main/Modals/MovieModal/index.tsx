import React, {useState} from 'react';
import Link from 'next/link';
import {Button, Modal} from 'react-bootstrap';
import cn from 'classnames';
import {Player} from '../../Player';
import {MovieModel} from '../../../../core/models';
import {AddToFavoritesBtn} from '../../Buttons/AddToFavoritesBtn';

interface MovieModalProps {
	movie: MovieModel;
	buttonIcon: string;
	buttonClassName?: string;
}

export const MovieModal = ({movie, buttonIcon, buttonClassName}: MovieModalProps) => {
	// react hooks
	const [show, setShow] = useState(false);

	const renderNames = (
		type: 'acterId' | 'directorId' | 'producerId',
		list?: {name: string; id: number; slug?: string}[]
	) => {
		if (list) {
			const lastIndex = list.length - 1;
			return list.map((item, index) => (
				<Link
					href={`/participant?name=${item.name}&slug=${item.slug ?? ''}&id=${item.id}&type=${type}`}
					key={item.id}
				>
					<a onClick={() => setShow(false)} className='movie-info-item__desc text-decoration-none'>
						{item.name} {lastIndex === index ? '' : ','}
					</a>
				</Link>
			));
		}
	};
	return (
		<>
			<Button
				variant='secondary'
				className={cn('btn-icon rounded-pill', buttonClassName ?? '')}
				onClick={() => setShow(true)}
			>
				подробнее<span className={cn('icon', buttonIcon)}></span>
			</Button>
			<Modal
				show={show}
				size='lg'
				onHide={() => setShow(false)}
				dialogClassName='movieModal modal-dialog-movieInfo'
				aria-labelledby='movieInfoModal-1Label'
			>
				<Modal.Header closeButton />
				<Modal.Body>
					<div className='movie-info'>
						<div className='movie-info__header'>
							{movie.trailer?.url && (
								<div className='movie-info__video'>
									<Player url={movie.trailer.url} thumbnail={movie.poster?.url} />
								</div>
							)}
							<div className='movie-info__bx'>
								<h3 className='movie-info__title'>{movie.title}</h3>
								<div className='movie-info__btns'>
									<Link href={`/movies/${movie.slug}`}>
										<a className='btn btn-primary btn-icon rounded-pill'>
											смотреть<span className='icon icon-play_circle'></span>
										</a>
									</Link>
									<AddToFavoritesBtn movieId={movie.id} className='rounded-pill' />
								</div>
							</div>
						</div>
						<div className='movie-info__body'>
							<div className='row gx-3'>
								<div className='col-12 col-sm-6'>
									<div className='movie-info__ratings'>
										<div className='movie-info__rating'>
											<span className='icon icon-imdb'></span>
											{movie.imdb}
										</div>
										<div className='movie-info__rating'>
											<span className='icon icon-kinopoisk'></span>
											{movie.rating}
										</div>
									</div>
									<div className='movie-info__info'>
										{movie.year} <span className='text-primary'>I </span>
										{movie.categoriesTitle && (
											<>
												{movie.categoriesTitle} <span className='text-primary'>I </span>
											</>
										)}
										{movie.countriesTitle && (
											<>
												{movie.countriesTitle} <span className='text-primary'>I </span>
											</>
										)}
										<span className='text-primary'>{movie.ageRemark}+</span>
									</div>
									<div className='movie-info__info-item movie-info-item'>
										<div className='movie-info-item__title'>Режиссер:</div>
										{renderNames('directorId', movie.directors)}
									</div>
									<div className='movie-info__info-item movie-info-item'>
										<div className='movie-info-item__title'>Актеры:</div>
										{renderNames('acterId', movie.actors)}
									</div>
									<div className='movie-info__info-item movie-info-item'>
										<div className='movie-info-item__title'>Продюсеры:</div>
										{renderNames('producerId', movie.producers)}
									</div>
								</div>
								<div className='col-12 col-sm-6'>
									<div className='movie-info__info-item movie-info-item'>
										<div className='movie-info-item__title'>Описание:</div>
										<div className='movie-info-item__desc'>{movie.description}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};
