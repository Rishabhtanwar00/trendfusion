import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets.js';
import SubCategoryForm from '../components/SubCategoryForm.jsx';
import CategoryForm from '../components/CategoryForm.jsx';
import SearchBar from '../components/SearchBar.jsx';

const ManageCategory = () => {
	const { backendUrl, token, categories, setShouldFetchCategories } =
		useContext(ShopContext);
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

	const handleFocus = (inputRef) => {
		inputRef.current?.focus();
	};

	const handleUpdateCategory = (categoryId, category) => {
		setCategoryData((prev) => ({ ...prev, category, categoryId }));
		setIsUpdating(true);
	};

	const handleUpdateSubCategory = (category, subCategory) => {
		setSubCategoryData((prev) => ({
			...prev,
			category: category.name,
			categoryId: category._id,
			subCategory: subCategory.name,
			subCategoryId: subCategory._id,
		}));
		setIsSubUpdating(true);
	};

	const handleRemoveCategory = async (categoryId) => {
		try {
			const response = confirm('Are you sure you want to delete this Category');
			if (response) {
				const { data } = await axios.post(
					`${backendUrl}/api/category/remove`,
					{ categoryId },
					{ headers: { token } }
				);

				if (data.error) {
					toast.error(data.error);
					return;
				}

				toast.success(data.mssg);
				setShouldFetchCategories(true);
			}
		} catch (err) {
			console.log('error in handleRemoveCategory: ' + err.message);
		}
	};

	const handleRemoveSubCategory = async (categoryId, subCategoryId) => {
		try {
			const response = confirm(
				'Are you sure you want to delete this sub-category'
			);
			if (response) {
				const { data } = await axios.post(
					`${backendUrl}/api/subcategory/remove`,
					{ categoryId, subCategoryId },
					{ headers: { token } }
				);

				if (data.error) {
					toast.error(data.error);
					return;
				}

				toast.success(data.mssg);
				setShouldFetchCategories(true);
			}
		} catch (err) {
			console.log('error in handleRemoveSubCategory: ' + err.message);
		}
	};

	const toggleCategory = (categoryId) => {
		// If the category is already open, remove it from the list
		if (openCategories.includes(categoryId)) {
			setOpenCategories(openCategories.filter((id) => id !== categoryId));
		} else {
			setOpenCategories([...openCategories, categoryId]);
		}
	};

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
					<h1 style={{ '--bg-color': 'rgb(5, 186, 5)' }}>All Categorios</h1>
				</div>
				<div className='flex gap-2 justify-between mt-5'>
					<button
						title='Minimize all categories'
						className='px-2 py-1.5 bg-blue-500 text-white active:scale-95 transition-all duration-150 ease-in-out w-fit cursor-pointer shadow rounded flex'
						onClick={() => setOpenCategories([])}
					>
						<p className='hidden sm:block'>Minimize Categories</p>
						<img
							className='block w-[20px] h-auto sm:ml-2'
							src={assets.minimizeIcon}
							alt=''
						/>
					</button>
					<SearchBar
						search={search}
						setSearch={setSearch}
						placeholder='Search category here'
					/>
				</div>
				<div className='w-full hidden sm:grid grid-cols-[1.5fr_2fr] bg-green-500 text-white px-0 sm:px-2 py-1 mt-5 mb-3 text-left rounded'>
					<p>Category</p>
					<p className='text-center'>Action</p>
				</div>
				{filterCategories.length === 0 && (
					<p className='text-center py-2'>No Category found.</p>
				)}
				{filterCategories.map((category, index) => (
					<div
						key={index}
						className={`px-2 py-2 border rounded ${
							openCategories.includes(category._id)
								? 'border bg-slate-100 mt-2'
								: 'bg-white border-transparent'
						}`}
					>
						<div
							className={`w-full grid grid-cols-[1.5fr_2fr] border px-2 py-2 mt-0 text-left items-center rounded ${
								openCategories.includes(category._id)
									? 'bg-white shadow'
									: 'bg-white'
							}`}
						>
							<div
								onClick={() => toggleCategory(category._id)}
								className='flex gap-2 items-center cursor-pointer h-full'
							>
								<img
									className={`h-[7px] w-auto transition-all duration-250 ease-in-out ${
										openCategories.includes(category._id)
											? 'rotate-180'
											: 'rotate-0'
									}`}
									src={assets.upIcon}
									alt=''
								/>

								<p className='text-black text-base font-semibold tracking-wider'>
									{category.name}
								</p>
							</div>
							<div className='flex gap-5 my-auto pl-4 items-center justify-end sm:justify-center flex-1 flex-wrap'>
								<button
									className='px-4 py-1.5 bg-green-500 text-white active:scale-95 transition-all duration-150 ease-in-out cursor-pointer shadow rounded w-[90px]'
									onClick={() => {
										handleFocus(inputCatRef);
										handleUpdateCategory(category._id, category.name);
									}}
								>
									Update
								</button>
								<button
									className='px-4 py-1.5 bg-red-500 text-white active:scale-95 transition-all duration-150 ease-in-out cursor-pointer shadow rounded w-[90px]'
									onClick={() => handleRemoveCategory(category._id)}
								>
									Remove
								</button>
							</div>
						</div>
						{openCategories.includes(category._id) && (
							<div className='pl-4 bg-slate-100 space-y-2 w-full'>
								{category.subCategory.length === 0 && (
									<p className='text-left py-2'>
										No Sub Category Added yet for this category
									</p>
								)}
								{category.subCategory.map((subcategory) => (
									<div
										key={subcategory._id}
										className='pl-4 bg-white text-gray-800 w-full grid grid-cols-[1.5fr_2fr] border px-2 py-2 mt-2 text-left items-center shadow-inner'
									>
										<div className='flex gap-2 items-center h-full'>
											<img
												className='h-[7px] w-auto rotate-90'
												src={assets.upIcon}
												alt=''
											/>

											<p className=''>{subcategory.name}</p>
										</div>
										<div className='flex gap-5 my-auto items-center justify-end sm:justify-center flex-1 flex-wrap'>
											<button
												className='px-4 py-1.5 bg-green-500 text-white active:scale-95 transition-all duration-150 ease-in-out cursor-pointer shadow rounded w-[90px]'
												onClick={() => {
													handleFocus(inputSubRef);
													handleUpdateSubCategory(category, subcategory);
												}}
											>
												Update
											</button>
											<button
												className='px-4 py-1.5 bg-red-500 text-white active:scale-95 transition-all duration-150 ease-in-out cursor-pointer shadow rounded w-[90px]'
												onClick={() =>
													handleRemoveSubCategory(category._id, subcategory._id)
												}
											>
												Remove
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default ManageCategory;
