import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';
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

	return (
		<div className='my-10'>
			<div className=''>
				<div className='text-2xl'>
					<Title text1='YOUR' text2='CART' />
				</div>
				<div className='flex flex-col'>
					{cartData.map((item, index) => {
						const productData = products.find(
							(product) => product._id === item._id
						);

						return (
							<div
								key={index}
								className='border-t border-b flex justify-between items-center mb-3 py-2 w-full'
							>
								<div className='flex gap-5'>
									<img
										className='w-[80px] h-fit'
										src={productData.image[0]}
										alt=''
									/>
									<div className=''>
										<p className='font-medium'>{productData.name}</p>
										<div className='flex items-center gap-2 mt-2'>
											<p className='text-gray-600'>
												{currency}
												{productData.price}
											</p>
											<p className='bg-gray-200 text-sm text-black px-2 py-1'>
												{item.size}
											</p>
										</div>
									</div>
								</div>
								<div className='flex justify-evenly w-[50%]'>
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
									<img
										onClick={() => updateQuantity(item._id, item.size, 0)}
										className='w-5 h-fit cursor-pointer'
										src={assets.deleteIcon}
										alt=''
									/>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className='mt-20 flex flex-col justify-end items-end'>
				<div className='w-full sm:max-w-[50%]'>
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
						className='bg-black text-white py-2 px-5 mt-5 w-fit float-end text-base active:scale-90 transition-all duration-150 ease-in-out'
					>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
