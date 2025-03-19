import { useContext, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets.js';
import Title from '../components/Title.jsx';
import AddressForm from '../components/AddressForm.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
	const { userData, backendUrl, token, setRefetchUserData, setToken } =
		useContext(ShopContext);
	const [showAddForm, setShowAddForm] = useState(false);
	const [address, setAddress] = useState('');
	const [addressType, setAddressType] = useState('add');

	const handleLogout = () => {
		const response = confirm('You will be logged out.');
		if (response) {
			setToken('');
			localStorage.removeItem('token');
		}
	};

	const deleteAddress = async (addressId) => {
		try {
			const response = confirm('Are you sure you want to delete this address?');

			if (response) {
				const { data } = await axios.post(
					`${backendUrl}/api/user/remove-address`,
					{ addressId },
					{
						headers: {
							token,
						},
					}
				);

				if (data.error) {
					console.log('error in deleting address: ' + data.error);
					return;
				}

				setRefetchUserData(true);
			}
		} catch (err) {
			console.log('error in deleteAddress: ' + err.message);
		}
	};

	const markAddressDefault = async (addressId) => {
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/user/default-address`,
				{ addressId },
				{
					headers: {
						token,
					},
				}
			);

			if (data.error) {
				console.log('error in marking address default: ' + data.error);
				return;
			}

			setRefetchUserData(true);
		} catch (err) {
			console.log('error in markAddressDefault: ' + err.message);
		}
	};

	return (
		<div className='max-w-3xl mx-auto my-10 p-4 sm:p-6 bg-white shadow-lg border rounded-lg tracking-wide'>
			<AddressForm
				isOpen={showAddForm}
				onClose={() => setShowAddForm(false)}
				addressType={addressType}
				address={address}
			/>
			<div className='flex gap-2 sm:gap-5 items-start sm:items-center justify-between tracking-wider px-0 sm:px-4'>
				<div className=''>
					<h1 className='text-[25px] sm:text-[30px] font-semibold'>
						Hey, <span className='block sm:inline-block'>{userData.name}</span>
					</h1>
					<p className='text-sm sm:text-base'>
						<strong>Email:</strong> {userData.email}
					</p>
					<p className='text-sm sm:text-base'>
						<strong>DOB:</strong> dd/mm/yyyy
					</p>
				</div>
				<div className=''>
					<img
						className='h-[60px] sm:h-[80px] w-auto'
						src={assets.profileIcon}
						alt=''
					/>
				</div>
			</div>
			<div className='mt-10 p-4 sm:p-6 bg-white shadow-lg border rounded-lg tracking-wide'>
				<div className='flex gap-5 justify-between'>
					<div className='text-base sm:text-xl'>
						<Title text1='MY' text2='ADDRESSES' />
					</div>
					<button
						onClick={() => {
							setShowAddForm(true);
							setAddressType('add');
							setAddress('');
						}}
						className='bg-emerald-600 px-2 py-1 rounded text-white w-fit h-fit mb-1 text-sm sm:text-base'
					>
						Add Address
					</button>
				</div>
				<div className='flex flex-wrap justify-between gap-5 mt-5'>
					{userData.addresses &&
						userData.addresses.map((address, index) => (
							<div
								className='flex flex-col items-start border px-5 py-4 w-[320px] rounded-lg shadow-lg'
								key={index}
							>
								{address.isDefault && (
									<p className='bg-blue-600 px-2 py-1 rounded text-white w-fit h-fit mb-1'>
										Default
									</p>
								)}
								<div className='mb-2'>
									<p>
										{address.firstname},{address.lastname}- {address.street},
										{address.city},{address.state}-{address.pincode},
										{address.country}
									</p>
									<p>{address.phone}</p>
								</div>
								<div className='flex w-full justify-between'>
									{!address.isDefault && (
										<button
											onClick={() => markAddressDefault(address._id)}
											className='bg-emerald-600 px-2 py-1 rounded text-white w-fit h-fit'
										>
											Mark Default
										</button>
									)}
									<button
										onClick={() => {
											setShowAddForm(true);
											setAddressType('update');
											setAddress(address);
										}}
										className='bg-emerald-600 px-2 py-1 rounded text-white w-fit h-fit'
									>
										Edit
									</button>
									<button
										onClick={() => deleteAddress(address._id)}
										className='bg-red-600 px-2 py-1 rounded text-white w-fit h-fit'
									>
										Delete
									</button>
								</div>
							</div>
						))}
				</div>
			</div>
			<Link
				to='/orders'
				className='mt-5 flex justify-between items-center w-full p-4 sm:p-6 bg-white shadow-lg border rounded-lg tracking-wider cursor-pointer'
			>
				<div className=''>
					<p className='font-medium text-xl'>My Orders</p>
					<p className='text-gray-600 text-sm mt-1'>
						(You can View/Track or Cancel you order here)
					</p>
				</div>
				<img className='h-[15px] w-auto' src={assets.backIcon} alt='' />
			</Link>
			<div
				onClick={() => handleLogout()}
				className='mt-5 flex justify-between items-center w-full p-4 sm:p-6 bg-white shadow-lg border rounded-lg tracking-wider cursor-pointer'
			>
				<div className=''>
					<p className='font-medium text-xl'>Logout</p>
					<p className='text-gray-600 text-sm mt-1'>
						(You will be logged out from this device)
					</p>
				</div>
				<img className='h-[15px] w-auto' src={assets.backIcon} alt='' />
			</div>
		</div>
	);
};

export default Profile;
