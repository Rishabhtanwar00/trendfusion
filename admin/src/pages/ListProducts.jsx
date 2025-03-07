import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader.jsx';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import SearchBar from '../components/SearchBar.jsx';

const ListProducts = ({ token, loading, setLoading }) => {
	const [allProducts, setAllProducts] = useState([]);
	const [search, setSearch] = useState('');
	const [showFilter, setShowFilter] = useState(false);
	const [filterProducts, setFilterProducts] = useState([]);
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const navigate = useNavigate();

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

	useEffect(() => {
		fetchAllProducts();
	}, []);

	useEffect(() => {
		applyFilter();
	}, [category, subCategory, search, showFilter, allProducts]);

	return (
		<div>
			<div className='flex justify-between'>
				<div className='w-fit text-left'>
					<p
						onClick={toogleFilter}
						className='text-base text-black font-medium flex items-center'
					>
						FILTERS
						<img
							className={`${
								showFilter ? 'rotate-90' : ''
							} max-w-[6px] w-auto h-auto ml-2 transition-all duration-75 ease-in-out cursor-pointer`}
							src={assets.backIcon}
							alt=''
						/>
					</p>

					<div
						className={`w-[200px] text-base text-gray-500 border border-black p-3 flex flex-col gap-1 ${
							showFilter ? 'block' : 'hidden'
						} my-3`}
					>
						<p className=' text-black font-medium mb-1 text-xs'>CATEGORIES</p>
						<p className=''>
							<input
								className='mr-2'
								type='checkbox'
								value={'Men'}
								onClick={handleCategory}
							/>
							Men
						</p>
						<p className=''>
							<input
								className='mr-2'
								type='checkbox'
								value={'Women'}
								onClick={handleCategory}
							/>
							Women
						</p>
						<p className=''>
							<input
								className='mr-2'
								type='checkbox'
								value={'Kids'}
								onClick={handleCategory}
							/>
							Kids
						</p>
					</div>

					<div
						className={`w-[200px] text-base text-gray-500 border border-black p-3 flex flex-col gap-1 ${
							showFilter ? 'block' : 'hidden'
						} my-3`}
					>
						<p className=' text-black font-medium mb-1 text-xs'>
							SUB CATEGORIES
						</p>
						<p className=''>
							<input
								className='mr-2'
								type='checkbox'
								value={'Topwear'}
								onClick={handleSubCategory}
							/>
							Topwear
						</p>
						<p className=''>
							<input
								className='mr-2'
								type='checkbox'
								value={'Bottomwear'}
								onClick={handleSubCategory}
							/>
							Bottomwear
						</p>
						<p className=''>
							<input
								className='mr-2'
								type='checkbox'
								value={'Winterwear'}
								onClick={handleSubCategory}
							/>
							Winterwear
						</p>
					</div>
				</div>
				<SearchBar search={search} setSearch={setSearch} />
			</div>

			<div className=''>
				<div className='w-full hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr] bg-gray-200 px-2 py-1 mt-5 text-left'>
					<p>Image</p>
					<p>Name</p>
					<p>Category</p>
					<p>Price</p>
					<p className='text-center'>Action</p>
				</div>
				{!loading ? (
					filterProducts.map((item, index) => (
						<div key={index}>
							<div className='w-full hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_0.5fr_1fr] border px-2 py-1 mt-5 text-left text-base items-center'>
								<img className='w-12' src={item.image[0]} alt='' />
								<p>{item.name}</p>
								<p>{item.category}</p>
								<p>
									{'₹ '}
									{item.price}
								</p>
								<button
									onClick={() => deleteProduct(item._id)}
									className='rounded-full border-2 bg-pink-300 border-black w-fit'
								>
									<img
										className='w-10'
										src={assets.deleteIcon}
										alt='delete icon'
									/>
								</button>
								<button
									onClick={() => navigate(`/update-product/${item._id}`)}
									className='text-center px-2 py-0.5 bg-pink-300 rounded border-2 border-black'
								>
									Update
								</button>
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
									<button
										onClick={() => deleteProduct(item._id)}
										className='rounded-full border-2 bg-pink-300 border-black w-fit'
									>
										<img
											className='w-10'
											src={assets.deleteIcon}
											alt='delete icon'
										/>
									</button>
									<button
										onClick={() => navigate(`/update-product/${item._id}`)}
										className='text-center px-2 py-0.5 bg-pink-300 rounded border-2 border-black'
									>
										Update
									</button>
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
