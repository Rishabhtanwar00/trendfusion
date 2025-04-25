import { useContext } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/shopContext';

const CartItem = ({ item, productData }) => {
	const { currency, updateQuantity } = useContext(ShopContext);
	return (
		<div className='border-t border-b flex justify-between items-center gap-5 mb-3 p-2 sm:pr-10 w-full bg-white rounded'>
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
							? updateQuantity(item._id, item.size, Number(e.target.value))
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
};

export default CartItem;
