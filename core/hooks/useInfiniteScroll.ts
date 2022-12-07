import {useEffect, useState} from 'react';

export const useInfiniteScroll = (callback: () => void) => {
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		if (isFetching) {
			callback();
		}
	}, [isFetching]);

	function onScroll() {
		if (
			window.innerHeight + document.documentElement.scrollTop ===
				document.documentElement.offsetHeight &&
			!isFetching
		) {
			setIsFetching(true);
		}
	}
	return {isFetching, setIsFetching};
};
