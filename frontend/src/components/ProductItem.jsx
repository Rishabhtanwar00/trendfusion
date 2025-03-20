import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets';

const ProductItem = ({ id, image, name, price }) => {
	const { currency } = useContext(ShopContext);

	return (
		<Link
			to={`/product/${id}`}
			className='text-gray-700 cursor-pointer border p-2 rounded'
		>
			<div className='overflow-hidden relative'>
				<img
					className='w-[50px] h-auto absolute top-[3px] left-[3px] z-10'
					src={assets.trendfusionLogo}
					alt=''
				/>
				<img
					className='hover:scale-110 transition duration-300 ease-in-out'
					src={image[0]}
					alt=''
				/>
			</div>
			<p className='mt-3 mb-1 text-sm'>{name}</p>
			<p className='font-medium text-sm'>
				{currency} {price}
			</p>
		</Link>
	);
};

export default ProductItem;
