import { useContext, useState } from 'react';
import BackButton from '../components/BackButton';
import Title from '../components/Title';
import { ShopContext } from '../context/shopContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Wishlist = () => {
	const {
		currency,
		token,
		backendUrl,
		userData,
		setRefetchUserData,
		addToCart,
	} = useContext(ShopContext);
	const [showSizes, setShowSizes] = useState(false);

	const handleSizeClick = (id, sizeValue) => {
		addToCart(id, sizeValue);
		RemoveItemFromWishlist(id);
		setShowSizes(false);
	};
	const RemoveItemFromWishlist = async (productId) => {
		if (token) {
			const { data } = await axios.post(
				`${backendUrl}/api/user/remove-wishlist`,
				{ productId },
				{ headers: { token } }
			);

			if (data.error) {
				toast.error(data.error);
			} else {
				toast.success(data.msg);
			}
			setRefetchUserData(true);
		}
	};
	return (
		<section className='flex flex-col max-w-[1200px] mx-auto py-10 px-[20px] sm:px-[40px]'>
			<BackButton />
			<div className='w-full my-5 p-4 sm:p-6 bg-white shadow-lg border rounded-lg tracking-wide'>
				<div className='text-2xl'>
					<Title text1='YOUR' text2='WISHLIST' />
				</div>

				{userData.wishlist && userData.wishlist.length !== 0 ? (
					<div className='flex flex-wrap justify-center sm:justify-start gap-5 mt-5'>
						{userData.wishlist.map((item, index) => (
							<div
								key={index}
								className='flex flex-col items-start border w-[250px] rounded-lg shadow-lg p-2 border-gray-500'
							>
								<img className='w-full h-fit' src={item.image[0]} alt='' />
								<div className='my-2 mt-4'>
									<p className='text-sm tracking-wide'>{item.name}</p>
									<p className='font-semibold'>
										{currency} {item.price}
									</p>
								</div>
								<div className='relative w-full mt-2 overflow-hidden rounded'>
									<p
										onClick={() => setShowSizes(true)}
										className='w-full p-2 bg-emerald-600 text-white text-center mb-2 text-sm rounded cursor-pointer'
									>
										Move to Cart
									</p>
									<div
										className='absolute top-0 w-full h-fit flex items-center justify-center gap-2 bg-emerald-600 px-2 py-1 rounded transition-all ease-in-out duration-150 origin-top'
										style={{
											transform: `${
												showSizes ? 'translateY(0)' : 'translateY(-100px)'
											}`,
										}}
									>
										{item.sizes.map((size, index) => (
											<p
												key={index}
												onClick={() => handleSizeClick(item._id, size)}
												className='p-1 min-w-[30px] text-center bg-white text-black border border-black rounded text-sm active:scale-90 transition-all ease-in-out duration-150'
											>
												{size}
											</p>
										))}
									</div>
									<button
										onClick={() => setShowSizes(false)}
										className='absolute top-[0px] right-[0px] p-1 shadow bg-white active:scale-90 transition-all ease-in-out duration-150'
										style={{
											opacity: `${showSizes ? '1' : '0'}`,
										}}
									>
										<img className='w-2 h-2' src={assets.crossIcon} alt='' />
									</button>
								</div>
								<p
									onClick={() => RemoveItemFromWishlist(item._id)}
									className='w-full p-2 bg-red-600 text-white text-center text-sm rounded cursor-pointer'
								>
									Remove from Wishlist
								</p>
							</div>
						))}
					</div>
				) : (
					<div className='flex flex-col items-center mt-5'>
						<p className='text-base text-gray-900 text-center'>
							Wishlist is Empty. Shop Amazing Products now.
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
		</section>
	);
};

export default Wishlist;
