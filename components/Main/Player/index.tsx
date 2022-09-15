import React, {useRef} from 'react';
import ReactPlayer from 'react-player';

interface PlayerProps {
	url: string | string[] | MediaStream;
	thumbnail?: string;
	isPlaying: boolean;
}

export const Player = ({url, thumbnail, isPlaying}: PlayerProps) => {
	// react hooks

	return (
		<div className='player-wrapper'>
			<ReactPlayer
				url={`${process.env.NEXT_PUBLIC_API_URL}${url}`}
				playing={isPlaying}
				controls
				light={thumbnail}
			/>
		</div>
	);
};
