import React, {FormEvent} from 'react';
import {Modal} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {signUpThunk} from '../../../../../core/store/auth/auth.thunks';
import {useAppDispatch, useAppSelector} from '../../../../../core/hooks';
import {ISignUp} from '../../../../../core/models';
import {setIsShownModalAction} from '../../../../../core/store/globalUI/globalUI.slices';

export const SignUpModal = () => {
	// redux hooks
	const dispatch = useAppDispatch();
	const isShown = useAppSelector(({globalUI}) => globalUI.modals.signup.isShown);

	// react hook form
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<ISignUp>();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		handleSubmit(async (data) => {
			const result = await dispatch(signUpThunk(data));
			if (result.payload) {
				changeShow({modalName: 'signup', flag: false})();
			}
		})();
	};

	const changeShow = (payload: {modalName: 'login' | 'signup'; flag: boolean}) => () => {
		dispatch(setIsShownModalAction(payload));
	};

	return (
		<Modal
			show={isShown}
			onHide={changeShow({modalName: 'signup', flag: false})}
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
	);
};
