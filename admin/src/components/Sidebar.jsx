import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const navLinksData = [
	{
		to: '/',
		icon: assets.dashboardIcon,
		label: 'Dashboard',
	},
	{
		to: '/add-product',
		icon: assets.addIcon,
		label: 'Add Product',
	},
	{
		to: '/manage-category',
		icon: assets.categoryIcon,
		label: 'Manage Category',
	},
	{
		to: '/list-products',
		icon: assets.productIcon,
		label: 'List Products',
	},
	{
		to: '/orders',
		icon: assets.orderIcon,
		label: 'Orders',
	},
];

const Sidebar = () => {
	return (
		<div className='pr-0 flex flex-col'>
			{navLinksData.map((item, index) => (
				<NavLink
					key={index}
					to={item.to}
					className='w-full min-h-[60px] sm:min-h-[80px] p-2 border-b border-gray-700 flex flex-col gap-2 text-white items-center justify-center bg-transparent cursor-pointer text-center'
				>
					<>
						<img className='h-4 w-4' src={item.icon} alt={`icon`} />
						<p className='hidden lg:block text-[11px]'>{item.label}</p>
					</>
				</NavLink>
			))}
		</div>
	);
};

export default Sidebar;
