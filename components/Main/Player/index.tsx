import React, {DetailedHTMLProps, forwardRef, LegacyRef, VideoHTMLAttributes} from 'react';
import cn from 'classnames';

interface PlayerProps
	extends DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {
	url: string;
	thumbnail?: string;
	wrapperClassName?: string;
}

export const Player = forwardRef(function Player(
	{url, thumbnail, wrapperClassName, ...props}: PlayerProps,
	ref: LegacyRef<HTMLVideoElement> | undefined
) {
	return (
		<div className={cn('player-wrapper', wrapperClassName)}>
			<video
				poster={thumbnail}
				width='100%'
				crossOrigin='use-credentials'
				controls
				ref={ref}
				{...props}
			>
				<source src={url} type='video/mp4' />
				Your browser does not support HTML video.
			</video>
		</div>
	);
});
