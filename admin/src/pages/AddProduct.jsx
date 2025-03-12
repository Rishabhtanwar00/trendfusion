import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../context/shopContext.jsx';

const ImageUploader = ({ id, image, setImage }) => {
	return (
		<label htmlFor={id} className=''>
			<img
				className='w-20'
				src={image ? URL.createObjectURL(image) : assets.uploadIcon}
				alt=''
				onError={(e) => {
					e.target.src = assets.uploadIcon;
				}}
			/>
			<input
				onChange={(e) => setImage(e.target.files[0])}
				id={id}
				type='file'
				hidden
			/>
		</label>
	);
};

const AddProduct = () => {
	const { backendUrl, navigate, token, loading, setLoading, categories } =
		useContext(ShopContext);
	const [productData, setProductData] = useState({
		image1: null,
		image2: null,
		image3: null,
		image4: null,

		name: '',
		description: '',
		price: '',
		category: '',
		subCategory: '',
		bestseller: false,
		sizes: [],
		quantity: '',
	});
	const [subCategories, setSubCategories] = useState([]);

	const handleChange = (field, value) => {
		setProductData((prev) => ({ ...prev, [field]: value }));
	};

	const toggleSizes = (size) => {
		setProductData((prev) => ({
			...prev,
			sizes: prev.sizes.includes(size)
				? prev.sizes.filter((item) => item !== size)
				: [...prev.sizes, size],
		}));
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setLoading(true);
			const formData = new FormData();

			if (productData.sizes.length === 0) {
				toast.error('Select at least 1 size.');
				setLoading(false);
				return;
			}

			if (productData.image1 === null) {
				toast.error('Upload at least 1 image.');
				setLoading(false);
				return;
			}

			Object.entries(productData).forEach(([key, value]) => {
				if (key.startsWith('image') && value) {
					formData.append(key, value);
				} else if (key === 'sizes') {
					formData.append(key, JSON.stringify(value));
				} else {
					formData.append(key, value);
				}
			});

			const result = await axios.post(
				`${backendUrl}/api/product/add`,
				formData,
				{ headers: { token } }
			);

			if (result.data.error) {
				toast.error(result.data.error);
			} else {
				toast.success(result.data.mssg);
				setProductData({
					image1: null,
					image2: null,
					image3: null,
					image4: null,

					name: '',
					description: '',
					price: '',
					category: '',
					subCategory: '',
					bestseller: false,
					sizes: [],
					quantity: '',
				});
			}
		} catch (err) {
			console.log('error in handlesubmit of add product: ' + err.message);
			toast.error(err.message);
			setLoading(false);
		}
		setLoading(false);
	};

	const fetchAllSubCategoriesAgainstCategory = async (category) => {
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/subcategory/all`,
				{ category },
				{ headers: { token } }
			);

			if (data.error) {
				toast.error(data.error);
				return;
			}
			const allSubCategories = data.subcategories;
			console.log(allSubCategories);
			setSubCategories(allSubCategories);
			if (allSubCategories.length > 0) {
				setProductData((prev) => ({
					...prev,
					subCategory: allSubCategories[0]?.name || '',
				}));
			}
		} catch (err) {
			console.log('error in getAllCategories: ' + err.message);
		}
	};

	useEffect(() => {
		if (categories.length > 0) {
			setProductData((prev) => ({
				...prev,
				category: categories[0]?.name || '',
			}));
		}
	}, [categories]);

	useEffect(() => {
		fetchAllSubCategoriesAgainstCategory(productData.category);
	}, [productData.category]);

	const sizeOptions = ['S', 'M', 'L', 'XL', '2XL'];

	return (
		<div className=''>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-5 text-base text-gray-700'
			>
				<div className=''>
					<p className=''>Upload image</p>
					<div className='flex gap-2 mt-3'>
						{['image1', 'image2', 'image3', 'image4'].map((image) => (
							<ImageUploader
								key={image}
								id={image}
								image={productData[image]}
								setImage={(value) => handleChange(image, value)}
							/>
						))}
					</div>
				</div>
				<div className='flex flex-col gap-2'>
					<p className=''>Product Name</p>
					<input
						type='text'
						className='px-3 py-2 w-full sm:w-[500px] rounded'
						placeholder='Enter Product Name'
						onChange={(e) => handleChange('name', e.target.value)}
						value={productData.name}
						required
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<p className=''>Product Description</p>
					<textarea
						className='px-3 py-2 w-full sm:w-[500px] rounded'
						placeholder='Enter Product Description'
						onChange={(e) => handleChange('description', e.target.value)}
						value={productData.description}
						required
						rows={3}
					/>
				</div>
				<div className='flex gap-8 items-end flex-wrap sm:flex-nowrap mr-auto'>
					<div className='flex flex-col gap-2 w-full'>
						<p className=''>Product Category</p>
						<select
							className='px-3 py-2 rounded w-full sm:w-fit min-w-[130px]'
							onChange={(e) => handleChange('category', e.target.value)}
						>
							{categories.map((category, index) => (
								<option key={index} value={category.name}>
									{category.name}
								</option>
							))}
						</select>
					</div>
					<div className='flex flex-col gap-2 w-full'>
						<p className=''> Sub Category</p>
						<select
							className='px-3 py-2 rounded w-full sm:w-fit min-w-[130px]'
							onChange={(e) => handleChange('subCategory', e.target.value)}
						>
							{subCategories.map((subCategory, index) => (
								<option key={index} value={subCategory.name}>
									{subCategory.name}
								</option>
							))}
						</select>
					</div>
					<button
						type='button'
						onClick={() => navigate('/manage-category')}
						className='px-2 py-2 h-fit bg-black text-white rounded min-w-[130px]'
					>
						Manage Categories
					</button>
				</div>
				<p className='text-sm'>
					*You can Add,Remove or Update Category/ Sub Category using Manage
					Categories
				</p>
				<div className='flex gap-8 flex-wrap sm:flex-nowrap mr-auto'>
					<div className='flex flex-col gap-2 w-full'>
						<p className=''>Price</p>
						<input
							type='number'
							className='px-3 py-2 w-full sm:w-[150px] rounded'
							placeholder='e.g. 200'
							onChange={(e) => handleChange('price', e.target.value)}
							value={productData.price}
							required
						/>
					</div>
					<div className='flex flex-col gap-2 w-full'>
						<p className=''>Quantity</p>
						<input
							type='number'
							className='px-3 py-2 w-full sm:w-[150px] rounded'
							placeholder='e.g. 5'
							onChange={(e) => handleChange('quantity', e.target.value)}
							value={productData.quantity}
							required
						/>
					</div>
				</div>
				<div className='flex gap-2'>
					{sizeOptions.map((size) => (
						<div
							key={size}
							className={`${
								productData.sizes.includes(size)
									? 'bg-pink-300 border-[#000] text-black'
									: 'bg-slate-200 border-transparent'
							} border cursor-pointer active:scale-95 transition-all duration-50 ease-in-out`}
							onClick={() => toggleSizes(size)}
						>
							<p className='py-1.5 px-3.5'>{size}</p>
						</div>
					))}
				</div>
				<div className='flex gap-8 items-end flex-wrap sm:flex-nowrap mr-auto'>
					<div className='flex gap-2 items-center'>
						<input
							id='checkbox'
							type='checkbox'
							checked={productData.bestseller}
							onChange={() =>
								handleChange('bestseller', !productData.bestseller)
							}
						/>
						<label htmlFor='checkbox'>Add to bestseller</label>
					</div>
				</div>
				<input
					className='mt-3 px-8 py-2 bg-black text-white active:scale-95 transition-all duration-150 ease-in-out w-fit cursor-pointer'
					type='submit'
					value={loading ? 'Adding Product' : 'Add Product'}
					disabled={loading}
				/>
			</form>
		</div>
	);
};

export default AddProduct;
