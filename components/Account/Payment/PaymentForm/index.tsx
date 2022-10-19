import Image from 'next/image';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
	ePaymentStatusType,
	ePaymentType,
	IPostPayment,
	PaymentModel,
} from '../../../../core/models';
import {useAppDispatch, useAppSelector} from '../../../../core/hooks';
import {addPaymentThunk} from '../../../../core/store/payment/payment.thunks';

export const PaymentForm = () => {
	// redux hooks
	const dispatch = useAppDispatch();
	const userId = useAppSelector(({auth}) => auth.user?.id);

	// react hooks
	const [typeId, setTypeId] = useState(ePaymentType.Click);
	const [isHintVisible, setIsHintVisible] = useState(true);

	// react hook form
	const {
		getValues,
		register,
		handleSubmit,
		setValue,
		formState: {errors},
	} = useForm<IPostPayment>();

	const onSubmit = async (state: {summa: IPostPayment['summa']}) => {
		if (userId) {
			const result = await dispatch(
				addPaymentThunk({summa: state.summa, userId, statusId: ePaymentStatusType.Pending, typeId})
			);

			const payment = result.payload as PaymentModel;

			if (payment) {
				// TODO: make more readable
				window.open(
					`https://my.click.uz/services/pay?service_id=${
						process.env.NEXT_PUBLIC_CLICK_SERVICE_ID
					}&merchant_id=${process.env.NEXT_PUBLIC_CLICK_MERCHANT_ID}&amount=${getValues(
						'summa'
					)}&transaction_param=${payment.id}`
				);
			}
		}
	};

	const toggleTypeId = (id: ePaymentType) => () => {
		setTypeId(id);
	};

	const hideHint = () => {
		setIsHintVisible(false);
	};

	return (
		<div role='tabpanel' aria-labelledby='payment'>
			<div className='nav mynav mb-3' id='nav-tab1' role='tablist'>
				{isHintVisible && (
					<div className='alert alert-primary alert-dismissible fade show' role='alert'>
						При оплате средства попадают на баланс аккаунта после чего Вы можете приобрести
						подписку.
						<button onClick={hideHint} type='button' className='btn-close' aria-label='Close' />
					</div>
				)}
				<a
					onClick={toggleTypeId(ePaymentType.Click)}
					style={
						typeId === ePaymentType.Click ? {} : {background: 'none', borderColor: 'transparent'}
					}
					className='btn btn-primary'
					id='click'
					href='#'
				>
					<Image width={127} height={50} src='/img/images/click.png' alt='' />
				</a>
				<a
					onClick={toggleTypeId(ePaymentType.PayMe)}
					style={
						typeId === ePaymentType.PayMe ? {} : {background: 'none', borderColor: 'transparent'}
					}
					className='btn btn-primary'
					id='payMe'
					href='#'
				>
					<Image width={172} height={50} src='/img/images/payme.png' alt='' />
				</a>
			</div>
			<div
				className='tab-pane fade show active'
				id='nav-click'
				role='tabpanel'
				aria-labelledby='nav-click-tab'
			>
				<br />
				<form onSubmit={handleSubmit(onSubmit)} className='forms'>
					<input
						className='form-control form-control'
						type='text'
						placeholder='введите сумму для оплаты'
						{...register('summa', {
							valueAsNumber: true,
							pattern: /^\d+$/,
							onChange: (e) => setValue('summa', +e.target.value.replace(/\D+/g, '')),
						})}
					/>
					<button type='submit' className='btn btn-primary'>
						Оплатить
					</button>
				</form>
			</div>
		</div>
	);
};
