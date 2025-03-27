import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { useContext } from 'react';
import { ShopContext } from '../context/shopContext.jsx';

const Navbar = () => {
	const { setToken } = useContext(ShopContext);
	return (
		<div className='flex items-center justify-between px-[5vw] py-2 border-b border-gray-700 bg-black'>
			<Link to='/' className='flex flex-col mt-2'>
				<img
					className='h-auto w-auto max-h-[20px]'
					src={assets.trendfusionLogo}
					alt='Trendfusion Logo'
				/>
				<p className='font-bold text-[#f02028] tracking-wide text-[10px] text-right mr-0.5'>
					ADMIN PANEL
				</p>
			</Link>
			<button
				onClick={() => setToken('')}
				className='border-2 border-[#d41e26] bg-[#f02028] text-gray-100 px-1.5 py-0.5 w-fit h-fit active:scale-90 transition-all duration-150 ease-in-out rounded'
			>
				Logout
			</button>
		</div>
	);
};

export default Navbar;
