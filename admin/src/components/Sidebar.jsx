import { assets } from '../assets/assets';
import CustomNavLink from './CustomNavLink.jsx';

const Sidebar = () => {
	return (
		<div className='pt-10 pl-[20%] pr-0 flex flex-col gap-4'>
			<CustomNavLink
				to='/'
				icon={assets.dashboardIcon}
				activeIcon={assets.dashboardIconWhite}
				label='Dashboard'
			/>
			<CustomNavLink
				to='/add-product'
				icon={assets.addIcon}
				activeIcon={assets.addIconWhite}
				label='Add Product'
			/>
			<CustomNavLink
				to='/manage-category'
				icon={assets.categoryIcon}
				activeIcon={assets.categoryIconWhite}
				label='Manage Category'
			/>
			<CustomNavLink
				to='/list-products'
				icon={assets.productIcon}
				activeIcon={assets.productIconWhite}
				label='List Products'
			/>
			<CustomNavLink
				to='/orders'
				icon={assets.orderIcon}
				activeIcon={assets.orderIconWhite}
				label='Orders'
			/>
		</div>
	);
};

export default Sidebar;
