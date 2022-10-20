import React from 'react';

// @ts-ignore
import {ReactVideoPlayer} from 'video-player-for-react';
import cn from 'classnames';

interface PlayerProps {
	url: string | string[] | MediaStream;
	thumbnail?: string;
	className?: string;
}

export const Player = ({url, thumbnail, className}: PlayerProps) => {
	return (
		<div className={cn('player-wrapper', className)}>
			<ReactVideoPlayer
				width='100%'
				url={url}
				type='video/mp4'
				crossOrigin='use-credentials'
				poster={thumbnail}
			/>
		</div>
	);
};
