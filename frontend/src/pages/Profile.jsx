import { useContext } from 'react';
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets.js';

const Profile = () => {
	const { userData } = useContext(ShopContext);

	return (
		<div>
			<div className='my-5'>
				<div className='flex gap-10 items-center tracking-wider'>
					<h1 className='text-[30px] font-semibold'>Hey, {userData.name}</h1>
					<div className=' h-[100px] w-[100px] flex items-center justify-center rounded-full border border-gray-400 bg-slate-100'>
						<img className='h-[50px] w-auto' src={assets.userIcon} alt='' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
