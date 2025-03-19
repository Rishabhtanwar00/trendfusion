import { Link, NavLink } from 'react-router-dom';

import { assets } from '../assets/assets';
import { useContext, useState } from 'react';
import { ShopContext } from '../context/shopContext';

const Navbar = () => {
	const [visible, setVisible] = useState(false);

	const { setShowSearch, getCartCount, token, setToken, navigate } =
		useContext(ShopContext);

	const handleLogout = () => {
		setToken('');
		localStorage.removeItem('token');
	};

	const openAdminPanel = (url) => {
		window.open(url, '_blank', 'noreferrer');
	};

	return (
		<div className='flex items-center justify-between py-5 font-medium tracking-[0.5px] border-b-2'>
			<Link to='/'>
				<img
					className='h-auto w-auto max-h-11'
					src={assets.trendfusionLogo}
					alt='TrendFusion logo'
				/>
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
				<button
					onClick={() => openAdminPanel(import.meta.env.VITE_ADMIN_URL)}
					className='hidden sm:block px-2 py-1 border-2 border-black bg-pink-300 outline-none rounded text-xs'
				>
					Admin Panel
				</button>
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
						onClick={() => (!token ? navigate('/login') : null)}
					/>
					{token && (
						<div className='group-hover:block hidden absolute dropdown-menu pt-4 right-0 z-10'>
							<div className='flex flex-col gap-2 p-3 w-36 bg-slate-100 text-gray-700'>
								<Link to='/profile' className='cursor-pointer hover:text-black'>
									My Profile
								</Link>
								<Link to='/orders' className='cursor-pointer hover:text-black'>
									Orders
								</Link>
								<p
									onClick={() => handleLogout()}
									className='cursor-pointer hover:text-black'
								>
									Logout
								</p>
							</div>
						</div>
					)}
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
				className={`absolute top-0 right-0 bottom-0 left-0 bg-white transition-all overflow-hidden z-10 ${
					visible ? 'w-full' : 'w-0'
				}`}
			>
				<div className='flex flex-col text-gray-700'>
					<div
						className='flex items-center gap-2 p-3 cursor-pointer'
						onClick={() => setVisible(false)}
					>
						<img
							className='h-3 rotate-180'
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
					<button
						onClick={() => openAdminPanel(import.meta.env.VITE_ADMIN_URL)}
						className='px-5 py-1.5 border-2 border-black bg-pink-300 outline-none rounded text-base w-fit mt-5 mx-auto'
					>
						Admin Panel
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
