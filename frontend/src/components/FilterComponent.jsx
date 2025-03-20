import { useContext, useEffect, useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider';
import { ShopContext } from '../context/shopContext';
import Title from './Title';

const FilterComponent = ({ setFilterProducts, showFilter, setShowFilter }) => {
	const { products, search, showSearch, setLoading } = useContext(ShopContext);

	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const [priceRange, setPriceRange] = useState([0, 10000]);

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
		applyFilter();
	}, [category, subCategory, search, products, priceRange]);

	return (
		<div
			className='fixed right-[-17px] top-0 h-[100vh] w-[80vw] sm:w-[350px] bg-slate-100 text-black flex flex-col p-5 transition-all ease-in-out duration-300 z-10 border-l-2 border-gray-300 overflow-y-scroll'
			style={{
				transform: `${showFilter ? 'translateX(0)' : 'translateX(100vw)'}`,
			}}
		>
			<button
				className='bg-black text-white px-1.5 py-0.5 w-fit h-fit rounded'
				onClick={() => setShowFilter(false)}
			>
				Close
			</button>
			<div className='text-center text-xl mt-10'>
				<Title text1='APPLY' text2='FILTER' />
			</div>
			<div className='flex flex-col gap-2 mr-[17px]'>
				<div className='w-full min-w-[200px] text-base text-gray-500 border border-black p-3 flex flex-col gap-1 my-3'>
					<p className=' text-black font-medium mb-1 text-sm'>CATEGORIES</p>
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

				<div className='w-full min-w-[200px] text-base text-gray-500 border border-black p-3 flex flex-col gap-1 my-3'>
					<p className=' text-black font-medium mb-1 text-sm'>SUB CATEGORIES</p>
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
				<div className='w-full min-w-[200px] block'>
					<p className='font-semibold text-sm my-5'>FILTER BY PRICE RANGE</p>
					<PriceRangeSlider
						priceRange={priceRange}
						setPriceRange={setPriceRange}
					/>
				</div>
			</div>
		</div>
	);
};

export default FilterComponent;
