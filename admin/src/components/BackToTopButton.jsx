import { useEffect, useState } from 'react';
import { assets } from '../assets/assets.js';

const BackToTopButton = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const toogleVisible = () => {
			if (window.scrollY > 200) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		};
		window.addEventListener('scroll', toogleVisible);
		return () => window.removeEventListener('scroll', toogleVisible);
	}, []);

	return (
		<button
			className={`px-[8px] py-[7px] flex bg-[#f02028] border-2 border-[#d41e26] rounded-full shadow-lg transition-opacity duration-300 ${
				visible ? 'opacity-100' : 'opacity-0'
			}`}
            title='Back to top'
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		>
			<img className='h-3 w-auto rotate-90' src={assets.arrowIcon} alt='' />
		</button>
	);
};

export default BackToTopButton;
