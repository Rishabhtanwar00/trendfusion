import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets';
// import { assets } from '../assets/assets';

const ProductItem = ({
	id,
	image,
	name,
	price,
	sizes,
	activeSizeItemId,
	setActiveSizeItemId,
}) => {
	const { currency, addToCart, addToWishlist } = useContext(ShopContext);
	const handleSizeClick = (sizeValue) => {
		addToCart(id, sizeValue);
		setActiveSizeItemId(null);
	};

	useEffect(() => {
		setActiveSizeItemId(null);
	}, [id]);

	return (
		<div className='text-[#1b1b1b] bg-white pb-2 cursor-pointer border border-black rounded-lg overflow-hidden relative flex flex-col justify-between h-fit'>
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
				<div className='flex flex-col sm:flex-row items-start md:items-center gap-0.5 md:gap-2 text-center'>
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
					</div>
					<p className='text-[10px] sm:text-[12px] mt-0.5'>178 Reviews</p>
				</div>
			</div>
			<button
				onClick={() => addToWishlist(id)}
				className='absolute top-[0px] right-[8px] rounded-full bg-blue-100 text-white p-1 sm:p-2 w-fit mt-3 active:scale-90 transition-all ease-in-out duration-150 shadow-gray-600 shadow-sm'
			>
				<img className='h-4 w-4' src={assets.wishlistIcon} alt='' />
			</button>
			<button
				onClick={() => setActiveSizeItemId(id)}
				className='absolute bottom-[10px] right-[8px] rounded-full bg-blue-200 text-white p-2 sm:p-3 w-fit mt-3 active:scale-90 transition-all ease-in-out duration-150 shadow-black shadow-sm'
			>
				<img className='h-5 w-5' src={assets.cartIcon} alt='' />
			</button>
			<div
				className='absolute bottom-[8px] right-[8px] grid grid-cols-3 gap-2 bg-blue-200 border-[1.5px] border-blue-800 p-2 py-2 rounded transition-all ease-in-out duration-150 origin-bottom-right'
				style={{
					transform: `${activeSizeItemId === id ? 'scale(1)' : 'scale(0)'}`,
				}}
			>
				{sizes.map((size, index) => (
					<p
						key={index}
						onClick={() => handleSizeClick(size)}
						className='p-1 min-w-[30px] text-center bg-white text-black border border-black rounded text-sm active:scale-90 transition-all ease-in-out duration-150'
					>
						{size}
					</p>
				))}
				<button
					onClick={() => setActiveSizeItemId(null)}
					className='absolute top-[-8px] right-[-8px] p-1 rounded-full shadow bg-white border border-black active:scale-90 transition-all ease-in-out duration-150'
				>
					<img className='w-2 h-2' src={assets.crossIcon} alt='' />
				</button>
			</div>
		</div>
	);
};

export default ProductItem;
