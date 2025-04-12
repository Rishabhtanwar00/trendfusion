import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
// import { assets } from '../assets/assets';

const ProductItem = ({ id, image, name, price }) => {
	const { currency } = useContext(ShopContext);

	return (
		<Link
			to={`/product/${id}`}
			className='text-[#1b1b1b] bg-white pb-3 cursor-pointer border border-black rounded-lg overflow-hidden'
		>
			<div className='overflow-hidden relative rounded-lg mb-3'>
				{/* <div className='absolute top-[0px] left-[0px] z-10 bg-white px-2 py-0.5'>
					<img
						className='w-[60px] h-auto'
						src={assets.trendfusionLogo}
						alt=''
					/>
				</div> */}
				<img
					className='hover:scale-110 transition duration-300 ease-in-out'
					src={image[0]}
					alt=''
				/>
			</div>
			<div className="px-2">
			<p className='mt-3 mb-1 text-sm'>{name}</p>
			<p className='font-medium text-sm'>
				{currency} {price}
			</p></div>
		</Link>
	);
};

export default ProductItem;
