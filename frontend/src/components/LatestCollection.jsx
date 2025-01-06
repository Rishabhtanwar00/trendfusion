import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
	const { products } = useContext(ShopContext);
	const [latestProducts, setLatestProducts] = useState([]);

	useEffect(() => {
		setLatestProducts(products.slice(0, 10));
	}, [products]);
	
	return (
		<div className='my-10'>
			<div className='text-center text-3xl py-8'>
				<Title text1='LATEST' text2='COLLECTION' />
				<p className='w-3/4 m-auto text-sm md:text-base text-gray-600'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim beatae
					sint iste eveniet dolorem veritatis molestiae repellat nobis
					reprehenderit tempore!
				</p>
			</div>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 gap-y-5'>
				{latestProducts.map((item) => (
					<ProductItem
						key={item._id}
						id={item._id}
						image={item.image}
						name={item.name}
						price={item.price}
					/>
				))}
			</div>
		</div>
	);
};

export default LatestCollection;
