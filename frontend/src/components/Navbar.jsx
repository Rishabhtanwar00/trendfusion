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
		<div className='bg-white flex items-center justify-between py-5 font-medium tracking-[0.5px] px-[20px] sm:px-[40px]'>
			<img
				loading='lazy'
				onClick={() => setVisible(true)}
				className='w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] lg:hidden cursor-pointer'
				src={assets.menuIcon}
				alt='menu icon'
			/>
			<div className='flex gap-5 items-center'>
				<Link to='/'>
					<img
						loading='lazy'
						className='h-auto w-auto max-h-[25px] sm:max-h-[28px]'
						src={assets.trendfusionLogo}
						alt='TrendFusion logo'
					/>
				</Link>
				<ul className='hidden lg:flex text-[18px] font-semibold text-center gap-5 text-[#1B1B1B] ml-5 mt-1'>
					<NavLink to='/' className='flex flex-col items-center gap-[1px]'>
						<p>Home</p>
						<hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
					</NavLink>
					<NavLink
						to='/collection'
						className='flex flex-col items-center gap-[1px]'
					>
						<p>Collection</p>
						<hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
					</NavLink>
					<NavLink to='/about' className='flex flex-col items-center gap-[1px]'>
						<p>About</p>
						<hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
					</NavLink>
					<NavLink
						to='/contact'
						className='flex flex-col items-center gap-[1px]'
					>
						<p>Contact</p>
						<hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
					</NavLink>
				</ul>
				<button
					onClick={() => openAdminPanel(import.meta.env.VITE_ADMIN_URL)}
					className='hidden lg:block px-2 py-1 border-2 border-[#d41e26] bg-[#f02028] text-white outline-none rounded text-[16px]'
				>
					Admin Panel
				</button>
			</div>
			<div className='flex items-center gap-3 sm:gap-6'>
				<img
					loading='lazy'
					className='w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] hidden sm:block cursor-pointer'
					src={assets.searchIcon}
					alt='search icon'
					onClick={() => {
						navigate('/collection');
						setShowSearch(true);
					}}
				/>

				<div className='group relative'>
					<img
						loading='lazy'
						className='w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] cursor-pointer'
						src={assets.userIcon}
						alt='user icon'
						onClick={() => (!token ? navigate('/login') : navigate('/profile'))}
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
								<Link
									to='/wishlist'
									className='cursor-pointer hover:text-black'
								>
									Wishlist
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
					<img
						loading='lazy'
						className='w-[28px] sm:w-[32px] h-[28px] sm:h-[32px]'
						src={assets.cartIcon}
						alt='bag icon'
					/>
					<p className='absolute w-3 sm:w-4 right-[-2px] top-[2px] text-center aspect-square rounded-full text-[6px] sm:text-[8px] leading-3 sm:leading-4 bg-black text-white'>
						{getCartCount()}
					</p>
				</Link>
			</div>

			<div
				className={`absolute top-0 right-0 bottom-0 left-0 bg-white transition-all overflow-hidden z-100 h-fit min-h-[100vh] ${
					visible ? 'w-[100vw]' : 'w-0'
				}`}
			>
				<div className='flex flex-col text-gray-700'>
					<div
						className='flex items-center gap-2 p-3 cursor-pointer'
						onClick={() => setVisible(false)}
					>
						<img
							loading='lazy'
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
						className='px-5 py-1.5 border-2 border-black bg-[#ff005c]  text-white outline-none rounded text-base w-fit mt-5 mx-auto'
					>
						Admin Panel
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
