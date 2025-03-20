import { NavLink } from 'react-router-dom';

const CustomNavLink = ({ to, icon, activeIcon, label }) => (
	<NavLink
		to={to}
		className={({ isActive }) =>
			`p-2 px-0 lg:px-4 border border-gray-300 border-r-0 flex gap-4 items-center justify-center lg:justify-start rounded-l bg-white cursor-pointer ${
				isActive ? 'active' : ''
			}`
		}
	>
		{({ isActive }) => (
			<>
				<img
					className='h-5 w-5'
					src={isActive ? activeIcon : icon}
					alt={`${label} Icon`}
				/>
				<p className='hidden lg:block'>{label}</p>
			</>
		)}
	</NavLink>
);

export default CustomNavLink;
