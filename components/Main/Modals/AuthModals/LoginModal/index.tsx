import React, {FormEvent, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {SignUpModal} from '../SignUpModal';
import {useForm} from 'react-hook-form';
import {ILogIn} from '../../../../../core/interfaces';
import {useAppDispatch} from '../../../../../core/hooks';
import {loginThunk} from '../../../../../core/store/auth/auth.thunks';

export const LoginModal = () => {
	// redux hooks
	const dispatch = useAppDispatch();

	// react hooks
	const [show, setShow] = useState(false);

	// react hook form
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<ILogIn>();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		handleSubmit((data) => {
			dispatch(loginThunk(data));
		})();
	};

	return (
		<>
			<Button
				variant='primary'
				className='header-loginza__login btn btn-primary rounded-pill'
				onClick={() => setShow(true)}
			>
				Войти
			</Button>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				aria-labelledby='loginModalLabel'
				id='loginModal'
			>
				<Modal.Header closeButton>
					<h5 className='modal-title' id='loginModalLabel'>
						Войти
					</h5>
				</Modal.Header>
				<Modal.Body>
					<div className='modal-login'>
						<form onSubmit={onSubmit} className='modal-login__form row gy-3'>
							<div className='col-12'>
								<input
									type='email'
									className='form-control form-control-ico form-control-email'
									placeholder='E-mail'
									{...register('email', {required: true})}
								/>
							</div>
							<div className='col-12'>
								<input
									type='password'
									className='form-control form-control-ico form-control-password'
									placeholder='Пароль'
									{...register('password', {required: true})}
								/>
							</div>
							<div className='col-6 d-flex align-items-center justify-content-center'>
								<div className='form-check'>
									<input
										className='form-check-input'
										type='checkbox'
										value=''
										id='flexCheckDefault'
									/>
									<label className='form-check-label' htmlFor='flexCheckDefault'>
										Запомнить меня
									</label>
								</div>
							</div>
							<div className='col-6 d-grid'>
								<button className='btn btn-primary'>Войти</button>
							</div>
						</form>
						<div className='modal-login__fast-login fast-login'>
							<h5 className='fast-login__title text-center'>Быстрый вход</h5>
							<div className='fast-login__list'>
								<div className='fast-login__item'>
									<a href='#' className='fast-login__link link-fb'>
										<span className='icon icon-fb'></span>Facebook
									</a>
								</div>
								<div className='fast-login__item'>
									<a href='#' className='fast-login__link link-google'>
										<span className='icon icon-google'>
											<span className='path1'></span>
											<span className='path2'></span>
											<span className='path3'></span>
											<span className='path4'></span>
										</span>
										Google
									</a>
								</div>
							</div>
						</div>
						<h6 className='lines-title mt-5'>или</h6>
						<div className='d-grid'>
							<SignUpModal />
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};
