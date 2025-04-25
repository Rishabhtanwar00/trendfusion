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

const Sidebar = ({ moveSidebar }) => {
	return (
		<div
			className={`pr-0 flex flex-col transition-all duration-300 ${
				moveSidebar ? 'pt-0' : 'pt-[60px]'
			}`}
		>
			{navLinksData.map((item, index) => (
				<NavLink
					key={index}
					to={item.to}
					className='w-full min-h-[60px] sm:min-h-[80px] p-1 sm:p-2 border-b border-gray-700 flex flex-col gap-2 text-white items-center justify-center bg-transparent cursor-pointer text-center'
				>
					<>
						<img
							loading='lazy'
							className='h-4 w-4'
							src={item.icon}
							alt={`${item.label} icon`}
						/>
						<p className='hidden lg:block text-[11px]'>{item.label}</p>
					</>
				</NavLink>
			))}
		</div>
	);
};

export default Sidebar;
