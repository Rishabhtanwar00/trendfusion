import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

export function RouteLoadingManager({ children }) {
	const location = useLocation();
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		setIsTransitioning(true);

		// Slight delay to allow fallback UI to kick in (prevent flicker)
		const timer = setTimeout(() => {
			setIsTransitioning(false);
		}, 400); // Try 400ms to start, tweak if needed

		return () => clearTimeout(timer);
	}, [location.pathname]);

	if (isTransitioning) {
		return <Loader loaderText={`Loading ${location.pathname.slice(1)}...`} />;
	}

	return children;
}
