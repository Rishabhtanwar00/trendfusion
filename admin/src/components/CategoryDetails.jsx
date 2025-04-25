import { useContext } from 'react';
import { assets } from '../assets/assets';
import useDeleteCategory from '../hooks/useDeleteCategory';
import useDeleteSubCategory from '../hooks/useDeleteSubCategory';
import { ShopContext } from '../context/shopContext';

const CategoryDetails = ({
	openCategories,
	setOpenCategories,
	category,
	setCategoryData,
	setSubCategoryData,
	setIsUpdating,
	setIsSubUpdating,
	inputCatRef,
	inputSubRef,
}) => {
	const { backendUrl, token } = useContext(ShopContext);
	const { mutate: mutateCategory } = useDeleteCategory();
	const { mutate: mutateSubCategory } = useDeleteSubCategory();

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
		const response = confirm('Are you sure you want to delete this Category');
		if (response) {
			mutateCategory({ backendUrl, token, categoryId });
		}
	};

	const handleRemoveSubCategory = async (categoryId, subCategoryId) => {
		try {
			const response = confirm(
				'Are you sure you want to delete this sub-category'
			);
			if (response) {
				mutateSubCategory({ backendUrl, token, categoryId, subCategoryId });
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

	return (
		<div
			className={`px-2 py-2 border rounded ${
				openCategories.includes(category._id)
					? 'border bg-slate-100 mt-2'
					: 'bg-white border-transparent'
			}`}
		>
			<div
				className={`w-full grid grid-cols-[1.5fr_2fr] border px-2 py-2 mt-0 text-left items-center rounded ${
					openCategories.includes(category._id) ? 'bg-white shadow' : 'bg-white'
				}`}
			>
				<div
					onClick={() => toggleCategory(category._id)}
					className='flex gap-2 items-center cursor-pointer h-full'
				>
					<img
						loading='lazy'
						className={`h-[7px] w-auto transition-all duration-250 ease-in-out ${
							openCategories.includes(category._id) ? 'rotate-180' : 'rotate-0'
						}`}
						src={assets.upIcon}
						alt='Up Arrow icon'
					/>

					<p className='text-black text-base font-semibold tracking-wider'>
						{category.name}
					</p>
				</div>
				<div className='flex gap-5 my-auto pl-4 items-center justify-end flex-1 flex-wrap'>
					<button
						className='px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 shadow shadow-emerald-800 border-none text-white active:scale-95 transition-all duration-150 ease-in-out cursor-pointer rounded w-[90px]'
						onClick={() => {
							handleFocus(inputCatRef);
							handleUpdateCategory(category._id, category.name);
						}}
					>
						Update
					</button>
					<button
						className='px-4 py-1.5 bg-gradient-to-r from-red-600 to-red-700 shadow shadow-red-800 border-none text-white active:scale-95 transition-all duration-150 ease-in-out cursor-pointer rounded w-[90px]'
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
									loading='lazy'
									className='h-[7px] w-auto rotate-90'
									src={assets.upIcon}
									alt='Up Arrow icon'
								/>

								<p className=''>{subcategory.name}</p>
							</div>
							<div className='flex gap-5 my-auto items-center justify-end flex-1 flex-wrap'>
								<button
									className='px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 shadow shadow-emerald-800 border-none text-white active:scale-95 transition-all duration-150 ease-in-out cursor-pointer rounded w-[90px]'
									onClick={() => {
										handleFocus(inputSubRef);
										handleUpdateSubCategory(category, subcategory);
									}}
								>
									Update
								</button>
								<button
									className='px-4 py-1.5 bg-gradient-to-r from-red-600 to-red-700 shadow shadow-red-800 border-none text-white active:scale-95 transition-all duration-150 ease-in-out cursor-pointer rounded w-[90px]'
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
	);
};

export default CategoryDetails;
