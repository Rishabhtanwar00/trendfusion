import { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/shopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const Orders = () => {
	const { token, backendUrl, currency, loading, setLoading, navigate } =
		useContext(ShopContext);

	const [ordersData, setOrdersData] = useState([]);

	const fetchUserOrders = async () => {
		setLoading(true);
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/order/user-orders`,
				{},
				{ headers: { token } }
			);

			if (data.error) {
				// toast.error(data.error);
				return;
			}

			const orderItems = [];

			data.orders.map((order) =>
				order.items.map((item) => {
					item['orderid'] = order._id;
					item['status'] = order.status;
					item['payment'] = order.payment;
					item['paymentMethod'] = order.paymentMethod;
					item['date'] = order.date;
					orderItems.push(item);
				})
			);

			setOrdersData(orderItems.reverse());
		} catch (err) {
			console.log('error is fetching user orders: ' + err.message);
			toast.error('Error in fetching orders :(');
			setLoading(false);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchUserOrders();
	}, [token]);

	return (
		<div className='my-10'>
			<div className='text-2xl'>
				<Title text1='MY' text2='ORDERS' />
			</div>
			<div className='flex flex-col gap-5 mt-5 '>
				{!loading ? (
					ordersData.map((item, index) => (
						<div
							key={index}
							className='flex flex-col sm:flex-row items-start sm:items-center sm:justify-between border-y p-2 text-sm gap-3'
						>
							<div className='flex gap-3'>
								<Link to={`/product/${item._id}`}>
									<img
										className='max-h-[120px] h-auto w-auto'
										src={item.image[0]}
										alt='product image'
									/>
								</Link>
								<div className='flex flex-col gap-3'>
									<p className='text-base'>{item.name}</p>
									<div className='flex gap-3'>
										<p>
											{currency}
											{item.price}
										</p>
										<p>Quantity: {item.quantity}</p>
										<p>Size: {item.size}</p>
									</div>
									<p>
										Date:{' '}
										<span className='text-gray-500'>
											{new Date(item.date).toDateString()}
										</span>
									</p>
									<p>
										Payment:{' '}
										<span className='text-gray-500'>{item.paymentMethod}</span>
									</p>
								</div>
							</div>
							<div className='w-full md:w-1/2 flex justify-between'>
								<div className='flex items-center gap-3 text-gray-500'>
									<p className='h-2 w-2 rounded-full bg-green-500'></p>
									<p>{item.status}</p>
								</div>
								<button
									onClick={() => navigate(`/track-order/${item.orderid}`)}
									className='border bg-black text-white px-3 py-2 active:scale-90 transition-all duration-150 ease-in-out'
								>
									Track Order
								</button>
							</div>
						</div>
					))
				) : (
					<Loader loaderText='Fetching Orders...' />
				)}
			</div>
		</div>
	);
};

export default Orders;
