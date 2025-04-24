import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets';
// import { assets } from '../assets/assets';

const ProductItem = ({ id, image, name, price, sizes }) => {
	const { currency, addToCart, addToWishlist } = useContext(ShopContext);
	const [showSizes, setShowSizes] = useState(false);

	const handleSizeClick = (sizeValue) => {
		addToCart(id, sizeValue);
		setShowSizes(false);
	};

	return (
		<div className='text-[#1b1b1b] bg-white pb-5 cursor-pointer border border-black rounded-lg overflow-hidden relative flex flex-col justify-between h-fit'>
			<div className='overflow-hidden relative rounded-lg mb-3'>
				<Link to={`/product/${id}`}>
					<img
						loading='lazy'
						className='hover:scale-110 transition duration-300 ease-in-out'
						src={image[0]}
						alt={`${name} img`}
					/>
				</Link>
			</div>
			<div className='px-2'>
				<p className='text-sm'>{name}</p>
				<p className='font-medium text-sm my-1'>
					{currency} {price}
				</p>
				<div className='flex items-center gap-0.5 text-center'>
					<img
						className='w-[12px] h-[12px]'
						src={assets.starIcon}
						alt='Star icon'
					/>
					<img
						className='w-[12px] h-[12px]'
						src={assets.starIcon}
						alt='Star icon'
					/>
					<img
						className='w-[12px] h-[12px]'
						src={assets.starIcon}
						alt='Star icon'
					/>
					<img
						className='w-[12px] h-[12px]'
						src={assets.starIcon}
						alt='Star icon'
					/>
					<img
						className='w-[12px] h-[12px]'
						src={assets.starFadedIcon}
						alt='Star icon'
					/>
					<p className='text-[10px] sm:text-[12px] ml-1 mt-0.5'>178 Reviews</p>
				</div>
			</div>
			<button
				onClick={() => addToWishlist(id)}
				className='absolute top-[0px] right-[8px] rounded-full bg-gray-100 text-white p-2 w-fit mt-3 active:scale-90 transition-all ease-in-out duration-150 shadow-gray-600 shadow-sm'
			>
				<img className='h-4 w-4' src={assets.wishlistIcon} alt='' />
			</button>
			<button
				onClick={() => setShowSizes(true)}
				className='absolute bottom-[40px] sm:bottom-[10px] right-[8px] rounded-full bg-gray-100 text-white p-3 w-fit mt-3 active:scale-90 transition-all ease-in-out duration-150 shadow-black shadow-sm'
			>
				<img className='h-5 w-5' src={assets.cartIcon} alt='' />
			</button>
			<div
				className='absolute bottom-[10px] right-[8px] flex gap-2 bg-white shadow-gray-500 shadow-sm p-2 rounded transition-all ease-in-out duration-150 origin-bottom-right'
				style={{ transform: `${showSizes ? 'scale(1)' : 'scale(0)'}` }}
			>
				{sizes.map((size, index) => (
					<p
						key={index}
						onClick={() => handleSizeClick(size)}
						className='p-2 min-w-[40px] text-center rounded-full bg-emerald-600 text-white active:scale-90 transition-all ease-in-out duration-150'
					>
						{size}
					</p>
				))}
				<button
					onClick={() => setShowSizes(false)}
					className='absolute top-[-5px] right-[-5px] p-1 rounded-full shadow bg-gray-100 active:scale-90 transition-all ease-in-out duration-150'
				>
					<img className='w-2 h-2' src={assets.crossIcon} alt='' />
				</button>
			</div>
		</div>
	);
};

export default ProductItem;
