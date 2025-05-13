import { useContext, useEffect, useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider';
import { ShopContext } from '../context/shopContext';
import useCategory from '../hooks/useCategory';
import useSubCategoryByCategories from '../hooks/useSubCategoryByCategories';

const FilterComponent = ({
	products,
	setFilterProducts,
	showFilter,
	setShowFilter,
}) => {
	const { setLoading } = useContext(ShopContext);

	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const [priceRange, setPriceRange] = useState([0, 10000]);

	const { data: categories = [], isLoading: categoryLoading } = useCategory();
	const { data: subCategories = [] } = useSubCategoryByCategories(category);

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
	}, [category, subCategory, priceRange]);

	return (
		<div
			className='fixed right-[-17px] top-0 h-[100vh] w-[80vw] sm:w-[350px] bg-slate-100 text-black flex flex-col p-5 transition-all ease-in-out duration-300 z-20 border-l-2 border-gray-300 overflow-y-scroll'
			style={{
				transform: `${showFilter ? 'translateX(0)' : 'translateX(100vw)'}`,
			}}
		>
			<button
				className='border-2 border-[#d41e26] bg-[#f02028] text-white px-1.5 py-0.5 w-fit h-fit rounded'
				onClick={() => setShowFilter(false)}
			>
				Close
			</button>
			<div className='heading mt-5 mb-2'>
				<h1 style={{ '--bg-color': '#f02028' }}>APPLY FILTER</h1>
			</div>
			<div className='flex flex-col gap-2 mr-[17px]'>
				<div className='w-full min-w-[200px] text-base text-gray-500 border border-black p-3 flex flex-col gap-1 my-3 rounded'>
					<p className=' text-black font-medium mb-1 text-sm'>CATEGORIES</p>
					{!categoryLoading &&
						categories.map((categoryItem, index) => (
							<p key={index} className=''>
								<input
									className='mr-2'
									type='checkbox'
									value={categoryItem.name}
									onClick={handleCategory}
								/>
								{categoryItem.name}
							</p>
						))}
				</div>

				{category.length !== 0 && (
					<div className='w-full min-w-[200px] text-base text-gray-500 border border-black p-3 flex flex-col gap-1 my-3 rounded'>
						<p className=' text-black font-medium mb-1 text-sm'>
							SUB CATEGORIES
						</p>
						{subCategories.map((subCategoryItem, index) => (
							<p key={index} className=''>
								<input
									className='mr-2'
									type='checkbox'
									value={subCategoryItem.name}
									onClick={handleSubCategory}
								/>
								{subCategoryItem.name}
							</p>
						))}
					</div>
				)}
				<div className='w-full min-w-[200px] block'>
					<p className='font-semibold text-sm my-3'>FILTER BY PRICE RANGE</p>
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
