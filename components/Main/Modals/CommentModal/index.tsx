import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../../core/hooks';
import {getCommentsThunk, postCommentThunk} from '../../../../core/store/comment/comment.thunks';
import Moment from 'react-moment';
import {setCommentsAction} from '../../../../core/store/comment/comment.slices';
import {setIsShownModalAction} from '../../../../core/store/globalUI/globalUI.slices';

export const CommentModal = ({movieId}: {movieId: number}) => {
	// redux hooks
	const dispatch = useAppDispatch();
	const [user, comments, show] = useAppSelector(({auth, comments, globalUI}) => [
		auth.user,
		comments,
		globalUI.modals.comment.isShown,
	]);

	// react hooks
	const [isMoreLoading, setIsMoreLoading] = useState(false);

	useEffect(() => {
		const promise = dispatch(getCommentsThunk({movieId}));

		return () => {
			promise.abort();
			dispatch(setCommentsAction(null));
		};
	}, []);

	// react hook form
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm<{text: string}>();

	const onSubmit = async ({text}: {text: string}) => {
		if (user) {
			if (text.trim()) {
				const isSent = await dispatch(
					postCommentThunk({movieId, text: text.trim(), userId: user.id})
				);
				if (isSent) {
					reset();
				}
			}
		} else {
			dispatch(setIsShownModalAction({modalName: 'login', flag: true}));
		}
	};

	const renderComments = () => {
		if (comments.list.length > 0) {
			return (
				<div className='movie-comments__body'>
					<div className='movie-comments__list'>
						{comments.list.map((c) => (
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
						))}
						{comments.count > comments.list.length && (
							<Button
								className='d-block m-auto w-auto'
								variant='link'
								disabled={isMoreLoading}
								onClick={onShowMore}
							>
								Показать больше
							</Button>
						)}
					</div>
				</div>
			);
		}
	};
	const onShowMore = async () => {
		setIsMoreLoading(true);
		await dispatch(getCommentsThunk({movieId, skip: comments.list.length}));
		setIsMoreLoading(false);
	};

	const changeModalVisibility = (flag: boolean) => () => {
		dispatch(setIsShownModalAction({modalName: 'comment', flag}));
	};

	//TODO: replace all bootstrap components to react-bootstrap
	return (
		<Modal
			show={show}
			size='lg'
			onHide={changeModalVisibility(false)}
			aria-labelledby='commentsModalLabel'
		>
			<Modal.Header closeButton />
			<Modal.Body className='pt-0'>
				<div className='movie-comments'>
					{renderComments()}
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
		</Modal>
	);
};
