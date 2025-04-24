import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets.js';
import SearchBar from '../components/SearchBar.jsx';
import { ShopContext } from '../context/shopContext.jsx';
import FilterComponent from '../components/FilterComponent.jsx';
import useProducts from '../hooks/useProducts.js';
import ProductSkeleton from '../components/ProductSkeleton.jsx';
import useDeleteProduct from '../hooks/useDeleteProduct.js';

const ListProducts = () => {
	const { backendUrl, navigate, token } = useContext(ShopContext);
	const { data: products = [], isLoading: productsLoading } = useProducts();
	const { mutate } = useDeleteProduct();
	const [search, setSearch] = useState('');
	const [showFilter, setShowFilter] = useState(false);
	const [filterProducts, setFilterProducts] = useState([]);
	const [sortType, setSortType] = useState('relavent');

	const sortProducts = () => {
		let filterProductsCopy = filterProducts.slice();
		switch (sortType) {
			case 'low-high':
				setFilterProducts(filterProductsCopy.sort((a, b) => a.price - b.price));
				break;
			case 'high-low':
				setFilterProducts(filterProductsCopy.sort((a, b) => b.price - a.price));
				break;
			default:
				setFilterProducts(products);
				break;
		}
	};

	useEffect(() => {
		sortProducts();
	}, [sortType]);

	useEffect(() => {
		if (
			products &&
			JSON.stringify(products) !== JSON.stringify(filterProducts)
		) {
			setFilterProducts(products);
		}
	}, [products]);

	const deleteProduct = async (id) => {
		const decision = confirm('Are you sure you want to remove this product?');
		if (decision)
			try {
				mutate(
					{
						backendUrl,
						token,
						id,
					},
					{
						onError: () => {
							toast.error('Getting error in deleting product.');
						},
						onSuccess: () => {
							toast.success('Product deleted successfully.');
						},
					}
				);
			} catch (err) {
				console.log(
					'error in deleting product in list products page: ' + err.message
				);
				toast.error(err.message);
			}
	};

	return (
		<div className='min-h-screen'>
			{showFilter && (
				<FilterComponent
					products={products}
					setFilterProducts={setFilterProducts}
					showFilter={showFilter}
					setShowFilter={setShowFilter}
					search={search}
				/>
			)}
			<div className='heading mb-5'>
				<h1 style={{ '--bg-color': '#f02028' }}>All Products</h1>
			</div>
			<div className='flex justify-between items-center'>
				<button
					onClick={() => setShowFilter(!showFilter)}
					className='text-base text-black font-medium flex items-center'
				>
					FILTER
					<img
						loading='lazy'
						className={`${
							showFilter ? 'rotate-90' : ''
						} max-w-[8px] w-auto h-auto ml-2 transition-all duration-75 ease-in-out cursor-pointer`}
						src={assets.backIcon}
						alt='Arrow icon'
					/>
				</button>
				<SearchBar
					placeholder='Search product here'
					search={search}
					setSearch={setSearch}
				/>
			</div>

			<div className=''>
				<div className='w-full hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr] bg-gradient-to-r from-red-600 to-red-700 shadow-md shadow-red-800 text-white rounded px-2 py-1 mt-5 text-left tracking-wider'>
					<p>Image</p>
					<p>Name</p>
					<p>Category</p>
					<div className='flex items-center gap-1'>
						<p
							className='cursor-pointer'
							onClick={() => setSortType('relavent')}
						>
							Price
						</p>
						<div className='flex flex-col'>
							<button onClick={() => setSortType('high-low')}>
								<img
									loading='lazy'
									className={`w-[8px] h-auto ${
										sortType === 'high-low' ? 'opacity-100' : 'opacity-80'
									}`}
									src={assets.upIconWhite}
									alt='Up Arrow icon'
								/>
							</button>
							<button onClick={() => setSortType('low-high')}>
								<img
									loading='lazy'
									className={`w-[8px] h-auto rotate-180 ${
										sortType === 'low-high' ? 'opacity-100' : 'opacity-80'
									}`}
									src={assets.upIconWhite}
									alt='Up Arrow icon'
								/>
							</button>
						</div>
					</div>
					<p className='text-center'>Action</p>
				</div>
				{!productsLoading ? (
					filterProducts.length > 0 ? (
						filterProducts.map((item, index) => (
							<div key={index}>
								<div className='w-full hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr] border px-2 py-1 mt-5 text-left text-base items-center bg-white tracking-wide rounded'>
									<img
										loading='lazy'
										className='w-12'
										src={item.image[0]}
										alt={`${item.name} img`}
									/>
									<p>{item.name}</p>
									<p>{item.category}</p>
									<p>
										{'₹ '}
										{item.price}
									</p>
									<div className='flex gap-3 justify-center'>
										<button
											onClick={() => navigate(`/update-product/${item._id}`)}
											className='text-center px-2 py-0.5 bg-gradient-to-r from-green-600 to-green-700 shadow shadow-green-800 rounded text-white'
										>
											Update
										</button>
										<button
											onClick={() => deleteProduct(item._id)}
											className='rounded-full bg-gradient-to-r from-red-600 to-red-700 shadow shadow-red-800 w-fit p-2'
										>
											<img
												loading='lazy'
												className='w-[20px]'
												src={assets.deleteIcon}
												alt='delete icon'
											/>
										</button>
									</div>
								</div>
								<div className='w-full flex-col items-center justify-center sm:hidden border px-2 py-1 mt-5 text-left text-base'>
									<div className='flex justify-start gap-5'>
										<img
											loading='lazy'
											className='w-12'
											src={item.image[0]}
											alt={`${item.name} img`}
										/>
										<div className=''>
											<p>{item.name}</p>
											<p className='text-gray-600'>Category: {item.category}</p>
										</div>
									</div>
									<div className='flex justify-between mt-3 mb-1 pr-3'>
										<p>
											{'₹ '}
											{item.price}
										</p>

										<div className='flex gap-3 justify-center'>
											<button
												onClick={() => navigate(`/update-product/${item._id}`)}
												className='text-center px-2 py-0.5 bg-gradient-to-r from-green-600 to-green-700 shadow shadow-green-800 rounded text-white'
											>
												Update
											</button>
											<button
												onClick={() => deleteProduct(item._id)}
												className='rounded-full bg-gradient-to-r from-red-600 to-red-700 shadow shadow-red-800 w-fit p-2'
											>
												<img
													loading='lazy'
													className='w-[20px]'
													src={assets.deleteIcon}
													alt='delete icon'
												/>
											</button>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<p className='text-xl font-semibold text-center mt-20'>
							No Products Found
						</p>
					)
				) : (
					<>
						{[...Array(8)].map((_, index) => (
							<ProductSkeleton key={index} />
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default ListProducts;
