import { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../context/shopContext';
import ProductItem from './ProductItem';
const RelatedProducts = ({ productId, category, subCategory }) => {
	const { products } = useContext(ShopContext);
	const [relatedProducts, setRelatedProducts] = useState([]);

	const fetchRelatedProducts = async () => {
		if (products.length > 0) {
			let productsCopy = products.filter((item) => item._id !== productId);

			productsCopy = productsCopy.filter((item) => category === item.category);

			productsCopy = productsCopy.filter(
				(item) => item.subCategory === subCategory
			);

			setRelatedProducts(productsCopy);
		}
	};

	useEffect(() => {
		fetchRelatedProducts();
	}, [productId, products]);

	return (
		relatedProducts && (
			<div>
				<div className='text-2xl text-center'>
					<Title text1='RELATED' text2='PRODUCTS' />
				</div>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 gap-y-5'>
					{relatedProducts.map((item, index) => (
						<ProductItem
							key={index}
							id={item._id}
							image={item.image}
							name={item.name}
							price={item.price}
						/>
					))}
				</div>
			</div>
		)
	);
};

export default RelatedProducts;
