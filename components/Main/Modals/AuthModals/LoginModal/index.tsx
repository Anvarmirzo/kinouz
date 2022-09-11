import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {SignUpModal} from '../SignUpModal';

interface LoginModalProps {}

export const LoginModal = (props: LoginModalProps) => {
	const [show, setShow] = useState(false);

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
						<form action='#' className='modal-login__form row gy-3'>
							<div className='col-12'>
								<input
									type='email'
									className='form-control form-control-ico form-control-email'
									placeholder='E-mail'
								/>
							</div>
							<div className='col-12'>
								<input
									type='password'
									className='form-control form-control-ico form-control-password'
									placeholder='Пароль'
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
								<button className='btn btn-primary' type='submit'>
									Войти
								</button>
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
