import { useContext } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/shopContext';
import { toast } from 'react-toastify';
import useDeleteProduct from '../hooks/useDeleteProduct';

const ProductItem = ({ item }) => {
	const { backendUrl, token, navigate } = useContext(ShopContext);
	const { mutate } = useDeleteProduct();

	const deleteProduct = async (id) => {
		const decision = confirm('Are you sure you want to remove this product?');
		if (decision)
			try {
				mutate(
					{
						backendUrl,
						token,
						id,
					},
					{
						onError: () => {
							toast.error('Getting error in deleting product.');
						},
						onSuccess: () => {
							toast.success('Product deleted successfully.');
						},
					}
				);
			} catch (err) {
				console.log(
					'error in deleting product in list products page: ' + err.message
				);
				toast.error(err.message);
			}
	};

	return (
		<>
			<div className='w-full hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr] border px-2 py-1 mt-5 text-left text-base items-center bg-white tracking-wide rounded'>
				<img
					loading='lazy'
					className='w-12'
					src={item.image[0]}
					alt={`${item.name} img`}
				/>
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
							loading='lazy'
							className='w-[20px]'
							src={assets.deleteIcon}
							alt='delete icon'
						/>
					</button>
				</div>
			</div>
			<div className='w-full flex-col items-center justify-center sm:hidden border px-2 py-1 mt-5 text-left text-base'>
				<div className='flex justify-start gap-5'>
					<img
						loading='lazy'
						className='w-12'
						src={item.image[0]}
						alt={`${item.name} img`}
					/>
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
								loading='lazy'
								className='w-[20px]'
								src={assets.deleteIcon}
								alt='delete icon'
							/>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductItem;
