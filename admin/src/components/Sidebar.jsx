import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
	return (
		<div className='pt-10 pl-[20%] pr-0 flex flex-col gap-4'>
			<NavLink
				className='p-2 px-4 border border-gray-300 border-r-0 flex gap-5 items-center rounded-l cursor-pointer'
				to='/add-product'
			>
				<img className='h-5 w-5' src={assets.addIcon} alt='add Icon' />
				<p className='hidden lg:block'>Add Product</p>
			</NavLink>
			<NavLink
				className='p-2 px-4 border border-gray-300 border-r-0 flex gap-5 items-center rounded-l cursor-pointer'
				to='/list-products'
			>
				<img className='h-5 w-5' src={assets.orderIcon} alt='add Icon' />
				<p className='hidden lg:block'>List Products</p>
			</NavLink>
			<NavLink
				className='p-2 px-4 border border-gray-300 border-r-0 flex gap-5 items-center rounded-l cursor-pointer'
				to='/orders'
			>
				<img className='h-5 w-5' src={assets.orderIcon} alt='add Icon' />
				<p className='hidden lg:block'>Orders</p>
			</NavLink>
		</div>
	);
};

export default Sidebar;
