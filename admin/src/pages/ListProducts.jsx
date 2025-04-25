import { useEffect, useState } from 'react';
import { assets } from '../assets/assets.js';
import SearchBar from '../components/SearchBar.jsx';
import FilterComponent from '../components/FilterComponent.jsx';
import useProducts from '../hooks/useProducts.js';
import ProductSkeleton from '../components/ProductSkeleton.jsx';
import ProductItem from '../components/ProductItem.jsx';

const ListProducts = () => {
	const { data: products = [], isLoading: productsLoading } = useProducts();

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
			<>
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
							<ProductItem key={index} item={item} />
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
			</>
		</div>
	);
};

export default ListProducts;
