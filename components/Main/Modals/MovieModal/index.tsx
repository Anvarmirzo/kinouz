import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Player} from '../../Player';

interface MovieModalProps {
	movie: {
		rating: {
			imdb: string | number;
			kinopoisk: string | number;
		};
		video: {
			src: string;
			poster: string;
		};
		title: string;
	};
}

export const MovieModal = ({movie: {title, rating, video}}: MovieModalProps) => {
	// react hooks
	const [show, setShow] = useState(false);
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
							<div className='movie-info__video'>
								<Player url={video.src} thumbnail={video.poster} />
							</div>
							<div className='movie-info__bx'>
								<h3 className='movie-info__title'>{title}</h3>
								<div className='movie-info__btns'>
									<a href='#' className='btn btn-primary btn-icon rounded-pill'>
										смотреть<span className='icon icon-play_circle'></span>
									</a>
									<button className='btn btn-bookmark rounded-pill' type='button'>
										<span className='icon icon-bookmark_border'></span>
									</button>
								</div>
							</div>
						</div>
						<div className='movie-info__body'>
							<div className='row gx-3'>
								<div className='col-12 col-sm-6'>
									<div className='movie-info__ratings'>
										<div className='movie-info__rating'>
											<span className='icon icon-imdb'></span>
											{rating.imdb}
										</div>
										<div className='movie-info__rating'>
											<span className='icon icon-kinopoisk'></span>
											{rating.kinopoisk}
										</div>
									</div>
									<div className='movie-info__info'>
										2021 <span className='text-primary'>I</span> фантастика, боевик{' '}
										<span className='text-primary'>I</span> США{' '}
										<span className='text-primary'>I</span> 145 минут{' '}
										<span className='text-primary'>I</span>{' '}
										<span className='text-primary'>16+</span>
									</div>
									<div className='movie-info__info-item movie-info-item'>
										<div className='movie-info-item__title'>Режиссер:</div>
										<div className='movie-info-item__desc'>{}</div>
									</div>
									<div className='movie-info__info-item movie-info-item'>
										<div className='movie-info-item__title'>Актеры:</div>
										<div className='movie-info-item__desc'>
											Тимоти Шаламе, Ребекка Фергюсон, <br />
											Оскар Айзек, Джош Бролин, Джейсон Момоа <br />и другие
										</div>
									</div>
								</div>
								<div className='col-12 col-sm-6'>
									<div className='movie-info__info-item movie-info-item'>
										<div className='movie-info-item__title'>Описание:</div>
										<div className='movie-info-item__desc'>
											Человечество расселилось по далёким планетам, а за власть над обитаемым
											пространством постоянно борются разные могущественные семьи. В центре
											противостояния оказывается пустынная планета Арракис. Человечество расселилось
											по далёким планетам, а за власть над обитаемым пространством постоянно борются
											разные могущественные семьи. В центре противостояния оказывается пустынная
											планета Арракис.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
				{/*</div>*/}
			</Modal>
		</>
	);
};
