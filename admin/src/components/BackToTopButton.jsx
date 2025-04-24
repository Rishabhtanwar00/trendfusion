import { useEffect, useState } from 'react';
import { assets } from '../assets/assets.js';
import useScrollHeight from '../hooks/useScrollHeight.js';

const BackToTopButton = () => {
	const [visible, setVisible] = useState(false);
	const scrollHeight = useScrollHeight();

	useEffect(() => {
		if (scrollHeight > 200) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	}, [scrollHeight]);

	return (
		<button
			className={`px-[8px] py-[7px] flex bg-[#f02028] border-2 border-[#d41e26] rounded-full shadow-lg transition-opacity duration-300 ${
				visible ? 'opacity-100' : 'opacity-0'
			}`}
			title='Back to top'
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		>
			<img
				loading='lazy'
				className='h-3 w-auto rotate-90'
				src={assets.arrowIcon}
				alt='arrow icon'
			/>
		</button>
	);
};

export default BackToTopButton;
