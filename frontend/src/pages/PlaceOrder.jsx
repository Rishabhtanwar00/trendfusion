import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { useState } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/shopContext';
const PlaceOrder = () => {
	const { navigate } = useContext(ShopContext);
	const [paymentMethod, setPaymentMethod] = useState('cod');
	return (
		<form className='my-10'>
			<div className='text-xl mb-4'>
				<Title text1='DELIVERY' text2='INFORMATION' />
			</div>
			<div className='flex flex-col sm:flex-row items-start justify-between gap-10'>
				<div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
					<div className='flex gap-4'>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='First Name'
							required
						/>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='Last Name'
							required
						/>
					</div>
					<input
						className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
						type='email'
						placeholder='Email Address'
						required
					/>
					<input
						className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
						type='text'
						placeholder='Street'
						required
					/>
					<div className='flex gap-4'>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='City'
							required
						/>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='State'
							required
						/>
					</div>
					<div className='flex gap-4'>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='Zipcode'
							required
						/>
						<input
							className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
							type='text'
							placeholder='Country'
							required
						/>
					</div>
					<input
						className='px-4 py-1.5 border border-gray-400 rounded-md w-full'
						type='number'
						placeholder='Phone'
						required
					/>
				</div>
				<div className='flex flex-col gap-5 w-full sm:w-auto'>
					<div className='w-full min-w-80'>
						<CartTotal />
					</div>
					<div className='w-full'>
						<Title text1='PAYMENT' text2='METHOD' />
						<div className='flex flex-col sm:flex-row gap-3 mt-3'>
							<div
								onClick={() => setPaymentMethod('stripe')}
								className='flex items-center justify-start gap-5 px-5 py-2 border cursor-pointer w-full sm:w-fit'
							>
								<p
									className={`h-3 w-3 rounded-full border ${
										paymentMethod === 'stripe' ? 'bg-orange-600' : ''
									}`}
								></p>
								<img
									className='h-5 w-fit'
									src={assets.stripeLogo}
									alt='stripe logo'
								/>
							</div>
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
							onClick={() => navigate('/orders')}
							type='submit'
							className='bg-black text-white px-10 py-2 mt-10 w-100% min-w-[250px] float-end active:scale-90 transition-all duration-150 ease-in-out'
						>
							Place Order
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default PlaceOrder;
