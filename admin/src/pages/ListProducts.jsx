import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader.jsx';
import { assets } from '../assets/assets.js';
import SearchBar from '../components/SearchBar.jsx';
import { ShopContext } from '../context/shopContext.jsx';
import FilterComponent from '../components/FilterComponent.jsx';

const ListProducts = () => {
	const {
		backendUrl,
		navigate,
		token,
		loading,
		setShouldFetchCategories,
		setShouldFetchProducts,
	} = useContext(ShopContext);
	const [showFilter, setShowFilter] = useState(false);
	const [filterProducts, setFilterProducts] = useState([]);
	const [sortType, setSortType] = useState('relavent');

	const sortProducts = () => {
		let filterProductsCopy = filterProducts.slice();
		switch (sortType) {
			case 'low-high':
				setFilterProducts(filterProductsCopy.sort((a, b) => a.price - b.price));
				break;
			case 'high-low':
				setFilterProducts(filterProductsCopy.sort((a, b) => b.price - a.price));
				break;
			default:
				setShouldFetchProducts(true);
		}
	};

	useEffect(() => {
		sortProducts();
	}, [sortType]);

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
					setShouldFetchCategories(true);
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

	return (
		<div>
			<FilterComponent
				setFilterProducts={setFilterProducts}
				showFilter={showFilter}
				setShowFilter={setShowFilter}
			/>
			<div className='heading mb-5'>
				<h1 style={{ '--bg-color': '#f02028' }}>All Products</h1>
			</div>
			<div className='flex justify-between items-center'>
				<button
					onClick={() => setShowFilter(!showFilter)}
					className='text-base text-black font-medium flex items-center'
				>
					FILTER
					<img
						className={`${
							showFilter ? 'rotate-90' : ''
						} max-w-[8px] w-auto h-auto ml-2 transition-all duration-75 ease-in-out cursor-pointer`}
						src={assets.backIcon}
						alt=''
					/>
				</button>
				<SearchBar placeholder='Search product here' />
			</div>

			<div className=''>
				<div className='w-full hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr] bg-gradient-to-r from-red-600 to-red-700 shadow-md shadow-red-800 text-white rounded px-2 py-1 mt-5 text-left tracking-wider'>
					<p>Image</p>
					<p>Name</p>
					<p>Category</p>
					<div className='flex items-center gap-1'>
						<p
							className='cursor-pointer'
							onClick={() => setSortType('relavent')}
						>
							Price
						</p>
						<div className='flex flex-col'>
							<button onClick={() => setSortType('high-low')}>
								<img
									className={`w-[8px] h-auto ${
										sortType === 'high-low' ? 'opacity-100' : 'opacity-80'
									}`}
									src={assets.upIconWhite}
									alt=''
								/>
							</button>
							<button onClick={() => setSortType('low-high')}>
								<img
									className={`w-[8px] h-auto rotate-180 ${
										sortType === 'low-high' ? 'opacity-100' : 'opacity-80'
									}`}
									src={assets.upIconWhite}
									alt=''
								/>
							</button>
						</div>
					</div>
					<p className='text-center'>Action</p>
				</div>
				{!loading ? (
					filterProducts.map((item, index) => (
						<div key={index}>
							<div className='w-full hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr] border px-2 py-1 mt-5 text-left text-base items-center bg-white tracking-wide rounded'>
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
										className='text-center px-2 py-0.5 bg-gradient-to-r from-green-600 to-green-700 shadow shadow-green-800 rounded text-white'
									>
										Update
									</button>
									<button
										onClick={() => deleteProduct(item._id)}
										className='rounded-full bg-gradient-to-r from-red-600 to-red-700 shadow shadow-red-800 w-fit p-2'
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
											className='text-center px-2 py-0.5 bg-gradient-to-r from-green-600 to-green-700 shadow shadow-green-800 rounded text-white'
										>
											Update
										</button>
										<button
											onClick={() => deleteProduct(item._id)}
											className='rounded-full bg-gradient-to-r from-red-600 to-red-700 shadow shadow-red-800 w-fit p-2'
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
