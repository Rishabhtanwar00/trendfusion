import { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../context/shopContext';
import ProductItem from './ProductItem';
import ProductItemSkeleton from './ProductItemSkeleton';
const RelatedProducts = ({ productId, category, subCategory }) => {
	const { products } = useContext(ShopContext);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [activeSizeItemId, setActiveSizeItemId] = useState(null);

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
			<div className='bg-[#f6f4f1] py-16 px-[20px] sm:px-[40px]'>
				<div className='text-2xl text-center pb-5'>
					<Title text1='RELATED' text2='PRODUCTS' />
				</div>
				<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-5 gap-y-5 items-center'>
					{relatedProducts.length!==0?relatedProducts.map((item, index) => (
						<ProductItem
							key={index}
							id={item._id}
							image={item.image}
							name={item.name}
							price={item.price}
							sizes={item.sizes}
							activeSizeItemId={activeSizeItemId}
							setActiveSizeItemId={setActiveSizeItemId}
						/>
					)): (
						<>
							{[...Array(5)].map((_, index) => (
								<ProductItemSkeleton key={index} />
							))}
						</>
					)}
				</div>
			</div>
		)
	);
};

export default RelatedProducts;
