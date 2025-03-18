import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { ShopContext } from '../context/shopContext.jsx';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader.jsx';
import PriceRangeSlider from '../components/PriceRangeSlider.jsx';

const Collection = () => {
	const { products, search, showSearch, loading, setLoading } =
		useContext(ShopContext);
	const [showFilter, setShowFilter] = useState(false);
	const [filterProducts, setFilterProducts] = useState([]);
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const [sortType, setSortType] = useState('relavent');
	const [priceRange, setPriceRange] = useState([0, 10000]);

	const toogleFilter = () => {
		setShowFilter(!showFilter);
	};

	const handleCategory = (e) => {
		if (category.includes(e.target.value)) {
			setCategory((prev) => prev.filter((item) => item !== e.target.value));
		} else {
			setCategory((prev) => [...prev, e.target.value]);
		}
	};

	const handleSubCategory = (e) => {
		if (subCategory.includes(e.target.value)) {
			setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
		} else {
			setSubCategory((prev) => [...prev, e.target.value]);
		}
	};

	const applyFilter = () => {
		setLoading(true);
		let productsCopy = products.slice();

		if (showSearch && search) {
			productsCopy = productsCopy.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}

		if (category.length > 0) {
			productsCopy = productsCopy.filter((item) =>
				category.includes(item.category)
			);
		}

		if (subCategory.length > 0) {
			productsCopy = productsCopy.filter((item) =>
				subCategory.includes(item.subCategory)
			);
		}
		productsCopy = productsCopy.filter(
			(item) =>
				parseInt(item.price) >= priceRange[0] &&
				parseInt(item.price) <= priceRange[1]
		);

		setFilterProducts(productsCopy);
		setLoading(false);
	};

	useEffect(() => {
		console.log(priceRange[0] + ' : ' + priceRange[1]);
	}, [priceRange]);

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
				applyFilter();
		}
	};

	useEffect(() => {
		applyFilter();
	}, [category, subCategory, search, showFilter, products, priceRange]);

	useEffect(() => {
		sortProducts();
	}, [sortType]);

	return (
		<div className='flex flex-col sm:flex-row gap-10 my-10'>
			<div className='w-fit text-left'>
				<p
					onClick={toogleFilter}
					className='text-base text-black font-medium flex items-center'
				>
					FILTERS
					<img
						className={`${
							showFilter ? 'rotate-90' : ''
						} sm:hidden max-w-[10px] w-auto h-auto ml-2 transition-all duration-75 ease-in-out cursor-pointer`}
						src={assets.backIcon}
						alt=''
					/>
				</p>

				<div
					className={`w-[200px] text-base text-gray-500 border border-black p-3 flex flex-col gap-1 ${
						showFilter ? 'block' : 'hidden'
					} sm:block my-3`}
				>
					<p className=' text-black font-medium mb-1 text-xs'>CATEGORIES</p>
					<p className=''>
						<input
							className='mr-2'
							type='checkbox'
							value={'Men'}
							onClick={handleCategory}
						/>
						Men
					</p>
					<p className=''>
						<input
							className='mr-2'
							type='checkbox'
							value={'Women'}
							onClick={handleCategory}
						/>
						Women
					</p>
					<p className=''>
						<input
							className='mr-2'
							type='checkbox'
							value={'Kids'}
							onClick={handleCategory}
						/>
						Kids
					</p>
				</div>

				<div
					className={`w-[200px] text-base text-gray-500 border border-black p-3 flex flex-col gap-1 ${
						showFilter ? 'block' : 'hidden'
					} sm:block my-3`}
				>
					<p className=' text-black font-medium mb-1 text-xs'>SUB CATEGORIES</p>
					<p className=''>
						<input
							className='mr-2'
							type='checkbox'
							value={'Topwear'}
							onClick={handleSubCategory}
						/>
						Topwear
					</p>
					<p className=''>
						<input
							className='mr-2'
							type='checkbox'
							value={'Bottomwear'}
							onClick={handleSubCategory}
						/>
						Bottomwear
					</p>
					<p className=''>
						<input
							className='mr-2'
							type='checkbox'
							value={'Winterwear'}
							onClick={handleSubCategory}
						/>
						Winterwear
					</p>
				</div>
				<div
					className={`w-[200px]  ${showFilter ? 'block' : 'hidden'} sm:block`}
				>
					<p className='font-semibold text-sm mt-10 mb-5'>
						FILTER BY PRICE RANGE
					</p>
					<PriceRangeSlider
						priceRange={priceRange}
						setPriceRange={setPriceRange}
					/>
				</div>
			</div>
			<div className='w-full'>
				<div className='flex justify-between text-xl w-full'>
					<Title text1='ALL' text2='COLLECTIONS' />
					<select
						className='p-1 sm:p-2 border border-black text-xs sm:text-sm rounded-lg h-fit'
						onChange={(e) => setSortType(e.target.value)}
					>
						<option value={'relavent'}>Sort by: Relavent</option>
						<option value={'low-high'}>Sort by: Low to High</option>
						<option value={'high-low'}>Sort by: High to Low</option>
					</select>
				</div>
				{!loading ? (
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 my-10'>
						{filterProducts.map((item) => (
							<ProductItem
								key={item._id}
								id={item._id}
								image={item.image}
								name={item.name}
								price={item.price}
							/>
						))}
					</div>
				) : (
					<Loader loaderText='Loading Collection...' />
				)}
			</div>
		</div>
	);
};

export default Collection;
