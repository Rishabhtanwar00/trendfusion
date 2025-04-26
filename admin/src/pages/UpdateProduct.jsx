import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/shopContext';
import BackButton from '../components/BackButton';
import useCategory from '../hooks/useCategory';
import useUpdateProduct from '../hooks/useUpdateProduct';
import useSubCategoryByCategory from '../hooks/useSubCategoryByCategory';
import InputComponent from '../components/InputComponent';
import CheckboxComponent from '../components/CheckboxComponent';
import SizeSelector from '../components/SizeSelector';
import SelectionInputComponent from '../components/SelectionInputComponent';
import TextareaComponent from '../components/TextareaComponent';

const UpdateProduct = () => {
	const { backendUrl, navigate, token, loading, setLoading } =
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

	const { mutate } = useUpdateProduct();
	const { data: categories = [] } = useCategory();
	const { data: subCategories = [] } = useSubCategoryByCategory(
		productData.category
	);

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
		e.preventDefault();
		try {
			setLoading(true);
			mutate(
				{
					backendUrl,
					token,
					productId,
					productData,
				},
				{
					onError: () => {
						toast.error('Error in Updating Product, Try after some time.');
					},
					onSuccess: () => {
						toast.success('Product updated successfully.');
						navigate('/list-products');
					},
				}
			);
		} catch (err) {
			console.log('error in handlesubmit of update product: ' + err.message);
			toast.error('Error in Updating Product, Try after some time.');
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProductData();
	}, [productId]);

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
				<InputComponent
					label='Product Name'
					value={productData.name}
					placeholder='Enter Product Name'
					type='text'
					onChange={(e) => handleChange('name', e.target.value)}
					required={true}
				/>
				<TextareaComponent
					label='Product Description'
					placeholder='Enter Product Description'
					onChange={(e) => handleChange('description', e.target.value)}
					value={productData.description}
					required={true}
					rows={3}
				/>
				<div className='flex gap-8 flex-wrap sm:flex-nowrap mr-auto'>
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
					<InputComponent
						label='Price'
						value={productData.price}
						placeholder='e.g. 200'
						type='number'
						onChange={(e) => handleChange('price', e.target.value)}
						required={true}
						small
					/>
				</div>
				<SizeSelector
					selectedSizes={productData.sizes}
					toggleSizes={toggleSizes}
				/>
				<div className='flex gap-8 items-end flex-wrap sm:flex-nowrap mr-auto'>
					<InputComponent
						label='Quantity'
						value={productData.quantity}
						placeholder='e.g. 5'
						type='number'
						onChange={(e) => handleChange('quantity', e.target.value)}
						required={true}
						small
					/>
					<CheckboxComponent
						label='Add to bestseller'
						checked={productData.bestseller}
						onChange={() => handleChange('bestseller', !productData.bestseller)}
					/>
				</div>
				<input
					className='mt-3 px-8 py-2 bg-blue-600 text-white border-2 border-blue-700 active:scale-95 transition-all duration-150 ease-in-out w-fit cursor-pointer'
					type='submit'
					value={loading ? 'Updating Product' : 'Update Product'}
					disabled={loading}
				/>
			</form>
		</div>
	);
};

export default UpdateProduct;
