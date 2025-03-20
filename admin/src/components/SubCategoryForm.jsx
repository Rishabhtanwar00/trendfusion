import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/shopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const SubCategoryForm = ({
	inputRef,
	subCategoryData,
	setSubCategoryData,
	isSubUpdating,
	setIsSubUpdating,
}) => {
	const { backendUrl, token, categories, setShouldFetchCategories } =
		useContext(ShopContext);
	const [loading, setLoading] = useState(false);

	const handleAddUpdateSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			let apiEndPoint = `${backendUrl}/api/subcategory/add`;
			let subCategoryJSONData = {
				categoryName: subCategoryData.category,
				name: subCategoryData.subCategory.trim(),
			};

			if (isSubUpdating) {
				apiEndPoint = `${backendUrl}/api/subcategory/update`;
				subCategoryJSONData = {
					categoryId: subCategoryData.categoryId,
					subCategoryId: subCategoryData.subCategoryId,
					name: subCategoryData.subCategory.trim(),
				};
			}

			const { data } = await axios.post(apiEndPoint, subCategoryJSONData, {
				headers: { token },
			});

			if (data.error) {
				console.log(data.error);
				toast.error(data.error);
				setLoading(false);
				resetSubCategoryForm();
				return;
			}

			if (data.mssg) {
				toast.success(data.mssg);
				resetSubCategoryForm();
			}
			setShouldFetchCategories(true);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			console.log('error in getAllCategories: ' + err.message);
		}
	};

	const resetSubCategoryForm = () => {
		setSubCategoryData({
			category: categories[0]?.name || '',
			categoryId: '',
			subCategory: '',
			subCategoryId: '',
		});
		setIsSubUpdating(false);
	};

	useEffect(() => {
		if (categories.length > 0) {
			setSubCategoryData((prev) => ({
				...prev,
				category: prev.category || categories[0].name, // Ensures category persists
			}));
		}
	}, [categories]);

	return (
		<div className='px-4 pt-4 pb-8 bg-white shadow rounded-lg'>
			<div className='flex items-center justify-between mb-5'>
				<div className='p-4 w-fit rounded-full bg-[#f02028]  border-[#a8030a]'>
					<img className='w-auto h-8' src={assets.subcategoryIcon} alt='' />
				</div>
				<div className='heading'>
					<h1 style={{ '--bg-color': '#f02028' }}>SubCategory</h1>
				</div>
			</div>
			<form
				className='flex flex-col gap-3 tracking-wide'
				onSubmit={handleAddUpdateSubmit}
			>
				<div className='flex flex-col gap-1 w-full'>
					<p className=''>
						{isSubUpdating ? 'Selected category' : 'Select category'}
					</p>
					<select
						className='px-3 py-2 rounded w-full sm:w-[300px] min-w-[200px] outline-red-500'
						onChange={(e) =>
							setSubCategoryData((prev) => ({
								...prev,
								category: e.target.value,
							}))
						}
						value={subCategoryData.category}
						disabled={isSubUpdating}
					>
						{categories.map((category, index) => (
							<option key={index} value={category.name}>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<div className='flex flex-col gap-1 w-full'>
					<p className=''>
						{isSubUpdating
							? 'Update below sub category'
							: 'Add new sub category'}
					</p>
					<div className='flex gap-5 items-center'>
						<input
							ref={inputRef}
							type='text'
							className='px-3 py-2 w-full sm:w-[300px] rounded outline-red-500'
							placeholder='Enter new sub category'
							onChange={(e) =>
								setSubCategoryData((prev) => ({
									...prev,
									subCategory: e.target.value,
								}))
							}
							value={subCategoryData.subCategory}
							required
						/>
						<button
							type='button'
							title='Reset Form'
							onClick={resetSubCategoryForm}
							className='p-2 rounded-full border-2 bg-[#f02028] border-[#a8030a] w-fit'
						>
							<img className='w-5' src={assets.resetIcon} alt='' />
						</button>
					</div>
				</div>
				<input
					className='mt-3 px-8 py-2 bg-[#f02028] border-[#a8030a] text-white active:scale-95 transition-all duration-150 ease-in-out w-fit cursor-pointer'
					type='submit'
					value={
						loading
							? isSubUpdating
								? 'Updating SubCategory'
								: 'Adding SubCategory'
							: isSubUpdating
							? 'Update SubCategory'
							: 'Add SubCategory'
					}
					disabled={loading}
				/>
			</form>
		</div>
	);
};

export default SubCategoryForm;
