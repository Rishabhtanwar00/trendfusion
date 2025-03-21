import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import BackButton from '../components/BackButton';
const Product = () => {
	const { productId } = useParams();
	const { products, currency, addToCart } = useContext(ShopContext);
	const [productData, setProductData] = useState(false);
	const [image, setImage] = useState('');
	const [size, setSize] = useState('');

	const fetchProductData = async () => {
		products.map((item) => {
			if (item._id === productId) {
				setProductData(item);
				setImage(item.image[0]);
				return null;
			}
		});
	};

	useEffect(() => {
		fetchProductData();
	}, [productId, products]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [productId]);

	return (
		productData && (
			<section className='mt-5 mb-10'>
				<BackButton />
				<div className='mt-5 mb-10'>
					<div className='flex flex-col md:flex-row gap-10'>
						<div className='flex flex-1 flex-col-reverse md:flex-row gap-5'>
							<div className='flex flex-row md:flex-col md:flex-nowrap gap-3 w-full sm:w-[18.7%]'>
								{productData.image.map((item, index) => (
									<img
										className='w-[22.5%] sm:w-full flex-shrink-0 cursor-pointer'
										key={index}
										src={item}
										alt='product img'
										onClick={() => setImage(item)}
									/>
								))}
							</div>
							<div className='w-full sm:w-[80%]'>
								<img className='w-full h-auto' src={image} alt='' />
							</div>
						</div>
						<div className='flex flex-1 flex-col gap-5'>
							<p className='font-medium text-2xl'>{productData.name}</p>
							<div className='flex gap-1 items-center'>
								<img
									className='w-[15px] h-fit'
									src={assets.starIcon}
									alt='star icon'
								/>
								<img
									className='w-[15px] h-fit'
									src={assets.starIcon}
									alt='star icon'
								/>
								<img
									className='w-[15px] h-fit'
									src={assets.starIcon}
									alt='star icon'
								/>
								<img
									className='w-[15px] h-fit'
									src={assets.starIcon}
									alt='star icon'
								/>
								<img
									className='w-[15px] h-fit'
									src={assets.starFadedIcon}
									alt='star icon'
								/>
								<p className='ml-3'>(75)</p>
							</div>
							<p className='font-medium text-3xl mt-2'>
								{currency}
								{productData.price}
							</p>
							<p className='text-gray-500'>{productData.description}</p>
							<p>Select Size</p>
							<div className='flex'>
								{productData.sizes.map((item, index) => (
									<button
										key={index}
										className={`w-12 h-12 border-2 mr-3 bg-gray-100 text-black ${
											item === size ? 'border-[#d41e26]' : ''
										}   `}
										onClick={() => setSize(item)}
									>
										{item}
									</button>
								))}
							</div>
							<button
								onClick={() => addToCart(productData._id, size)}
								className='border-2 border-[#d41e26] bg-[#f02028] text-white rounded px-5 py-3 w-fit mt-3 active:scale-90 transition-all ease-in-out duration-150'
							>
								Add to Cart
							</button>
							<div className='text-gray-500 text-sm'>
								<hr className='my-3 w-full h-[1px] bg-gray-500' />
								<p>100% Original product.</p>
								<p>Cash on delivery is available on this product.</p>
								<p>Easy return and exchange policy within 7 days.</p>
							</div>
						</div>
					</div>
					<div className='my-16'>
						<div className='flex'>
							<p className='border text-sm font-bold px-4 py-3 w-fit'>
								Description
							</p>
							<p className='border text-sm px-4 py-3 w-fit text-gray-500'>
								Reviews (35)
							</p>
						</div>
						<div className='flex flex-col gap-5 border px-4 py-3 text-sm text-gray-500'>
							<p className=''>
								An e-commerce website is an online platform that facilitates the
								buying and selling of products or services over the internet. It
								serves as a virtual marketplace where businesses and individuals
								can showcase their products, interact with customers, and
								conduct transactions without the need for a physical presence.
								E-commerce websites have gained immense popularity due to their
								convenience, accessibility, and the global reach they offer.
							</p>
							<p>
								E-commerce websites typically display products or services along
								with detailed descriptions, images, prices, and any available
								variations (e.g., sizes, colors). Each product usually has its
								own dedicated page with relevant information.
							</p>
						</div>
					</div>
					<RelatedProducts
						productId={productId}
						category={productData.category}
						subCategory={productData.subCategory}
					/>
				</div>
			</section>
		)
	);
};

export default Product;
