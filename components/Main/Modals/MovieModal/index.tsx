import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Player} from '../../Player';
import {MovieModel} from '../../../../core/models';
import Link from 'next/link';

interface MovieModalProps {
	movie: MovieModel;
}

export const MovieModal = ({movie}: MovieModalProps) => {
	// react hooks
	const [show, setShow] = useState(false);

	const renderActorsName = () => {
		return movie.actors?.map((actor) => actor.name).join(', ');
	};
	const renderDirectorsName = () => {
		return movie.directors?.map((director) => director.name).join(', ');
	};

	return (
		<>
			<Button variant='secondary' className='btn-icon rounded-pill' onClick={() => setShow(true)}>
				подробнее<span className='icon icon-info'></span>
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
									<Button className='btn-bookmark rounded-pill' type='button'>
										<span className='icon icon-bookmark_border'></span>
									</Button>
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
										<div className='movie-info-item__desc'>{renderDirectorsName()}</div>
									</div>
									<div className='movie-info__info-item movie-info-item'>
										<div className='movie-info-item__title'>Актеры:</div>
										<div className='movie-info-item__desc'>{renderActorsName()}</div>
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
