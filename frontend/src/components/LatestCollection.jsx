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
				<p className='w-full sm:w-3/4 m-auto text-sm md:text-base text-gray-600'>
					Fresh Arrivals! Stay ahead of the trends with our newest collections.
					From casual wear to statement pieces, we’ve got the perfect styles to
					upgrade your wardrobe.
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
