import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
const Cart = () => {
	const {
		products,
		currency,
		cartItems,
		updateQuantity,
		getCartAmount,
		navigate,
	} = useContext(ShopContext);
	const [cartData, setCartData] = useState([]);
	const [showMessage, setShowMessage] = useState(true);

	const loadCartData = () => {
		let productData = [];
		for (const items in cartItems) {
			for (const item in cartItems[items]) {
				if (cartItems[items][item] > 0) {
					productData.push({
						_id: items,
						size: item,
						quantity: cartItems[items][item],
					});
				}
			}
		}
		setCartData(productData);
	};
	useEffect(() => {
		loadCartData();
	}, [cartItems]);

	useEffect(() => {
		const interval = setInterval(() => {
			setShowMessage(false);
		}, [10000]);
		return () => clearInterval(interval);
	}, [showMessage]);

	useEffect(() => {
		if (getCartAmount() < 1000) {
			setShowMessage(true);
		} else {
			setShowMessage(false);
		}
	}, [getCartAmount]);

	return (
		<section className='relative bg-[#eff2f1] flex flex-col pt-5 pb-10 px-[20px] sm:px-[40px]'>
			{showMessage && (
				<div className='absolute flex gap-3 items-center right-[10px] top-[10px] pl-3 pr-1 py-1 bg-gradient-to-r from-emerald-600 to-emerald-900 shadow-lg shadow-emerald-800 rounded text-white sm:max-w-fit max-w-[300px]'>
					<p className=''>Get Free Delivery on order above {currency} 1000.</p>
					<button
						onClick={() => setShowMessage(false)}
						className='rounded bg-white p-[5px] h-fit'
					>
						<img
							loading='lazy'
							className='h-2 w-2'
							src={assets.crossIcon}
							alt='Cross icon'
						/>
					</button>
				</div>
			)}
			<BackButton />
			<div className='mt-5 mb-10 flex flex-col lg:flex-row gap-10'>
				<div className='w-full lg:max-w-[65%] xl:max-w-[50%]'>
					<div className='text-2xl'>
						<Title text1='YOUR' text2='CART' />
					</div>
					<div className='flex flex-col'>
						{cartData.length > 0 ? (
							cartData.map((item, index) => {
								const productData = products.find(
									(product) => product._id === item._id
								);

								return (
									<div
										key={index}
										className='border-t border-b flex justify-between items-center gap-5 mb-3 p-2 sm:pr-10 w-full bg-white rounded'
									>
										<div className='flex gap-5'>
											<img
												loading='lazy'
												className='max-h-[120px] h-auto w-auto rounded'
												src={productData.image[0]}
												alt={`${productData.name} img`}
											/>
											<div className=''>
												<p className='font-medium'>{productData.name}</p>
												<div className='flex items-center gap-2 mt-2'>
													<p className='text-gray-600'>
														{currency} {productData.price}
													</p>
													<p className='bg-emerald-600 text-sm text-white px-2 py-1'>
														{item.size}
													</p>
												</div>
											</div>
										</div>
										<div className='flex flex-col sm:flex-row items-end sm:items-center justify-center gap-5 xl:gap-10'>
											<input
												onChange={(e) =>
													e.target.value !== '0' || e.target.value !== ''
														? updateQuantity(
																item._id,
																item.size,
																Number(e.target.value)
														  )
														: null
												}
												className='border border-gray-400 rounded py-1 px-2 w-16 h-fit'
												type='number'
												min={1}
												defaultValue={item.quantity}
											/>

											<button
												onClick={() => updateQuantity(item._id, item.size, 0)}
												className='rounded-full border-2 bg-[#f02028] w-fit p-2'
											>
												<img
													loading='lazy'
													className='w-[20px]'
													src={assets.deleteIcon}
													alt='delete icon'
												/>
											</button>
										</div>
									</div>
								);
							})
						) : (
							<div className='flex flex-col items-center mt-5'>
								<p className='text-base text-gray-900 text-center'>
									Cart is Empty. Shop Amazing Products now.
								</p>
								<Link
									to='/collection'
									className='px-2 py-1 bg-gradient-to-r from-emerald-600 to-emerald-900 shadow shadow-emerald-800 rounded outline-none text-white text-[16px] w-fit mt-5'
								>
									Browse Collection
								</Link>
							</div>
						)}
					</div>
				</div>
				<div className='w-full lg:max-w-[35%] xl:max-w-[50%]'>
					<CartTotal />
					<button
						onClick={() => {
							if (getCartAmount() > 0) {
								navigate('/placeorder');
							} else {
								toast.error('Empty cart! Add items first.');
								return;
							}
						}}
						className='bg-gradient-to-r from-emerald-600 to-emerald-900 shadow shadow-emerald-800 rounded text-white py-2 px-5 mt-5 w-fit float-end text-base active:scale-90 transition-all duration-150 ease-in-out'
					>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</section>
	);
};

export default Cart;
