import { Link, NavLink } from 'react-router-dom';

import { assets } from '../assets/assets';
import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
	const [visible, setVisible] = useState(false);

	const { setShowSearch, getCartCount, navigate } = useContext(ShopContext);

	return (
		<div className='flex items-center justify-between py-5 font-medium tracking-[0.5px]'>
			<Link to='/'>
				<h1>TRENDFUSION</h1>
			</Link>
			<ul className='hidden sm:flex text-sm text-center gap-5 text-gray-700'>
				<NavLink to='/' className='flex flex-col items-center gap-1'>
					<p>HOME</p>
					<hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
				</NavLink>
				<NavLink to='/collection' className='flex flex-col items-center gap-1'>
					<p>COLLECTION</p>
					<hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
				</NavLink>
				<NavLink to='/about' className='flex flex-col items-center gap-1'>
					<p>ABOUT</p>
					<hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
				</NavLink>
				<NavLink to='/contact' className='flex flex-col items-center gap-1'>
					<p>CONTACT</p>
					<hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
				</NavLink>
			</ul>

			<div className='flex items-center gap-6'>
				<img
					className='w-5 cursor-pointer'
					src={assets.searchIcon}
					alt='search icon'
					onClick={() => {
						navigate('/collection');
						setShowSearch(true);
					}}
				/>

				<div className='group relative'>
					<img
						className='w-5 cursor-pointer'
						src={assets.userIcon}
						alt='user icon'
					/>
					<div className='group-hover:block hidden absolute dropdown-menu pt-4 right-0'>
						<div className='flex flex-col gap-2 p-3 w-36 bg-slate-100 text-gray-700'>
							<p className='cursor-pointer hover:text-black'>My Profile</p>
							<Link to='/orders' className='cursor-pointer hover:text-black'>
								Orders
							</Link>
							<p className='cursor-pointer hover:text-black'>Logout</p>
						</div>
					</div>
				</div>

				<Link to='/cart' className='relative'>
					<img className='w-5 min-w-5' src={assets.bagIcon} alt='bag icon' />
					<p className='absolute w-4 right-[-5px] bottom-[-5px] text-center aspect-square rounded-full text-[8px] leading-4 bg-black text-white'>
						{getCartCount()}
					</p>
				</Link>
				<img
					onClick={() => setVisible(true)}
					className='w-5 sm:hidden cursor-pointer'
					src={assets.menuIcon}
					alt='menu icon'
				/>
			</div>

			<div
				className={`absolute top-0 right-0 bottom-0 left-0 bg-white transition-all overflow-hidden ${
					visible ? 'w-full' : 'w-0'
				}`}
			>
				<div className='flex flex-col text-gray-700'>
					<div
						className='flex items-center gap-4 p-3 cursor-pointer'
						onClick={() => setVisible(false)}
					>
						<img
							className='h-4 rotate-180'
							src={assets.backIcon}
							alt='back icon'
						/>
						<p>Back</p>
					</div>
					<NavLink
						onClick={() => setVisible(false)}
						className='py-2 pl-6 border'
						to='/'
					>
						HOME
					</NavLink>
					<NavLink
						onClick={() => setVisible(false)}
						className='py-2 pl-6 border'
						to='/collection'
					>
						COLLECTION
					</NavLink>
					<NavLink
						onClick={() => setVisible(false)}
						className='py-2 pl-6 border'
						to='/about'
					>
						ABOUT
					</NavLink>
					<NavLink
						onClick={() => setVisible(false)}
						className='py-2 pl-6 border'
						to='/contact'
					>
						CONTACT
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Navbar;