import React, {ChangeEvent, useRef, useState} from 'react';
import ReactPlayer from 'react-player';

interface PlayerProps {
	url: string | string[] | MediaStream;
	thumbnail?: string;
	isPlaying: boolean;
}

export const Player = ({url, thumbnail, isPlaying}: PlayerProps) => {
	// react hooks
	const player = useRef<ReactPlayer>(null);

	const [state, setState] = useState<{
		playing: boolean;
		pip: boolean;
		seeking: boolean;
		controls: boolean;
		light: boolean;
		volume: number;
		muted: boolean;
		played: number;
		loaded: number;
		duration: number;
		playbackRate: number;
		loop: boolean;
	}>({
		playing: isPlaying,
		pip: false,
		seeking: false,
		controls: false,
		light: false,
		volume: 0.8,
		muted: false,
		played: 0,
		loaded: 0,
		duration: 0,
		playbackRate: 1.0,
		loop: false,
	});

	const load = () => {
		setState((prev) => ({
			...prev,
			url,
			played: 0,
			loaded: 0,
			pip: false,
		}));
	};

	const handlePlayPause = () => {
		setState((prev) => ({...prev, playing: !prev.playing}));
	};

	const handleStop = () => {
		setState((prev) => ({...prev, playing: false}));
	};

	const handleToggleControls = () => {
		setState(
			(prev) => ({
				...prev,
				controls: !prev.controls,
			})
			// () => load(url)
		);
	};

	const handleToggleLight = () => {
		setState((prev) => ({...prev, light: !state.light}));
	};

	const handleToggleLoop = () => {
		setState((prev) => ({...prev, loop: !state.loop}));
	};

	const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setState((prev) => ({...prev, volume: parseFloat(e.target.value)}));
	};

	const handleToggleMuted = () => {
		setState((prev) => ({...prev, muted: !state.muted}));
	};

	const handleSetPlaybackRate = (playbackRate: number) => {
		setState((prev) => ({...prev, playbackRate}));
	};

	const handleOnPlaybackRateChange = (speed: string) => {
		setState((prev) => ({...prev, playbackRate: parseFloat(speed)}));
	};

	const handleTogglePIP = () => {
		setState((prev) => ({...prev, pip: !state.pip}));
	};

	const handlePlay = () => {
		console.log('onPlay');
		setState((prev) => ({...prev, playing: true}));
	};

	const handleEnablePIP = () => {
		console.log('onEnablePIP');
		setState((prev) => ({...prev, pip: true}));
	};

	const handleDisablePIP = () => {
		console.log('onDisablePIP');
		setState((prev) => ({...prev, pip: false}));
	};

	const handlePause = () => {
		console.log('onPause');
		setState((prev) => ({...prev, playing: false}));
	};

	const handleSeekMouseDown = () => {
		setState((prev) => ({...prev, seeking: true}));
	};

	const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
		setState((prev) => ({...prev, played: parseFloat(e.target.value)}));
	};

	const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		setState((prev) => ({...prev, seeking: false}));
		//@ts-ignore
		player.current?.seekTo(parseFloat(e.target.value));
	};

	const handleProgress = (state: {
		played: number;
		playedSeconds: number;
		loaded: number;
		loadedSeconds: number;
	}) => {
		console.log('onProgress', state);
		// We only want to update time slider if we are not currently seeking
		// if (!state.seeking) {
		setState((prev) => ({...prev, ...state}));
		// }
	};

	const handleEnded = () => {
		console.log('onEnded');
		setState((prev) => ({...prev, playing: state.loop}));
	};

	const handleDuration = (duration: number) => {
		console.log('onDuration', duration);
		setState((prev) => ({...prev, duration}));
	};

	const handleClickFullscreen = () => {
		console.log('full screen');
	};

	const {
		playing,
		controls,
		light,
		volume,
		muted,
		loop,
		played,
		loaded,
		duration,
		playbackRate,
		pip,
	} = state;

	return (
		<div className='app'>
			<section className='section'>
				<h1>ReactPlayer Demo</h1>
				<div className='player-wrapper'>
					<ReactPlayer
						ref={player}
						className='react-player'
						width='100%'
						height='100%'
						url={`http://159.223.157.138:4001${url}`}
						pip={pip}
						playing={playing}
						controls={controls}
						light={light}
						loop={loop}
						playbackRate={playbackRate}
						volume={volume}
						muted={muted}
						onReady={() => console.log('onReady')}
						onStart={() => console.log('onStart')}
						onPlay={handlePlay}
						onEnablePIP={handleEnablePIP}
						onDisablePIP={handleDisablePIP}
						onPause={handlePause}
						onBuffer={() => console.log('onBuffer')}
						onPlaybackRateChange={handleOnPlaybackRateChange}
						onSeek={(e) => console.log('onSeek', e)}
						onEnded={handleEnded}
						onError={(e) => console.log('onError', e)}
						onProgress={handleProgress}
						onDuration={handleDuration}
					/>
				</div>

				<table>
					<tbody>
						<tr>
							<th>Controls</th>
							<td>
								<button onClick={handleStop}>Stop</button>
								<button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
								<button onClick={handleClickFullscreen}>Fullscreen</button>
								{light && (
									<button onClick={() => player.current?.showPreview()}>Show preview</button>
								)}
								{ReactPlayer.canEnablePIP(url as string) && (
									<button onClick={handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</button>
								)}
							</td>
						</tr>
						<tr>
							<th>Speed</th>
							<td>
								<button onClick={() => handleSetPlaybackRate(1)}>1x</button>
								<button onClick={() => handleSetPlaybackRate(1.5)}>1.5x</button>
								<button onClick={() => handleSetPlaybackRate(2)}>2x</button>
							</td>
						</tr>
						<tr>
							<th>Seek</th>
							<td>
								<input
									type='range'
									min={0}
									max={0.999999}
									step='any'
									value={played}
									onMouseDown={handleSeekMouseDown}
									onChange={handleSeekChange}
									onMouseUp={(e) => handleSeekMouseUp}
								/>
							</td>
						</tr>
						<tr>
							<th>Volume</th>
							<td>
								<input
									type='range'
									min={0}
									max={1}
									step='any'
									value={volume}
									onChange={handleVolumeChange}
								/>
							</td>
						</tr>
						<tr>
							<th>
								<label htmlFor='controls'>Controls</label>
							</th>
							<td>
								<input
									id='controls'
									type='checkbox'
									checked={controls}
									onChange={handleToggleControls}
								/>
								<em>&nbsp; Requires player reload</em>
							</td>
						</tr>
						<tr>
							<th>
								<label htmlFor='muted'>Muted</label>
							</th>
							<td>
								<input id='muted' type='checkbox' checked={muted} onChange={handleToggleMuted} />
							</td>
						</tr>
						<tr>
							<th>Played</th>
							<td>
								<progress max={1} value={played} />
							</td>
						</tr>
						<tr>
							<th>Loaded</th>
							<td>
								<progress max={1} value={loaded} />
							</td>
						</tr>
					</tbody>
				</table>
			</section>
			<section className='section'>
				<table>
					<tbody>
						<tr>
							<th>playing</th>
							<td>{playing ? 'true' : 'false'}</td>
						</tr>
						<tr>
							<th>volume</th>
							<td>{volume.toFixed(3)}</td>
						</tr>
						<tr>
							<th>speed</th>
							<td>{playbackRate}</td>
						</tr>
						<tr>
							<th>duration</th>
							<td>{duration}</td>
						</tr>
						<tr>
							<th>elapsed</th>
							<td>{duration * played}</td>
						</tr>
					</tbody>
				</table>
			</section>
		</div>
	);
};
