import React from 'react';

// @ts-ignore
import {ReactVideoPlayer} from 'video-player-for-react';

interface PlayerProps {
	url: string | string[] | MediaStream;
	thumbnail?: string;
}

export const Player = ({url, thumbnail}: PlayerProps) => {
	return (
		<div className='player-wrapper'>
			<ReactVideoPlayer width='100%' url={url} type='video/mp4' poster={thumbnail} />
		</div>
	);
};
