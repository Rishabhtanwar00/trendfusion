import { assets } from '../assets/assets.js';

const Navbar = ({ setToken }) => {
	return (
		<div className='flex items-center justify-between px-[5vw] py-2 border-b-2'>
			<img
				className='h-[50px] w-fit'
				src={assets.trendfusionLogo}
				alt='Trendfusion Logo'
			/>
			<button
				onClick={() => setToken('')}
				className='px-3 py-2 text-base bg-black text-white active:scale-90 transition-all duration-150 ease-in-out rounded'
			>
				Logout
			</button>
		</div>
	);
};

export default Navbar;
