import axios from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets';

const CategoryForm = ({
	inputRef,
	categoryData,
	setCategoryData,
	isUpdating,
	setIsUpdating,
}) => {
	const { backendUrl, token, setShouldFetchCategories } =
		useContext(ShopContext);
	const [loading, setLoading] = useState(false);

	const handleAddUpdateSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			let apiEndPoint = `${backendUrl}/api/category/add`;
			const categoryJSONData = { name: categoryData.category.trim() };

			if (isUpdating) {
				apiEndPoint = `${backendUrl}/api/category/update`;
				categoryJSONData.categoryId = categoryData.categoryId;
			}

			const { data } = await axios.post(apiEndPoint, categoryJSONData, {
				headers: { token },
			});

			if (data.error) {
				toast.error(data.error);
				setLoading(false);
				resetCategoryForm();
				return;
			}

			if (data.mssg) {
				toast.success(data.mssg);
			}
			setLoading(false);
			resetCategoryForm();
			setShouldFetchCategories(true);
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
				<div className='p-4 w-fit rounded-full bg-blue-500 border-blue-900'>
					<img className='w-auto h-8' src={assets.categoryIconWhite} alt='' />
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
							className='p-2 rounded-full border-2 bg-blue-500 border-blue-900 w-fit'
						>
							<img className='w-5' src={assets.resetIcon} alt='' />
						</button>
					</div>
				</div>
				<input
					className='mt-3 px-8 py-2 bg-blue-500 border-blue-900 text-white active:scale-95 transition-all duration-150 ease-in-out w-fit cursor-pointer'
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
