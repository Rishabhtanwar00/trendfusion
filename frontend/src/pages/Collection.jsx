import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { ShopContext } from '../context/shopContext.jsx';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader.jsx';
import FilterComponent from '../components/FilterComponent.jsx';
import BackButton from '../components/BackButton.jsx';

const Collection = () => {
	const { loading } = useContext(ShopContext);
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
			// applyFilter();
		}
	};

	useEffect(() => {
		sortProducts();
	}, [sortType]);

	return (
		<div className='flex flex-col sm:flex-row gap-10 my-5'>
			<FilterComponent
				setFilterProducts={setFilterProducts}
				showFilter={showFilter}
				setShowFilter={setShowFilter}
			/>
			<div className='w-full'>
				<div className='mb-5'>
					<BackButton />
				</div>
				<div className='flex flex-col sm:flex-row gap-2 items-center justify-between text-xl w-full'>
					<Title text1='ALL' text2='COLLECTIONS' />
					<div className='w-full sm:w-fit flex justify-between gap-5'>
						<button
							onClick={() => setShowFilter(!showFilter)}
							className='text-base text-black font-medium flex items-center'
						>
							FILTER
							<img
								className={`${
									showFilter ? 'rotate-90' : ''
								} max-w-[8px] w-auto h-auto ml-2 transition-all duration-75 ease-in-out cursor-pointer`}
								src={assets.backIcon}
								alt=''
							/>
						</button>
						<select
							className='p-1 sm:p-2 border border-black text-xs sm:text-sm rounded h-fit'
							onChange={(e) => setSortType(e.target.value)}
						>
							<option value={'relavent'}>Sort by: Relavent</option>
							<option value={'low-high'}>Sort by: Low to High</option>
							<option value={'high-low'}>Sort by: High to Low</option>
						</select>
					</div>
				</div>
				{!loading ? (
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-10 mt-5'>
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
