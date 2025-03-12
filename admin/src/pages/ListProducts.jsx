import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader.jsx';
import { assets } from '../assets/assets.js';
import SearchBar from '../components/SearchBar.jsx';
import { ShopContext } from '../context/shopContext.jsx';

const ListProducts = () => {
	const { backendUrl, navigate, token, loading, setLoading, categories } =
		useContext(ShopContext);
	const [allProducts, setAllProducts] = useState([]);
	const [search, setSearch] = useState('');
	const [showFilter, setShowFilter] = useState(false);
	const [filterProducts, setFilterProducts] = useState([]);
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const [subCategories, setSubCategories] = useState([]);

	const toogleFilter = () => {
		setShowFilter(!showFilter);
	};

	const handleCategory = (e) => {
		if (category.includes(e.target.value)) {
			setCategory((prev) => prev.filter((item) => item !== e.target.value));
		} else {
			setCategory((prev) => [...prev, e.target.value]);
		}
	};

	const handleSubCategory = (e) => {
		if (subCategory.includes(e.target.value)) {
			setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
		} else {
			setSubCategory((prev) => [...prev, e.target.value]);
		}
	};

	const fetchAllProducts = async () => {
		setLoading(true);
		try {
			const result = await axios.get(`${backendUrl}/api/product/list`);
			result.data.products && setAllProducts(result.data.products);
		} catch (err) {
			console.log(
				'error in fetching products in list products page: ' + err.message
			);
			toast.error('Error in fetching products :(');
			setLoading(false);
		}
		setLoading(false);
	};

	const applyFilter = () => {
		let productsCopy = allProducts.slice();

		if (search) {
			productsCopy = productsCopy.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}

		if (category.length > 0) {
			productsCopy = productsCopy.filter((item) =>
				category.includes(item.category)
			);
		}

		if (subCategory.length > 0) {
			productsCopy = productsCopy.filter((item) =>
				subCategory.includes(item.subCategory)
			);
		}
		setFilterProducts(productsCopy);
	};

	const deleteProduct = async (id) => {
		const decision = confirm('Are you sure you want to remove this product?');
		if (decision)
			try {
				const result = await axios.post(
					`${backendUrl}/api/product/remove`,
					{ id },
					{ headers: { token } }
				);

				if (result.data.mssg) {
					toast.success(result.data.mssg);
					await fetchAllProducts();
				} else {
					toast.error(result.data.error);
				}
			} catch (err) {
				console.log(
					'error in deleting product in list products page: ' + err.message
				);
				toast.error(err.message);
			}
	};

	const fetchSubCategories = async () => {
		if (category.length > 0) {
			setSubCategories([]);
			for (let categoryItem of category) {
				try {
					const { data } = await axios.post(
						`${backendUrl}/api/subcategory/all`,
						{ category: categoryItem },
						{ headers: { token } }
					);

					if (data.error) {
						console.log(data.error);
					}

					// console.log(data.subcategories);
					setSubCategories((prev) => {
						const uniqueSubCategories = new Map();
						[...prev, ...data.subcategories].forEach((sub) => {
							uniqueSubCategories.set(sub._id, sub); // Overwrites duplicates
						});
						return Array.from(uniqueSubCategories.values());
					});
				} catch (err) {
					console.log('error in fetchSubCategories: ' + err.message);
				}
			}
		}
	};

	useEffect(() => {
		fetchSubCategories();
	}, [category]);

	useEffect(() => {
		console.log(subCategories);
	}, [subCategories]);

	useEffect(() => {
		fetchAllProducts();
	}, []);

	useEffect(() => {
		applyFilter();
	}, [category, subCategory, search, showFilter, allProducts]);

	return (
		<div>
			<div className='heading mb-5'>
				<h1 style={{ '--bg-color': 'rgb(239 68 68)' }}>All Products</h1>
			</div>
			<div className='flex justify-between items-start'>
				<div className='w-fit text-left'>
					<p
						onClick={toogleFilter}
						className='text-base text-black font-medium flex items-center'
					>
						FILTERS
						<img
							className={`${
								showFilter ? 'rotate-90' : ''
							} max-w-[20px] w-auto h-auto ml-0 transition-all duration-75 ease-in-out cursor-pointer`}
							src={assets.backIcon}
							alt=''
						/>
					</p>
					<div className='flex gap-5 flex-wrap'>
						<div
							className={`w-[200px] h-fit text-base text-gray-500 border border-black p-3 flex flex-col gap-1 ${
								showFilter ? 'block' : 'hidden'
							} my-3`}
						>
							<p className=' text-black font-medium mb-1 text-xs'>CATEGORIES</p>
							{categories.map((categoryItem, index) => (
								<p key={index} className=''>
									<input
										className='mr-2'
										type='checkbox'
										value={categoryItem.name}
										onClick={handleCategory}
									/>
									{categoryItem.name}
								</p>
							))}
						</div>

						<div
							className={`w-[200px] text-base text-gray-500 border border-black p-3 flex flex-col gap-1 ${
								showFilter ? 'block' : 'hidden'
							} my-3`}
						>
							<p className=' text-black font-medium mb-1 text-xs'>
								SUB CATEGORIES
							</p>
							{subCategories.map((subCategoryItem, index) => (
								<p key={index} className=''>
									<input
										className='mr-2'
										type='checkbox'
										value={subCategoryItem.name}
										onClick={handleSubCategory}
									/>
									{subCategoryItem.name}
								</p>
							))}
						</div>
					</div>
				</div>
				<SearchBar
					search={search}
					setSearch={setSearch}
					placeholder='Search product here'
				/>
			</div>

			<div className=''>
				<div className='w-full hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr] bg-green-500 text-black px-2 py-1 mt-5 text-left tracking-wider'>
					<p>Image</p>
					<p>Name</p>
					<p>Category</p>
					<p>Price</p>
					<p className='text-center'>Action</p>
				</div>
				{!loading ? (
					filterProducts.map((item, index) => (
						<div key={index}>
							<div className='w-full hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr] border px-2 py-1 mt-5 text-left text-base items-center bg-white tracking-wide'>
								<img className='w-12' src={item.image[0]} alt='' />
								<p>{item.name}</p>
								<p>{item.category}</p>
								<p>
									{'₹ '}
									{item.price}
								</p>
								<div className='flex gap-3 justify-center'>
									<button
										onClick={() => navigate(`/update-product/${item._id}`)}
										className='text-center px-2 py-0.5 bg-green-500 rounded border-2 text-white'
									>
										Update
									</button>
									<button
										onClick={() => deleteProduct(item._id)}
										className='rounded-full border-2 bg-red-500 w-fit p-2'
									>
										<img
											className='w-[20px]'
											src={assets.deleteIcon}
											alt='delete icon'
										/>
									</button>
								</div>
							</div>
							<div className='w-full flex-col items-center justify-center sm:hidden border px-2 py-1 mt-5 text-left text-base'>
								<div className='flex justify-start gap-5'>
									<img className='w-12' src={item.image[0]} alt='' />
									<div className=''>
										<p>{item.name}</p>
										<p className='text-gray-600'>Category: {item.category}</p>
									</div>
								</div>
								<div className='flex justify-between mt-3 mb-1 pr-3'>
									<p>
										{'₹ '}
										{item.price}
									</p>
									
								<div className='flex gap-3 justify-center'>
									<button
										onClick={() => navigate(`/update-product/${item._id}`)}
										className='text-center px-2 py-0.5 bg-green-500 rounded border-2 text-white'
									>
										Update
									</button>
									<button
										onClick={() => deleteProduct(item._id)}
										className='rounded-full border-2 bg-red-500 w-fit p-2'
									>
										<img
											className='w-[20px]'
											src={assets.deleteIcon}
											alt='delete icon'
										/>
									</button>
								</div>
								</div>
							</div>
						</div>
					))
				) : (
					<Loader loading={loading} loaderText='Fetching Products...' />
				)}
			</div>
		</div>
	);
};

export default ListProducts;
