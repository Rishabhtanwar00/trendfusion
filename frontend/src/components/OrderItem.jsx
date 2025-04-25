import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';

const OrderItem = ({ order }) => {
	const { currency, navigate } = useContext(ShopContext);
	return (
		<div className='flex flex-col sm:flex-row items-start sm:items-center sm:justify-between border-y p-2 pr-5 text-sm gap-3 bg-white rounded'>
			<div className='flex gap-3'>
				<Link to={`/product/${order._id}`}>
					<img
						loading='lazy'
						className='max-h-[120px] h-auto w-auto rounded'
						src={order.image[0]}
						alt={`${order.name} img`}
					/>
				</Link>
				<div className='flex flex-col gap-3'>
					<p className='text-base'>{order.name}</p>
					<div className='flex gap-1 lg:gap-3 items-center'>
						<p className='bg-red-600 text-white px-2 py-0.5'>
							{currency} {order.price}
						</p>
						<p>
							Quantity:{' '}
							<span className='bg-emerald-600 text-white px-2 py-0.5'>
								{order.quantity}
							</span>
						</p>
						<p>
							Size:{' '}
							<span className='bg-emerald-600 text-white px-2 py-0.5'>
								{order.size}
							</span>
						</p>
					</div>
					<p>
						Date:{' '}
						<span className='text-gray-700'>
							{new Date(order.date).toLocaleDateString()}
						</span>
					</p>
					<p>
						Payment:{' '}
						<span className='text-gray-700 text-base'>
							{order.paymentMethod}
						</span>
					</p>
				</div>
			</div>
			<div className='w-full md:w-1/2 flex justify-between pl-5 lg:pl-0'>
				<div className='flex items-center gap-3 text-gray-500'>
					<p className='h-2 w-2 rounded-full bg-green-500'></p>
					<p>{order.status}</p>
				</div>
				<button
					onClick={() => navigate(`/track-order/${order.orderid}`)}
					className={`min-w-[102px] text-white px-3 py-2 active:scale-90 transition-all duration-150 ease-in-out rounded ${
						order.status === 'Delivered' ? 'bg-blue-600' : 'bg-blue-600'
					}`}
				>
					{order.status === 'Delivered' ? 'See Details' : 'Track Order'}
				</button>
			</div>
		</div>
	);
};

export default OrderItem;
