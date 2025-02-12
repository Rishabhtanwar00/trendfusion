import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
	const { products } = useContext(ShopContext);
	const [bestSeller, setBestSeller] = useState([]);

	useEffect(() => {
		setBestSeller(products.filter((item) => item.bestseller).slice(0, 5));
	}, [products]);

	return (
		<div className='my-10'>
			<div className='text-center text-3xl py-8'>
				<Title text1='BEST' text2='SELLER' />
				<p className='w-full sm:w-3/4 m-auto text-sm md:text-base text-gray-600'>
					Trending Now! Discover our best-selling styles loved by
					fashion-forward shoppers. These hot picks are flying off the
					shelves-grab yours before they’re gone!
				</p>
			</div>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 gap-y-5'>
				{bestSeller.map((item) => (
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

export default BestSeller;
