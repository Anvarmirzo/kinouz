import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';

export const CommentModal = () => {
	// react hooks
	const [show, setShow] = useState(false);
	//TODO: replace all bootstrap components to react-bootstrap
	return (
		<>
			<Button
				variant='outline-light'
				className='btn-icon rounded-pill position-relative'
				onClick={() => setShow(true)}
			>
				отзывы<span className='icon icon-sms'></span>
				<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary'>
					1203
				</span>
			</Button>
			<Modal
				show={show}
				size='lg'
				onHide={() => setShow(false)}
				aria-labelledby='commentsModalLabel'
			>
				<div className='modal-content'>
					<Modal.Header closeButton />
					<Modal.Body className='pt-0'>
						<div className='movie-comments'>
							<div className='movie-comments__body'>
								<div className='movie-comments__list'>
									<div className='movie-comments__item'>
										<div className='movie-comments__name'>
											<div className='movie-comments__name-ava'>T</div>
											Trall
										</div>
										<div className='movie-comments__date'>10.12.2021&nbsp;&nbsp;&nbsp;19:58</div>
										<div className='movie-comments__comment'>
											фильм хороший, не напичкан чересчур спецэффектами, но это только начало,
											разогрев. В обязательном порядке нужно смотреть продолжения, нас ждёт целая
											вселенная, аля Звёздные войны.
										</div>
									</div>
									<div className='movie-comments__item'>
										<div className='movie-comments__name'>
											<div className='movie-comments__name-ava'>G</div>
											Gerson
										</div>
										<div className='movie-comments__date'>10.12.2021&nbsp;&nbsp;&nbsp;19:58</div>
										<div className='movie-comments__comment'>
											Фантастический жанр это как альтернативная музыка, не всем по вкусу. Попса же,
											нравится всем, там думать не надо, вникать, читать книги. Смотрела фильм 84
											года ещё в детстве, и этот посмотрела с большим удовольствием. Чтоб не
											разочароваться, вы должны понимать, что фильм для любителей фантастики,
											фанатов звездных войн и т.п.
										</div>
									</div>
									<div className='movie-comments__item'>
										<div className='movie-comments__name'>
											<div className='movie-comments__name-ava'>D</div>
											Dryoma
										</div>
										<div className='movie-comments__date'>10.12.2021&nbsp;&nbsp;&nbsp;19:58</div>
										<div className='movie-comments__comment'>
											что это за пыль они соберают? и как эти фримены живут на планете где вообще
											ничего нет, вокруг одни пески... какая империя? на старых версиях толком
											ничего не происходит... а в этом час я ждал что произойдет что то вокруг чего
											будет развиваться история... червь который питается песком, людьми и
											харвестером... и этот червь приползает к нему дав фору аж 5 минут что бы люди
											могли бежать... а это фриманка стукнула 3 раза по земле и червь тут как тут...
											&quot;прям супер&quot; мега с*ань
										</div>
									</div>
									<div className='movie-comments__item'>
										<div className='movie-comments__name'>
											<div className='movie-comments__name-ava'>T</div>
											Trall
										</div>
										<div className='movie-comments__date'>10.12.2021&nbsp;&nbsp;&nbsp;19:58</div>
										<div className='movie-comments__comment'>
											фильм напоминает Хроника Реддика. Спецэффекты на вышем уровне. Думаю для
											полнго открытия потенциала парня нужно будет снять 2 части, а то сам фильм
											очень затянут.
										</div>
									</div>
									<div className='movie-comments__item'>
										<div className='movie-comments__name'>
											<div className='movie-comments__name-ava'>G</div>
											Gerson
										</div>
										<div className='movie-comments__date'>10.12.2021&nbsp;&nbsp;&nbsp;19:58</div>
										<div className='movie-comments__comment'>
											Фантастический жанр это как альтернативная музыка, не всем по вкусу. Попса же,
											нравится всем, там думать не надо, вникать, читать книги. Смотрела фильм 84
											года ещё в детстве, и этот посмотрела с большим удовольствием. Чтоб не
											разочароваться, вы должны понимать, что фильм для любителей фантастики,
											фанатов звездных войн и т.п.
										</div>
									</div>
									<div className='movie-comments__item'>
										<div className='movie-comments__name'>
											<div className='movie-comments__name-ava'>D</div>
											Dryoma
										</div>
										<div className='movie-comments__date'>10.12.2021&nbsp;&nbsp;&nbsp;19:58</div>
										<div className='movie-comments__comment'>
											Фантастический жанр это как альтернативная музыка, не всем по вкусу. Попса же,
											нравится всем, там думать не надо, вникать, читать книги. Смотрела фильм 84
											года ещё в детстве, и этот посмотрела с большим удовольствием. Чтоб не
											разочароваться, вы должны понимать, что фильм для любителей фантастики,
											фанатов звездных войн и т.п.
										</div>
									</div>
								</div>
							</div>
							<div className='movie-comments__add-comment'>
								<textarea
									className='movie-comments__textarea form-control'
									rows={1}
									placeholder='Введите свой комментарий'
								></textarea>
								<button className='movie-comments__btn btn btn-link' type='submit'>
									<span className='icon icon-send'></span>
								</button>
							</div>
						</div>
					</Modal.Body>
				</div>
			</Modal>
		</>
	);
};
