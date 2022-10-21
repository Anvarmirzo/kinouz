import React, {DetailedHTMLProps, forwardRef, HTMLAttributes, LegacyRef} from 'react';

// @ts-ignore
import {ReactVideoPlayer} from 'video-player-for-react';
import cn from 'classnames';

interface PlayerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	url: string | string[] | MediaStream;
	thumbnail?: string;
	className?: string;
}

export const Player = forwardRef(function Player(
	{url, thumbnail, className, ...props}: PlayerProps,
	ref: LegacyRef<HTMLDivElement> | undefined
) {
	return (
		<div className={cn('player-wrapper', className)} ref={ref} {...props}>
			<ReactVideoPlayer
				width='100%'
				url={url}
				type='video/mp4'
				crossOrigin='use-credentials'
				poster={thumbnail}
			/>
		</div>
	);
});
