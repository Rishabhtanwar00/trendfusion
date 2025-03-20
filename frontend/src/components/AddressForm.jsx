import { useContext, useEffect, useState } from 'react';
import Title from './Title';
import axios from 'axios';
import { ShopContext } from '../context/shopContext';

const AddressForm = ({ isOpen, onClose, addressType = 'add', address }) => {
	const { backendUrl, token, setRefetchUserData } = useContext(ShopContext);
	const [formData, setFormData] = useState({
		firstname: '',
		lastname: '',
		street: '',
		city: '',
		state: '',
		pincode: '',
		country: '',
		phone: '',
		isDefault: false,
	});

	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let url = `${backendUrl}/api/user/add-address`;
			let addressDataJSON = { address: formData };

			if (addressType === 'update') {
				url = `${backendUrl}/api/user/update-address`;
				addressDataJSON.addressId = address._id;
			}

			const { data } = await axios.post(url, addressDataJSON, {
				headers: {
					token,
				},
			});

			if (data.error) {
				console.log('error in addrss form: ' + data.error);
			}

			console.log(data.msg);
			setRefetchUserData(true);
			onClose();
		} catch (err) {
			console.log('error in handleSubmit of address form: ' + err.message);
		}
	};

	useEffect(() => {
		if (addressType === 'add') {
			setFormData({
				firstname: '',
				lastname: '',
				street: '',
				city: '',
				state: '',
				pincode: '',
				country: '',
				phone: '',
				isDefault: false,
			});
		} else if (address) {
			setFormData((prev) => ({ ...prev, ...address }));
		}
	}, [addressType, address]);
	// useEffect(() => {
	// 	if (isOpen) {
	// 		document.body.classList.add('no-scroll');
	// 	} else {
	// 		document.body.classList.remove('no-scroll');
	// 	}

	// 	// Clean up on unmount
	// 	return () => document.body.classList.remove('no-scroll');
	// }, [isOpen]);
	return (
		<div
			className='fixed top-0 left-0 flex items-center justify-center w-full h-full p-2 bg-emerald-600 bg-clip-padding backdrop-filter backdrop-blur-[3px] bg-opacity-10 transition-transform ease-in-out duration-150'
			style={{ transform: `${isOpen ? 'scale(1)' : 'scale(0)'}` }}
		>
			<div className='w-full sm:max-w-lg p-5 rounded-xl shadow bg-white'>
				<div className='flex justify-between gap-5'>
					<div className='text-xl mb-0'>
						<Title
							text1={addressType === 'add' ? 'ADD' : 'UPDATE'}
							text2='ADDRESS'
						/>
					</div>
					<button
						onClick={onClose}
						className='px-2 py-0.5 bg-[#f02028] text-white rounded h-fit w-fit'
					>
						close
					</button>
				</div>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-4 items-center w-full sm:max-w-[480px] mt-5'
				>
					<div className='flex gap-4'>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='First Name'
							required
							onChange={(e) => handleChange('firstname', e.target.value)}
							value={formData.firstname}
						/>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='Last Name'
							required
							onChange={(e) => handleChange('lastname', e.target.value)}
							value={formData.lastname}
						/>
					</div>
					<div className='flex gap-4'>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='Street'
							required
							onChange={(e) => handleChange('street', e.target.value)}
							value={formData.street}
						/>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='City'
							required
							onChange={(e) => handleChange('city', e.target.value)}
							value={formData.city}
						/>
					</div>
					<div className='flex gap-4'>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='State'
							required
							onChange={(e) => handleChange('state', e.target.value)}
							value={formData.state}
						/>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='Zipcode'
							required
							onChange={(e) => handleChange('pincode', e.target.value)}
							value={formData.pincode}
						/>
					</div>
					<div className='flex gap-4'>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='Country'
							required
							onChange={(e) => handleChange('country', e.target.value)}
							value={formData.country}
						/>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='number'
							placeholder='Phone'
							required
							onChange={(e) => handleChange('phone', e.target.value)}
							value={formData.phone}
						/>
					</div>
					<div className='flex gap-2 w-full ml-1'>
						<input
							className=''
							type='checkbox'
							onChange={() => handleChange('isDefault', !formData.isDefault)}
							checked={formData.isDefault}
						/>
						<p className='text-gray-500'>Mark Default</p>
					</div>

					<input
						className='mx-auto px-4 py-1 bg-emerald-600 text-white w-fit h-fit rounded'
						type='submit'
						value={`${
							addressType === 'add' ? 'Add Address' : 'Update Address'
						}`}
					/>
				</form>
			</div>
		</div>
	);
};

export default AddressForm;
