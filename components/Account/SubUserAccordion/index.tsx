import React, {useEffect} from 'react';
import {Accordion} from 'react-bootstrap';
import {UserModel} from '../../../core/models';
import {useForm} from 'react-hook-form';
import {useAppDispatch} from '../../../core/hooks';
import {deleteSubUserThunk, patchSubUserThunk} from '../../../core/store/user/user.thunks';

interface SubUserAccordionProps {
	user: UserModel;
	eventKey: string;
}

interface IFormFields {
	email: string;
	password: string;
	ageRemark?: number;
}

export const SubUserAccordionItem = ({user, eventKey}: SubUserAccordionProps) => {
	// redux hooks
	const dispatch = useAppDispatch();

	// react hook form
	const {
		register,
		handleSubmit,
		setValue,
		formState: {errors},
	} = useForm<IFormFields>();

	// react hooks
	useEffect(() => {
		if (user) {
			setValue('email', user.contact.email);
			setValue('ageRemark', user.ageRemark);
		}
	}, [user]);

	const onSubmit = (data: IFormFields) => {
		dispatch(patchSubUserThunk({...data, userId: user.id}));
	};

	const deleteUser = async () => {
		dispatch(deleteSubUserThunk(user.id));
	};

	return (
		<Accordion.Item className='profiles__item' eventKey={eventKey}>
			<Accordion.Header>
				<h2 className='profiles__header accordion-header flex-fill'>
					<div className='d-flex align-items-center pe-3'>
						<div className='profiles__profile accordion-profile'>
							<div className='accordion-profile__ava'>{user.name.charAt(0)}</div>
							<div className='accordion-profile__text'>
								<div className='accordion-profile__name'>{user.name}</div>
								<div className='accordion-profile__desc'>
									{`Возрастное ограничение: ${user.ageRemark}` ?? 'без возрастных ограничений'}
								</div>
							</div>
						</div>
						<div className='profiles__editing'>Редактировать</div>
					</div>
				</h2>
			</Accordion.Header>
			<Accordion.Body className='profiles__collapse'>
				<form onSubmit={handleSubmit(onSubmit)} className='profiles__body'>
					<div className='input-group input-group-btn mb-2'>
						<input
							type='email'
							className='form-control form-control-ico form-control-email'
							{...register('email', {required: true})}
						/>
					</div>
					<div className='input-group input-group-radio mb-2'>
						<input
							type='text'
							className='form-control form-control-ico form-control-restrictions'
							placeholder='Возрастные ограничения'
							{...register('ageRemark', {
								valueAsNumber: true,
								min: 0,
								max: 100,
								maxLength: 3,
								pattern: /^\d+$/,
								onChange: (e) => setValue('ageRemark', +e.target.value.replace(/\D+/g, '')),
							})}
						/>
					</div>
					<div className='input-group input-group-btn form-control-password__icon mb-2'>
						<input
							type='password'
							className='form-control form-control-ico form-control-password'
							placeholder='*************'
							{...register('password', {required: true})}
						/>
					</div>

					<div className='input-group input-group-radio d-flex gap-2'>
						<button className='btn btn-secondary rounded-pill btn-icon-left'>
							<span className='icon icon-edit'></span>
							Изменить
						</button>
						<button
							onClick={deleteUser}
							type='button'
							className='btn btn-secondary rounded-pill btn-icon-left'
						>
							<span className='icon icon-delete'></span>
							Удалить профиль
						</button>
					</div>
				</form>
			</Accordion.Body>
		</Accordion.Item>
	);
};
