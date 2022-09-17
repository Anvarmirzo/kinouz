import React, {useEffect} from 'react';
import {Accordion} from 'react-bootstrap';
import {UserModel} from '../../../core/models';
import {useForm} from 'react-hook-form';

interface SubUserAccordionProps {
	user: UserModel;
	eventKey: string;
}

export const SubUserAccordionItem = ({user, eventKey}: SubUserAccordionProps) => {
	// react hook form
	const {
		register,
		handleSubmit,
		setValue,
		formState: {errors},
	} = useForm<{email: string; password: string; age?: number}>();

	// react hooks
	useEffect(() => {
		if (user) {
			setValue('email', user.contact.email);
		}
	}, [user]);

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
				<div className='profiles__body'>
					<div className='input-group input-group-btn mb-2'>
						<input
							type='email'
							className='form-control form-control-ico form-control-email'
							{...register('email', {required: true})}
						/>
						<button className='btn btn-edit btn-icon' type='button'>
							изменить
							<span className='icon icon-edit'></span>
						</button>
					</div>
					<div className='input-group input-group-radio mb-2'>
						<input
							type='text'
							className='form-control form-control-ico form-control-restrictions'
							placeholder='Возрастные ограничения'
							{...register('age', {
								valueAsNumber: true,
								pattern: /^\d+$/,
								onChange: (e) => setValue('age', +e.target.value.replace(/\D+/g, '')),
							})}
						/>
						<input
							type='radio'
							className='btn-check'
							name='options'
							id='option1'
							autoComplete='off'
						/>
						<label className='btn' htmlFor='option1'>
							Применить
						</label>
						<input
							type='radio'
							className='btn-check'
							name='options'
							id='option2'
							autoComplete='off'
							checked
						/>
						<label className='btn' htmlFor='option2'>
							Не применять
						</label>
					</div>
					<div className='input-group input-group-btn mb-2'>
						<input
							type='password'
							className='form-control form-control-ico form-control-password'
							placeholder='*************'
							{...register('password', {required: true})}
						/>
					</div>

					<div className='input-group input-group-radio'>
						<button type='submit' className='btn btn-secondary rounded-pill btn-icon-left'>
							<span className='icon icon-delete'></span>
							Удалить профиль
						</button>
					</div>
				</div>
			</Accordion.Body>
		</Accordion.Item>
	);
};
