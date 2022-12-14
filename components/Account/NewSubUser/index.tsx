import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ICreateUser} from '../../../core/models';
import {useAppDispatch} from '../../../core/hooks';
import {createSubUserThunk} from '../../../core/store/user/user.thunks';

interface NewSubUserProps {
	userId: number;
}

export const NewSubUser = ({userId}: NewSubUserProps) => {
	// redux hooks
	const dispatch = useAppDispatch();

	// react hooks
	const [isFormVisible, setIsFormVisible] = useState(false);

	// react hook form
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: {errors},
	} = useForm<Omit<ICreateUser, 'userId'>>();

	const showForm = (show: boolean) => () => {
		setIsFormVisible(show);
	};

	const onSubmit = async (data: Omit<ICreateUser, 'userId'>) => {
		const isCreated = await dispatch(createSubUserThunk({...data, userId}));

		if (isCreated) {
			reset();
			setIsFormVisible(false);
		}
	};

	return (
		<div className='add-new-profile'>
			<button onClick={showForm(true)} className='btn btn-add mb-4' type='button'>
				<span className='ico-plus'></span>Добавить профиль
			</button>
			{isFormVisible && (
				<form onSubmit={handleSubmit(onSubmit)} className='content-blue-body' autoComplete='off'>
					<div className='mb-2'>
						<input
							type='text'
							className='form-control form-control-ico form-control-user'
							placeholder='Имя'
							autoComplete='off'
							{...register('name', {required: true})}
						/>
					</div>
					<div className='mb-2'>
						<input
							type='email'
							className='form-control form-control-ico form-control-email'
							placeholder='E-mail'
							autoComplete='new-password'
							{...register('email', {required: true})}
						/>
					</div>
					<div className='mb-2'>
						<input
							type='password'
							className='form-control form-control-ico form-control-password'
							placeholder='*******'
							autoComplete='new-password'
							{...register('password', {required: true})}
						/>
					</div>
					<div className='input-group input-group-radio mb-4'>
						<input
							type='text'
							className='form-control form-control-ico form-control-restrictions'
							placeholder='Возрастные ограничения'
							autoComplete='off'
							{...register('ageRemark', {
								valueAsNumber: true,
								pattern: /^\d+$/,
								min: 0,
								max: 100,
								maxLength: 3,
								onChange: (e) => setValue('ageRemark', +e.target.value.replace(/\D+/g, '')),
							})}
						/>
						<input
							type='radio'
							className='btn-check'
							name='options2'
							id='option21'
							autoComplete='off'
						/>
						<label className='btn' htmlFor='option21'>
							Применить
						</label>
						<input
							type='radio'
							className='btn-check'
							name='options2'
							id='option22'
							checked
							autoComplete='off'
						/>
						<label className='btn' htmlFor='option22'>
							Не применять
						</label>
					</div>
					<div className='row g-3'>
						<div className='col-auto'>
							<button
								onClick={showForm(false)}
								type='button'
								className='btn btn-secondary rounded-pill btn-icon-left'
							>
								<span className='icon icon-cancel'></span>
								Отмена
							</button>
						</div>
						<div className='col-auto'>
							<button type='submit' className='btn btn-primary rounded-pill btn-icon-left'>
								<span className='icon icon-check_circle'></span>
								Создать
							</button>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};
