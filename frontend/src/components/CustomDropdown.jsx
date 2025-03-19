import { assets } from '../assets/assets';

const CustomDropdown = ({ userData, selectedAddress, setSelectedAddress }) => {
	const showSelectedValue = (address) => {
		const formattedAddress = `${address.firstname} ${address.lastname}, ${address.street}, ${address.city}, ${address.state} - ${address.pincode}`;
		return formattedAddress;
	};

	return (
		<div className='group relative'>
			<select
				name='address'
				value={selectedAddress || ''}
				className='hidden'
				readOnly
			></select>

			<div
				className='bg-white text-black px-4 py-1.5 pr-[25px] rounded-md w-[150px] sm:w-[200px] cursor-pointer
               flex items-center overflow-hidden relative border-2 border-gray-300 text-sm sm:text-base'
			>
				<span className='truncate'>
					{(selectedAddress && showSelectedValue(selectedAddress)) ||
						'Select Address'}
				</span>
				<img
					className='absolute right-[10px] h-[10px] rotate-90'
					src={assets.backIcon}
					alt=''
				/>
			</div>

			{/* Dropdown List */}
			<ul className='group-hover:block hidden absolute bg-white border border-gray-300 w-[150px] sm:w-[200px] rounded-md shadow-lg z-10 text-sm sm:text-base'>
				<li
					className='px-4 py-2 cursor-pointer hover:bg-emerald-600 hover:text-white'
					onClick={() => setSelectedAddress('')}
				>
					Select Address
				</li>
				{userData.addresses.map((address, index) => (
					<li
						key={index}
						className='px-4 py-2 cursor-pointer hover:bg-emerald-600 hover:text-white border rounded shadow bg-slate-100 capitalize'
						onClick={() => setSelectedAddress(address)}
					>
						{`${address.firstname} ${address.lastname}, ${address.street}, ${address.city}, ${address.state} - ${address.pincode}`}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CustomDropdown;
