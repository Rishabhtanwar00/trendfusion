import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
const Cart = () => {
	const { products, currency, cartItems, getCartAmount, navigate } =
		useContext(ShopContext);
	const [cartData, setCartData] = useState([]);
	const [showMessage, setShowMessage] = useState(false);

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
		let showMessageTimeout;

		// Show the message 5 seconds after mount or cart updates,
		// only if cart amount is less than 1000
		if (getCartAmount() < 1000) {
			showMessageTimeout = setTimeout(() => {
				setShowMessage(true);
			}, 5000);
		}

		return () => clearTimeout(showMessageTimeout);
	}, [getCartAmount]);

	useEffect(() => {
		let hideMessageTimeout;

		// Auto-hide message after 10 seconds (only when shown)
		if (showMessage) {
			hideMessageTimeout = setTimeout(() => {
				setShowMessage(false);
			}, 10000);
		}

		return () => clearTimeout(hideMessageTimeout);
	}, [showMessage]);

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
									<CartItem key={index} item={item} productData={productData} />
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
