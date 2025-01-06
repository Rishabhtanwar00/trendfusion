import { useState } from 'react';
import { assets } from '../assets/assets.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App.jsx';

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

const AddProduct = ({ token }) => {
	console.log(token);
	const [productData, setProductData] = useState({
		image1: null,
		image2: null,
		image3: null,
		image4: null,

		name: '',
		description: '',
		price: '',
		category: 'Men',
		subCategory: 'Topwear',
		bestseller: false,
		sizes: [],
	});

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
			const formData = new FormData();

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
			}
		} catch (err) {
			console.log('error in handlesubmit of add product: ' + err.message);
			toast.error(err.message);
		}
	};

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
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<p className=''>Product Description</p>
					<textarea
						className='px-3 py-2 w-full sm:w-[500px] rounded'
						placeholder='Enter Product Description'
						onChange={(e) => handleChange('description', e.target.value)}
						value={productData.description}
					/>
				</div>
				<div className='flex gap-5 flex-wrap sm:flex-nowrap'>
					<div className='flex flex-col gap-2 w-full'>
						<p className=''>Product Category</p>
						<select
							className='px-3 py-2 rounded w-full sm:w-fit'
							onChange={(e) => handleChange('category', e.target.value)}
						>
							<option value='Men'>Men</option>
							<option value='Women'>Women</option>
							<option value='Kids'>Kids</option>
						</select>
					</div>
					<div className='flex flex-col gap-2 w-full'>
						<p className=''>Product SubCategory</p>
						<select
							className='px-3 py-2 rounded w-full sm:w-fit'
							onChange={(e) => handleChange('subCategory', e.target.value)}
						>
							<option value='Topwear'>Topwear</option>
							<option value='Bottomwear'>Bottomwear</option>
							<option value='Winterwear'>Winterwear</option>
						</select>
					</div>
					<div className='flex flex-col gap-2 w-full'>
						<p className=''>Price</p>
						<input
							type='number'
							className='px-3 py-2 w-full sm:w-[150px] rounded'
							placeholder='200'
							onChange={(e) => handleChange('price', e.target.value)}
							value={productData.price}
						/>
					</div>
				</div>
				<div className='flex gap-2'>
					{sizeOptions.map((size) => (
						<div
							key={size}
							className={`${
								productData.sizes.includes(size)
									? 'bg-pink-200 border-[#c586a5]'
									: 'bg-slate-200 border-transparent'
							} border cursor-pointer active:scale-95 transition-all duration-50 ease-in-out`}
							onClick={() => toggleSizes(size)}
						>
							<p className='py-1.5 px-3.5'>{size}</p>
						</div>
					))}
				</div>
				<div className='flex gap-2'>
					<input
						id='checkbox'
						type='checkbox'
						checked={productData.bestseller}
						onChange={() => handleChange('bestseller', !productData.bestseller)}
					/>
					<label htmlFor='checkbox'>Add to bestseller</label>
				</div>
				<input
					className='mt-3 px-8 py-2 bg-black text-white active:scale-95 transition-all duration-150 ease-in-out w-fit cursor-pointer'
					type='submit'
					value='Add Product'
				/>
			</form>
		</div>
	);
};

export default AddProduct;
