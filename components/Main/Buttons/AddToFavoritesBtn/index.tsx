import React, {DetailedHTMLProps, HTMLAttributes, useState} from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {useAppDispatch, useAppSelector} from '../../../../core/hooks';
import {addMovieToFavorite} from '../../../../core/store/movie/movie.thunks';
import cn from 'classnames';
import {setIsShownModalAction} from '../../../../core/store/globalUI/globalUI.slices';

interface AddToFavoritesBtnProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	movieId: number;
}
export const AddToFavoritesBtn = ({movieId, className}: AddToFavoritesBtnProps) => {
	// redux hooks
	const user = useAppSelector(({auth}) => auth.user);
	const dispatch = useAppDispatch();

	// react hooks
	const [isDisabled, setIsDisabled] = useState(false);

	const onClick = async () => {
		if (user) {
			if (!isDisabled) {
				setIsDisabled(true);
				const action = await dispatch(addMovieToFavorite(movieId));

				if (action.payload) {
					const result = action.payload as {message: string; status: number};
					// TODO: use constants or library instead of using hardcode values
					setIsDisabled(result.status === 200);
				} else {
					setIsDisabled(false);
				}
			}
		} else {
			dispatch(setIsShownModalAction({modalName: 'login', flag: true}));
		}
	};

	return (
		<OverlayTrigger
			placement='right'
			overlay={(props) => <Tooltip {...props}>добавить в «моя подборка»</Tooltip>}
		>
			<button
				onClick={onClick}
				className={cn('btn btn-bookmark', className)}
				style={isDisabled ? {pointerEvents: 'none'} : {}}
				type='button'
			>
				<span className='icon icon-bookmark_border'></span>
			</button>
		</OverlayTrigger>
	);
};
