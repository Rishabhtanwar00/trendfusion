import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { useEffect, useState } from 'react';

const ListProducts = ({ token }) => {
	const [allProducts, setAllProducts] = useState([]);

	const fetchAllProducts = async () => {
		try {
			const result = await axios.get(`${backendUrl}/api/product/list`);
			result.data.products && setAllProducts(result.data.products);
		} catch (err) {
			console.log(
				'error in fetching products in list products page: ' + err.message
			);
			toast.error(err.message);
		}
	};

	const deleteProduct = async (id) => {
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

	return (
		<div>
			<p>All added Products list</p>
			<div className=''>
				<div className='w-full hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-200 px-2 py-1 mt-5 text-left'>
					<p>Image</p>
					<p>Name</p>
					<p>Category</p>
					<p>Price</p>
					<p className='text-center'>Action</p>
				</div>
				{allProducts.map((item, index) => (
					<div key={index}>
						<div className='w-full hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] border px-2 py-1 mt-5 text-left text-base items-center'>
							<img className='w-12' src={item.image[0]} alt='' />
							<p>{item.name}</p>
							<p>{item.category}</p>
							<p>
								{'₹ '}
								{item.price}
							</p>
							<button
								onClick={() => deleteProduct(item._id)}
								className='text-center px-2 py-0.5 bg-pink-300 rounded border-2 border-black'
							>
								Remove
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
									className='text-center px-2 py-0.5  bg-pink-300 rounded border-2 border-black'
								>
									Remove
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ListProducts;
