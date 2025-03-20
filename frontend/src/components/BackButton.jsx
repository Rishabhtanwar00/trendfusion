import { useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const BackButton = () => {
	const location = useLocation();
	const navigate = useNavigate();

	if (location.pathname === '/') {
		return null;
	}

	return (
		<button
			onClick={() => navigate(-1)}
			className='flex items-center border-[#d41e26] bg-[#f02028] text-white border-2 px-2 py-1 w-fit h-fit rounded active:scale-95 transition-all ease-in-out duration-150 text-sm'
		>
			<img className='h-[10px] w-auto mr-1' src={assets.arrowIcon} alt='' />
			<span>Back</span>
		</button>
	);
};

export default BackButton;
