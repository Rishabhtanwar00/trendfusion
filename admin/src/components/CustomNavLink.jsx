import { NavLink } from 'react-router-dom';

const CustomNavLink = ({ to, icon, activeIcon, label }) => (
	<NavLink
		to={to}
		className={({ isActive }) =>
			`w-full min-h-[80px] p-2 border-b flex flex-col gap-2 text-white items-center justify-center bg-transparent cursor-pointer text-center ${
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
				<p className='hidden lg:block text-sm'>{label}</p>
			</>
		)}
	</NavLink>
);

export default CustomNavLink;
