import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/shopContext.jsx';
import useCategory from '../hooks/useCategory.js';
import useSubCategoryByCategory from '../hooks/useSubCategoryByCategory.js';
import useAddProduct from '../hooks/useAddProduct.js';
import ImageUploader from '../components/ImageUploader.jsx';
import InputComponent from '../components/InputComponent.jsx';
import CheckboxComponent from '../components/CheckboxComponent.jsx';
import SizeSelector from '../components/SizeSelector.jsx';
import SelectionInputComponent from '../components/SelectionInputComponent.jsx';

const AddProduct = () => {
	const { backendUrl, navigate, token, loading, setLoading } =
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
	const { mutate } = useAddProduct();
	const { data: categories = [] } = useCategory();
	const { data: subCategories = [] } = useSubCategoryByCategory(
		productData.category
	);

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
			mutate(
				{
					backendUrl,
					token,
					productData,
				},
				{
					onError: () => {
						toast.error('Getting some error in adding product.');
					},
					onSuccess: () => {
						toast.success('Product added successfully.');
						setProductData({
							image1: null,
							image2: null,
							image3: null,
							image4: null,

							name: '',
							description: '',
							price: '',
							category: (categories.length > 0 && categories[0]?.name) || '',
							subCategory:
								(subCategories.length > 0 && subCategories[0]?.name) || '',
							bestseller: false,
							sizes: [],
							quantity: '',
						});
					},
				}
			);
		} catch (err) {
			console.log('error in handlesubmit of add product: ' + err.message);
			toast.error('Error in Adding Product, Try after some time.');
			setLoading(false);
		} finally {
			setLoading(false);
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
		if (subCategories.length > 0) {
			setProductData((prev) => ({
				...prev,
				subCategory: subCategories[0]?.name || '',
			}));
		}
	}, [subCategories]);

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
				<InputComponent
					label='Product Name'
					value={productData.name}
					placeholder='Enter Product Name'
					type='text'
					onChange={(e) => handleChange('name', e.target.value)}
					required={true}
				/>

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
					<SelectionInputComponent
						label='Category'
						onChange={(e) => handleChange('category', e.target.value)}
						value={productData.category}
						options={categories}
					/>
					<SelectionInputComponent
						label='Sub Category'
						onChange={(e) => handleChange('subCategory', e.target.value)}
						value={productData.subCategory}
						options={subCategories}
					/>
					<button
						type='button'
						onClick={() => navigate('/manage-category')}
						className='px-2 py-2 h-fit bg-green-300 text-black border-2 border-green-500 rounded min-w-[130px]'
					>
						Manage
					</button>
				</div>
				<div className='flex gap-8 flex-wrap sm:flex-nowrap mr-auto'>
					<InputComponent
						label='Price'
						value={productData.price}
						placeholder='e.g. 200'
						type='number'
						onChange={(e) => handleChange('price', e.target.value)}
						required={true}
						small
					/>
					<InputComponent
						label='Quantity'
						value={productData.quantity}
						placeholder='e.g. 5'
						type='number'
						onChange={(e) => handleChange('quantity', e.target.value)}
						required={true}
						small
					/>
				</div>
				<SizeSelector
					selectedSizes={productData.sizes}
					toggleSizes={toggleSizes}
				/>
				<div className='flex gap-8 items-end flex-wrap sm:flex-nowrap mr-auto'>
					<CheckboxComponent
						label='Add to bestseller'
						checked={productData.bestseller}
						onChange={() => handleChange('bestseller', !productData.bestseller)}
					/>
				</div>
				<input
					className='mt-3 px-8 py-2 bg-blue-600 text-white border-2 border-blue-700 active:scale-95 transition-all duration-150 ease-in-out w-fit cursor-pointer'
					type='submit'
					value={loading ? 'Adding Product' : 'Add Product'}
					disabled={loading}
				/>
			</form>
		</div>
	);
};

export default AddProduct;
