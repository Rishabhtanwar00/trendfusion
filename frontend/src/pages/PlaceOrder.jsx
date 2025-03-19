import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/shopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import CustomDropdown from '../components/CustomDropdown';
const PlaceOrder = () => {
	const {
		navigate,
		products,
		cartItems,
		setCartItems,
		getCartAmount,
		deliveryFee,
		token,
		backendUrl,
		userData,
		setRefetchUserData,
	} = useContext(ShopContext);
	const [paymentMethod, setPaymentMethod] = useState('cod');
	const [selectedAddress, setSelectedAddress] = useState('');

	const [formData, setFormData] = useState({
		firstname: '',
		lastname: '',
		street: '',
		city: '',
		state: '',
		pincode: '',
		country: '',
		phone: '',
	});

	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const initPay = async (order) => {
		const options = {
			key: import.meta.env.VITE_RAZORPAY_KEY_ID,
			amount: order.amount,
			currency: order.currency,
			name: 'Order Payment',
			description: 'Order Payment',
			order_id: order.id,
			receipt: order.receipt,
			handler: async (response) => {
				try {
					const { data } = await axios.post(
						`${backendUrl}/api/order/verify-razorpay`,
						{ razorpay_order_id: response.razorpay_order_id },
						{ headers: { token } }
					);

					if (data.mssg) {
						toast.success(data.mssg);
						setCartItems({});
						navigate('/orders');
					}
				} catch (err) {
					console.log('error in razorpay handler: ' + err.message);
					toast.error(err.message);
				}
			},
		};

		const rzp = new window.Razorpay(options);
		rzp.open();
	};

	const AddAddressSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/user/add-address`,
				{ address: formData },
				{
					headers: {
						token,
					},
				}
			);

			if (data.error) {
				console.log('error in addrss form: ' + data.error);
			}

			toast.success('New Address saved.');
			setRefetchUserData(true);
		} catch (err) {
			console.log('error in handleSubmit of address form: ' + err.message);
		}
	};

	const handlePlaceOrder = async () => {
		try {
			const isFormValid = Object.values(formData).every(
				(value) => value.trim() !== ''
			);

			if (!isFormValid) {
				toast.error('Address fields can not be blank.');
				return;
			}
			const orderItems = [];

			for (const items in cartItems) {
				for (const item in cartItems[items]) {
					if (cartItems[items][item] > 0) {
						const itemInfo = structuredClone(
							products.find((product) => product._id === items)
						);
						if (itemInfo) {
							itemInfo.size = item;
							itemInfo.quantity = cartItems[items][item];
							orderItems.push(itemInfo);
						}
					}
				}
			}

			const orderData = {
				items: orderItems,
				address: formData,
				amount: getCartAmount() + deliveryFee,
			};

			let url = `${backendUrl}/api/order/`;

			// if (paymentMethod === 'stripe') {
			// 	url = url + 'stripe';
			// } else
			if (paymentMethod === 'razorpay') {
				url = url + 'razorpay';
			} else {
				url = url + 'cod';
			}

			const { data } = await axios.post(url, orderData, { headers: { token } });

			if (data.error) {
				toast.error(data.error);
				return;
			}

			if (paymentMethod === 'cod') {
				toast.success(data.mssg);
				setCartItems({});
				navigate('/orders');
			}
			// else if (paymentMethod === 'stripe') {
			// 	if (data.session_url) {
			// 		window.location.replace(data.session_url);
			// 	}
			// }
			else if (paymentMethod === 'razorpay') {
				initPay(data.order);
			}
		} catch (err) {
			console.log('error in handle submit of PlaceOrder: ' + err.message);
			toast.error(err.message);
		}
	};

	useEffect(() => {
		if (selectedAddress) {
			setFormData((prev) => ({
				...prev,
				firstname: selectedAddress.firstname,
				lastname: selectedAddress.lastname,
				street: selectedAddress.street,
				city: selectedAddress.city,
				state: selectedAddress.state,
				pincode: selectedAddress.pincode,
				country: selectedAddress.country,
				phone: selectedAddress.phone,
			}));
		}
	}, [selectedAddress]);

	useEffect(() => {
		if (userData.addresses) {
			const defaultAddress = userData.addresses.find(
				(add) => add.isDefault === true
			);

			if (defaultAddress) {
				setSelectedAddress(defaultAddress);
			}
		}
	}, [userData]);

	return (
		<div className='my-10'>
			<div className='flex items-start justify-between gap-2 w-full sm:max-w-[480px]'>
				<div className='text-base sm:text-xl mb-4'>
					<Title text1='DELIVERY' text2='ADDRESS' />
				</div>
				{userData.addresses && (
					<CustomDropdown
						userData={userData}
						selectedAddress={selectedAddress}
						setSelectedAddress={setSelectedAddress}
					/>
				)}
			</div>
			<div className='flex flex-col sm:flex-row items-start justify-between gap-10'>
				<form
					onSubmit={AddAddressSubmit}
					className='flex flex-col items-center gap-4 w-full sm:max-w-[480px]'
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
					<input
						className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
						type='text'
						placeholder='House/Building/Street'
						required
						onChange={(e) => handleChange('street', e.target.value)}
						value={formData.street}
					/>
					<div className='flex gap-4'>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='City'
							required
							onChange={(e) => handleChange('city', e.target.value)}
							value={formData.city}
						/>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='State'
							required
							onChange={(e) => handleChange('state', e.target.value)}
							value={formData.state}
						/>
					</div>
					<div className='flex gap-4'>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='Zipcode'
							required
							onChange={(e) => handleChange('pincode', e.target.value)}
							value={formData.pincode}
						/>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='Country'
							required
							onChange={(e) => handleChange('country', e.target.value)}
							value={formData.country}
						/>
					</div>
					<input
						className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
						type='number'
						placeholder='Phone'
						required
						onChange={(e) => handleChange('phone', e.target.value)}
						value={formData.phone}
					/>
					{!selectedAddress && (
						<div className='relative w-full pb-[25px]'>
							<p className='absolute bottom-0 text-sm text-gray-600 tracking-wide'>
								*Save this address for future use.
							</p>
							<input
								type='submit'
								value='Add Address'
								className='bg-black text-white px-5 py-2 w-full h-fit rounded text-base active:scale-90 transition-all duration-150 ease-in-out cursor-pointer'
							/>
						</div>
					)}
				</form>
				<div className='flex flex-col gap-5 w-full sm:w-auto'>
					<div className='w-full min-w-80'>
						<CartTotal />
					</div>
					<div className='w-full'>
						<Title text1='PAYMENT' text2='METHOD' />
						<div className='flex flex-col sm:flex-row gap-3 mt-3'>
							<div
								onClick={() => setPaymentMethod('razorpay')}
								className='flex items-center justify-start gap-5 px-5 py-2 border cursor-pointer w-full sm:w-fit'
							>
								<p
									className={`h-3 w-3 rounded-full border ${
										paymentMethod === 'razorpay' ? 'bg-orange-600' : ''
									}`}
								></p>
								<img
									className='h-5 w-fit'
									src={assets.razorpayLogo}
									alt='stripe logo'
								/>
							</div>
							<div
								onClick={() => setPaymentMethod('cod')}
								className='flex items-center justify-start gap-5 px-5 py-2 border cursor-pointer w-full sm:w-fit'
							>
								<p
									className={`h-3 w-3 rounded-full border ${
										paymentMethod === 'cod' ? 'bg-orange-600' : ''
									}`}
								></p>
								<p className='text-sm font-medium text-gray-500'>
									CASH ON DELIVERY
								</p>
							</div>
						</div>
						<button
							onClick={() => handlePlaceOrder()}
							className='bg-black text-white px-10 py-2 mt-10 w-100% min-w-[250px] float-end active:scale-90 transition-all duration-150 ease-in-out'
						>
							Place Order
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrder;
