import { useEffect, useState } from 'react';

const useScrollHeight = () => {
	const [scrollHeight, setScrollHeight] = useState(0);

	useEffect(() => {
		const updateScrollHeight = () => {
			setScrollHeight(window.scrollY);
		};
		window.addEventListener('scroll', updateScrollHeight);

		//initial call
		updateScrollHeight();

		return () => {
			window.removeEventListener('scroll', updateScrollHeight);
		};
	}, [scrollHeight]);
	return scrollHeight;
};

export default useScrollHeight;
