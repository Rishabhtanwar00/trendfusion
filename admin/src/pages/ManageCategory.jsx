import { useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets.js';
import SubCategoryForm from '../components/SubCategoryForm.jsx';
import CategoryForm from '../components/CategoryForm.jsx';
import SearchBar from '../components/SearchBar.jsx';
import useCategory from '../hooks/useCategory.js';
import CategoryDetails from '../components/CategoryDetails.jsx';

const ManageCategory = () => {
	const { data: categories = [] } = useCategory();

	const [search, setSearch] = useState('');
	const [isUpdating, setIsUpdating] = useState(false);
	const [isSubUpdating, setIsSubUpdating] = useState(false);
	const [openCategories, setOpenCategories] = useState([]);
	const [filterCategories, setFilterCategories] = useState([]);
	const [categoryData, setCategoryData] = useState({
		category: '',
		categoryId: '',
	});
	const [subCategoryData, setSubCategoryData] = useState({
		category: '',
		categoryId: '',
		subCategory: '',
		subCategoryId: '',
	});

	const inputCatRef = useRef(null);
	const inputSubRef = useRef(null);

	const applySearch = () => {
		let categoriesCopy = categories.slice();

		if (search) {
			categoriesCopy = categoriesCopy.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}
		setFilterCategories(categoriesCopy);
	};

	useEffect(() => {
		applySearch();
	}, [search, categories]);

	return (
		<div className='flex gap-[20px] items-start justify-center flex-wrap w-full '>
			<div className='flex flex-col gap-10'>
				<CategoryForm
					inputRef={inputCatRef}
					categoryData={categoryData}
					setCategoryData={setCategoryData}
					isUpdating={isUpdating}
					setIsUpdating={setIsUpdating}
				/>
				<SubCategoryForm
					inputRef={inputSubRef}
					subCategoryData={subCategoryData}
					setSubCategoryData={setSubCategoryData}
					isSubUpdating={isSubUpdating}
					setIsSubUpdating={setIsSubUpdating}
				/>
			</div>
			<div className='flex-1 px-4 pt-8 pb-8 bg-white shadow rounded-lg tracking-wide '>
				<div className='heading'>
					<h1 style={{ '--bg-color': '#059669' }}>All Categorios</h1>
				</div>
				<div className='flex gap-2 justify-between mt-5'>
					<button
						title='Minimize all categories'
						className='px-2 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 shadow-md shadow-blue-900 text-white active:scale-95 transition-all duration-150 ease-in-out w-fit cursor-pointer rounded flex'
						onClick={() => setOpenCategories([])}
					>
						<p className='hidden sm:block'>Minimize Categories</p>
						<img
							loading='lazy'
							className='block w-[20px] h-auto sm:ml-2'
							src={assets.minimizeIcon}
							alt='Minimize icon'
						/>
					</button>
					<SearchBar
						search={search}
						setSearch={setSearch}
						placeholder='Search category here'
					/>
				</div>
				<div className='w-full hidden sm:grid grid-cols-[1.5fr_2fr] bg-gradient-to-r from-emerald-500 to-emerald-800 shadow-md shadow-emerald-900 text-white px-0 sm:px-2 py-1 mt-5 mb-3 text-left rounded'>
					<p>Category</p>
					<p className='text-center sm:ml-[6vw]'>Action</p>
				</div>
				{filterCategories.length === 0 ? (
					<p className='text-center py-2'>No Category found.</p>
				) : (
					filterCategories.map((category, index) => (
						<CategoryDetails
							key={index}
							openCategories={openCategories}
							setOpenCategories={setOpenCategories}
							setCategoryData={setCategoryData}
							category={category}
							setSubCategoryData={setSubCategoryData}
							setIsUpdating={setIsUpdating}
							setIsSubUpdating={setIsSubUpdating}
							inputCatRef={inputCatRef}
							inputSubRef={inputSubRef}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default ManageCategory;
