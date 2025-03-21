import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { useContext } from 'react';
import { ShopContext } from '../context/shopContext.jsx';

const Navbar = () => {
	const { setToken } = useContext(ShopContext);
	return (
		<div className='flex items-center justify-between px-[5vw] py-2 border-b-2'>
			<Link to='/' className='flex flex-col mt-2'>
				<img
					className='h-auto w-auto max-h-[25px]'
					src={assets.trendfusionLogo}
					alt='Trendfusion Logo'
				/>
				<p className='font-bold text-[#f02028] tracking-wide text-xs text-right mr-0.5'>
					ADMIN PANEL
				</p>
			</Link>
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
