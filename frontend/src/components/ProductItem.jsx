import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';

const ProductItem = ({ id, image, name, price }) => {
	const { currency } = useContext(ShopContext);

	return (
		<Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
			<div className='overflow-hidden'>
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
