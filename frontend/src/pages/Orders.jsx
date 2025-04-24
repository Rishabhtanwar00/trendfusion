import { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/shopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

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
			setLoading(false);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchUserOrders();
	}, [token]);

	return (
		<section className='bg-[#f6f4f1] flex flex-col pt-5 pb-10 px-[20px] sm:px-[40px]'>
			<BackButton />
			<div className='mt-5 mb-10'>
				<div className='text-2xl'>
					<Title text1='MY' text2='ORDERS' />
				</div>
				<div className='w-full hidden sm:flex justify-between bg-gradient-to-b from-blue-600 to-blue-700 shadow-md shadow-blue-900 text-white rounded px-2 py-1 my-5 text-sm text-left tracking-wider'>
					<p>Order Details</p>
					<div className='w-full md:w-1/2 flex justify-between pl-5 lg:pl-0'>
						<p>Order Status</p>
						<p>Track Order</p>{' '}
					</div>
				</div>
				<div className='flex flex-col gap-5 mt-5 '>
					{!loading ? (
						ordersData.length > 0 ? (
							ordersData.map((item, index) => (
								<div
									key={index}
									className='flex flex-col sm:flex-row items-start sm:items-center sm:justify-between border-y p-2 pr-5 text-sm gap-3 bg-white rounded'
								>
									<div className='flex gap-3'>
										<Link to={`/product/${item._id}`}>
											<img
												loading='lazy'
												className='max-h-[120px] h-auto w-auto rounded'
												src={item.image[0]}
												alt={`${item.name} img`}
											/>
										</Link>
										<div className='flex flex-col gap-3'>
											<p className='text-base'>{item.name}</p>
											<div className='flex gap-1 lg:gap-3 items-center'>
												<p className='bg-red-600 text-white px-2 py-0.5'>
													{currency} {item.price}
												</p>
												<p>
													Quantity:{' '}
													<span className='bg-emerald-600 text-white px-2 py-0.5'>
														{item.quantity}
													</span>
												</p>
												<p>
													Size:{' '}
													<span className='bg-emerald-600 text-white px-2 py-0.5'>
														{item.size}
													</span>
												</p>
											</div>
											<p>
												Date:{' '}
												<span className='text-gray-700'>
													{new Date(item.date).toLocaleDateString()}
												</span>
											</p>
											<p>
												Payment:{' '}
												<span className='text-gray-700 text-base'>
													{item.paymentMethod}
												</span>
											</p>
										</div>
									</div>
									<div className='w-full md:w-1/2 flex justify-between pl-5 lg:pl-0'>
										<div className='flex items-center gap-3 text-gray-500'>
											<p className='h-2 w-2 rounded-full bg-green-500'></p>
											<p>{item.status}</p>
										</div>
										<button
											onClick={() => navigate(`/track-order/${item.orderid}`)}
											className={`min-w-[102px] text-white px-3 py-2 active:scale-90 transition-all duration-150 ease-in-out rounded ${
												item.status === 'Delivered'
													? 'bg-blue-600'
													: 'bg-blue-600'
											}`}
										>
											{item.status === 'Delivered'
												? 'See Details'
												: 'Track Order'}
										</button>
									</div>
								</div>
							))
						) : (
							<p className='text-xl font-semibold mt-[90px] text-center'>
								No Orders Found.
							</p>
						)
					) : (
						<Loader loaderText='Fetching Orders...' />
					)}
				</div>
			</div>
		</section>
	);
};

export default Orders;
