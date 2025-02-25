import { useEffect, useState } from 'react';
import { backendUrl } from '../App.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../assets/assets.js';
import Loader from '../components/Loader.jsx';

const Orders = ({ token, loading, setLoading }) => {
	const [ordersData, setOrdersData] = useState([]);

	const fetchOrdersData = async () => {
		setLoading(true);
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/order/all`,
				{},
				{ headers: { token } }
			);

			if (data.error) {
				toast.error(data.error);
				return;
			}

			setOrdersData(data.orders.reverse());
		} catch (err) {
			console.log('error in fetching all orders: ' + err.message);
			toast.error('error in fetching orders :(');
			setLoading(false);
		}
		setLoading(false);
	};

	const handleOrderStatus = async (e, itemId) => {
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/order/update-status`,
				{ itemId, status: e.target.value },
				{ headers: { token } }
			);

			if (data.error) {
				toast.error(data.error);
				return;
			}

			toast.success(data.mssg);
		} catch (err) {
			console.log('error in updating order status: ' + err.message);
			toast.error(err.message);
		}
	};

	useEffect(() => {
		fetchOrdersData();
	}, [token]);

	return (
		<div>
			<p>Orders Page</p>
			<div className='text-sm sm:text-[15px] tracking-wide text-gray-700 mt-5'>
				{!loading ? (
					ordersData.map((order, index) => (
						<div
							key={index}
							className='pt-8 px-5 pb-3 border border-gray-300 grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] mt-3'
						>
							<img className='w-12 mb-3' src={assets.parcelIcon} alt='' />
							<div className='flex flex-col'>
								{order.items.map((item, index) => (
									<div key={index} className=''>
										<p>
											{item.name} x {item.quantity}{' '}
											<span className='text-black'>{item.size}</span>
										</p>
									</div>
								))}
								<p className='mt-1 text-black'>
									{order.address.firstname} {order.address.lastname}
								</p>
								<p className='mt-2'>{order.address.street + ','}</p>
								<p>
									{order.address.city + ', '}
									{order.address.state + ', '}
									{order.address.country + ', '}
									{order.address.pincode + ', '}
								</p>
								<p>{order.address.phone}</p>
							</div>
							<div className=''>
								<p className='mb-5'>Items: {order.items.length}</p>
								<p>Method: {order.paymentMethod}</p>
								<p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
								<p>Date: {new Date(order.date).toLocaleDateString()}</p>
							</div>
							<div className=''>
								<p>
									{'₹ '}
									{order.amount}
								</p>
							</div>
							<select
								className='w-auto h-auto max-w-[150px] max-h-[40px] px-3 py-2 font-semibold mt-5 sm:mt-0'
								onChange={(e) => handleOrderStatus(e, order._id)}
								name=''
								id=''
								defaultValue={order.status}
							>
								<option value='Order Placed'>Order Placed</option>
								<option value='Packed'>Packed</option>
								<option value='Shipped'>Shipped</option>
								<option value='Out for delivery'>Out for delivery</option>
								<option value='Delivered'>Delivered</option>
							</select>
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
