import React, {useEffect, useRef, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../../core/hooks';
import {getCommentsThunk, postCommentThunk} from '../../../../core/store/comment/comment.thunks';
import Moment from 'react-moment';
import {setCommentsAction} from '../../../../core/store/comment/comment.slices';
import {setIsShownModalAction} from '../../../../core/store/globalUI/globalUI.slices';
import {loginThunk} from '../../../../core/store/auth/auth.thunks';

export const CommentModal = ({movieId}: {movieId: number}) => {
	// redux hooks
	const dispatch = useAppDispatch();
	const [user, comments] = useAppSelector(({auth, comments}) => [auth.user, comments]);

	// react hooks
	const [show, setShow] = useState(false);
	const lastCommentRef = useRef<null | HTMLDivElement>(null);
	useEffect(() => {
		(async () => {
			await dispatch(getCommentsThunk({movieId}));
		})();

		return () => {
			dispatch(setCommentsAction({count: 0, list: []}));
		};
	}, []);
	//TODO: replace all bootstrap components to react-bootstrap

	// react hook form
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm<{text: string}>();

	const scrollToBottom = () => {
		if (lastCommentRef.current) {
			lastCommentRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
			});
		}
	};

	const onSubmit = async ({text}: {text: string}) => {
		console.log(user);
		if (user) {
			if (text.trim()) {
				const isSent = await dispatch(
					postCommentThunk({movieId, text: text.trim(), userId: user.id})
				);
				if (isSent) {
					reset();
					scrollToBottom();
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
						<div ref={lastCommentRef} />
					</div>
				</div>
			);
		}
	};

	const changeModalVisibility = (flag: boolean) => () => {
		setShow(flag);
		setTimeout(() => {
			scrollToBottom();
		}, 100);
	};

	return (
		<>
			<Button
				onClick={changeModalVisibility(true)}
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
		</>
	);
};
