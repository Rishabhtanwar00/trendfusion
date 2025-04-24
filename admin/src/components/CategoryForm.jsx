import { useContext, useState } from 'react';

import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets';
import useAddUpdateCategory from '../hooks/useAddUpdateCategory';

const CategoryForm = ({
	inputRef,
	categoryData,
	setCategoryData,
	isUpdating,
	setIsUpdating,
}) => {
	const { backendUrl, token } = useContext(ShopContext);
	const { mutate } = useAddUpdateCategory();
	const [loading, setLoading] = useState(false);

	const handleAddUpdateSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			mutate({
				backendUrl,
				token,
				category: categoryData.category,
				categoryId: categoryData.categoryId,
				isUpdating,
			});
			setLoading(false);
			resetCategoryForm();
		} catch (err) {
			setLoading(false);
			console.log('error in getAllCategories: ' + err.message);
		}
	};

	const resetCategoryForm = () => {
		setCategoryData({
			category: '',
			categoryId: '',
		});
		setIsUpdating(false);
	};

	return (
		<div className='px-4 pt-4 pb-8 bg-white shadow rounded-lg'>
			<div className='flex items-center justify-between mb-5'>
				<div className='p-4 w-fit rounded-full bg-gradient-to-r from-blue-600 to-blue-700 shadow shadow-blue-900'>
					<img
						loading='lazy'
						className='w-auto h-8'
						src={assets.categoryIcon}
						alt='Category icon'
					/>
				</div>
				<div className='heading'>
					<h1 style={{ '--bg-color': 'rgb(59 130 246)' }}>Category</h1>
				</div>
			</div>
			<form
				className='flex flex-col gap-3 tracking-wide'
				onSubmit={handleAddUpdateSubmit}
			>
				<div className='flex flex-col gap-1 w-full'>
					<p className=''>
						{isUpdating ? 'Update Below Category' : 'Add new Category'}
					</p>
					<div className='flex gap-5 items-center'>
						<input
							ref={inputRef}
							type='text'
							className='px-3 py-2 w-full sm:w-[300px] rounded outline-blue-500'
							placeholder={
								isUpdating
									? `Enter updated category for ${categoryData.category}`
									: 'Enter new category'
							}
							onChange={(e) =>
								setCategoryData((prev) => ({
									...prev,
									category: e.target.value,
								}))
							}
							value={categoryData.category}
							required
						/>
						<button
							type='button'
							title='Reset Form'
							onClick={resetCategoryForm}
							className='p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 shadow shadow-blue-900  w-fit'
						>
							<img
								loading='lazy'
								className='w-5'
								src={assets.resetIcon}
								alt='Reset icon'
							/>
						</button>
					</div>
				</div>
				<input
					className='mt-3 px-8 py-2 bg-gradient-to-r from-blue-600 to-blue-700 shadow shadow-blue-900 text-white active:scale-95 transition-all duration-150 ease-in-out w-fit cursor-pointer border-none'
					type='submit'
					value={
						loading
							? isUpdating
								? 'Updating Category'
								: 'Adding Category'
							: isUpdating
							? 'Update Category'
							: 'Add Category'
					}
					disabled={loading}
				/>
			</form>
		</div>
	);
};

export default CategoryForm;
