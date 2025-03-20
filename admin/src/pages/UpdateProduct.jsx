import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/shopContext';
import BackButton from '../components/BackButton';

const UpdateProduct = () => {
	const { backendUrl, navigate, token, loading, setLoading, categories } =
		useContext(ShopContext);
	const { productId } = useParams();
	const [productData, setProductData] = useState({
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

	const fetchProductData = async () => {
		const { data } = await axios.post(`${backendUrl}/api/product/single`, {
			productId,
		});
		if (data.error) {
			console.log(data.error);
			return;
		}
		const {
			name,
			description,
			price,
			category,
			subCategory,
			bestseller,
			sizes,
			quantity,
		} = data.product;

		setProductData({
			name,
			description,
			price,
			category,
			subCategory,
			bestseller,
			sizes,
			quantity,
		});
	};

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

			Object.entries(productData).forEach(([key, value]) => {
				if (key === 'sizes') {
					formData.append(key, JSON.stringify(value));
				} else {
					formData.append(key, value);
				}
			});
			formData.append('productId', productId);
			Object.entries(productData).forEach(([key, value]) => {
				console.log(key + ': ' + value);
			});

			const result = await axios.post(
				`${backendUrl}/api/product/update`,
				formData,
				{ headers: { token } }
			);

			if (result.data.error) {
				toast.error(result.data.error);
			} else {
				toast.success(result.data.mssg);
				navigate('/list-products');
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
			// if (allSubCategories.length > 0) {
			// 	setProductData((prev) => ({
			// 		...prev,
			// 		subCategory: allSubCategories[0]?.name || '',
			// 	}));
			// }
		} catch (err) {
			console.log('error in getAllCategories: ' + err.message);
		}
	};
	useEffect(() => {
		// if (categories.length > 0) {
		// 	setProductData((prev) => ({
		// 		...prev,
		// 		category: categories[0]?.name || '',
		// 	}));
		// }
	}, [categories]);

	useEffect(() => {
		fetchAllSubCategoriesAgainstCategory(productData.category);
	}, [productData.category]);

	useEffect(() => {
		fetchProductData();
	}, [productId]);

	const sizeOptions = ['S', 'M', 'L', 'XL', '2XL'];

	return (
		<div>
			<div className='flex gap-5 justify-start mb-5'>
				<BackButton />
				<div className='heading ml-[20vw]'>
					<h1 style={{ '--bg-color': 'rgb(5, 186, 5)' }}>Edit Product</h1>
				</div>
			</div>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-5 text-base text-gray-700'
			>
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
				<div className='flex gap-8 flex-wrap sm:flex-nowrap mr-auto'>
					<div className='flex flex-col gap-2 w-full'>
						<p className=''>Product Category</p>
						<select
							className='px-3 py-2 rounded w-full sm:w-fit'
							onChange={(e) => handleChange('category', e.target.value)}
							value={productData.category}
						>
							{categories.map((category, index) => (
								<option key={index} value={category.name}>
									{category.name}
								</option>
							))}
						</select>
					</div>
					<div className='flex flex-col gap-2 w-full'>
						<p className=''> Sub category</p>
						<select
							className='px-3 py-2 rounded w-full sm:w-fit min-w-[130px]'
							onChange={(e) => handleChange('subCategory', e.target.value)}
							value={productData.subCategory}
						>
							{subCategories.map((subCategory, index) => (
								<option key={index} value={subCategory.name}>
									{subCategory.name}
								</option>
							))}
						</select>
					</div>
					<div className='flex flex-col gap-2 w-full'>
						<p className=''>Price</p>
						<input
							type='number'
							className='px-3 py-2 w-full sm:w-fit min-w-[50px] rounded'
							placeholder='e.g. 200'
							onChange={(e) => handleChange('price', e.target.value)}
							value={productData.price}
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
					<div className='flex flex-col gap-2'>
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
					value={loading ? 'Updating Product' : 'Update Product'}
					disabled={loading}
				/>
			</form>
		</div>
	);
};

export default UpdateProduct;
