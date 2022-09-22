import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../../core/hooks';
import {getCommentsThunk, postCommentThunk} from '../../../../core/store/comment/comment.thunks';
import Moment from 'react-moment';

export const CommentModal = ({movieId}: {movieId: number}) => {
	// redux hooks
	const dispatch = useAppDispatch();
	const [user, comments] = useAppSelector(({users, comments}) => [users.user, comments]);

	// react hooks
	const [show, setShow] = useState(false);
	useEffect(() => {
		dispatch(getCommentsThunk({movieId}));
	}, []);
	//TODO: replace all bootstrap components to react-bootstrap

	// react hook form
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm<{text: string}>();

	const onSubmit = async ({text}: {text: string}) => {
		if (user) {
			const isSent = await dispatch(postCommentThunk({movieId, text, userId: user.id}));
			if (isSent) {
				reset();
			}
		}
	};

	const renderComments = () => {
		return comments.list.map((c) => (
			<div className='movie-comments__item' key={c.id}>
				<div className='movie-comments__name'>
					<div className='movie-comments__name-ava'>{c.user.name.charAt(0)}</div>
					{c.user.name}
				</div>
				<div className='movie-comments__date'>
					<Moment format='DD.MM.YYYY HH:mm'>{c.createdAt}</Moment>
				</div>
				<div className='movie-comments__comment'>{c.text}</div>
			</div>
		));
	};

	return (
		<>
			<Button
				onClick={() => setShow(true)}
				variant='outline-light'
				className='btn-icon rounded-pill position-relative'
			>
				отзывы<span className='icon icon-sms'></span>
				<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary'>
					{comments.count}
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
							{comments.count > 0 && (
								<div className='movie-comments__body'>
									<div className='movie-comments__list'>{renderComments()}</div>
								</div>
							)}
							<form onSubmit={handleSubmit(onSubmit)} className='movie-comments__add-comment'>
								<textarea
									className='movie-comments__textarea form-control'
									rows={1}
									placeholder='Введите свой комментарий'
									{...register('text', {required: true})}
								></textarea>
								<Button variant='link' className='movie-comments__btn' type='submit'>
									<span className='icon icon-send'></span>
								</Button>
							</form>
						</div>
					</Modal.Body>
				</div>
			</Modal>
		</>
	);
};
