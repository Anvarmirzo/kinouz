import React, {FormEvent, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {signUpThunk} from '../../../../../core/store/auth/auth.thunks';
import {ISignUp} from '../../../../../core/interfaces';
import {useAppDispatch} from '../../../../../core/hooks';

export const SignUpModal = () => {
	// redux hooks
	const dispatch = useAppDispatch();

	// react hooks
	const [show, setShow] = useState(false);

	// react hook form
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<ISignUp>();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		handleSubmit((data) => {
			dispatch(signUpThunk(data));
		})();
	};

	return (
		<>
			<Button variant='light' onClick={() => setShow(true)}>
				Пройти регистрацию
			</Button>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				aria-labelledby='registrationModalLabel'
				id='registrationModal'
			>
				<Modal.Header closeButton>
					<h5 className='modal-title' id='registrationModalLabel'>
						Регистрация
					</h5>
				</Modal.Header>
				<Modal.Body>
					<div className='registration-modal'>
						<form onSubmit={onSubmit} className='registration-modal__form row gy-3'>
							<div className='col-12'>
								<input
									type='text'
									className='form-control form-control-ico form-control-user'
									placeholder='Имя'
									{...register('name', {required: true})}
								/>
							</div>
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
							<div className='col-12'>
								<input
									type='password'
									className='form-control form-control-ico form-control-password'
									placeholder='Повторите пароль'
									{...register('password', {required: true})}
								/>
							</div>
							<div className='col-12 d-grid'>
								<button className='btn btn-primary'>Зарегистрироваться</button>
							</div>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};
