import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { assets } from '../assets/assets.js';
import { ShopContext } from '../context/shopContext.jsx';

import SearchBar from '../components/SearchBar.jsx';
import OrdersFilter from '../components/OrdersFilter.jsx';

import useOrders from '../hooks/useOrders.js';
import OrderSkeleton from '../components/OrderSkeleton.jsx';

const Orders = () => {
	const { backendUrl, token } = useContext(ShopContext);

	const { data: orders = [], isLoading: ordersLoading } = useOrders();
	const [search, setSearch] = useState('');
	const [filterOrders, setFilterOrders] = useState([]);
	const [sortType, setSortType] = useState('relavent');
	const [showFilter, setShowFilter] = useState(false);

	const sortOrders = () => {
		let filterOrdersCopy = [...filterOrders];
		switch (sortType) {
			case 'low-high':
				setFilterOrders(filterOrdersCopy.sort((a, b) => a.amount - b.amount));
				break;
			case 'high-low':
				setFilterOrders(filterOrdersCopy.sort((a, b) => b.amount - a.amount));
				break;
			default:
				setFilterOrders(orders);
				break;
		}
	};

	useEffect(() => {
		sortOrders();
	}, [sortType]);

	useEffect(() => {
		if (orders && JSON.stringify(orders) !== JSON.stringify(filterOrders)) {
			setFilterOrders(orders);
		}
	}, [orders]);

	const handleOrderStatus = async (e, itemId) => {
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/order/update-status`,
				{ itemId, status: e.target.value },
				{ headers: { token } }
			);

			if (data.error) {
				toast.error('Getting Error in Fetching Order Status.');
				return;
			}

			toast.success(data.mssg);
		} catch (err) {
			console.log('error in updating order status: ' + err.message);
			toast.error('Getting Error in Fetching Order Status.');
		}
	};

	return (
		<div className='min-h-screen'>
			{showFilter && (
				<OrdersFilter
					orders={orders}
					setFilterOrders={setFilterOrders}
					showFilter={showFilter}
					setShowFilter={setShowFilter}
					search={search}
				/>
			)}

			<div className='heading mb-5'>
				<h1 style={{ '--bg-color': 'rgb(37 99 235)' }}>All Orders</h1>
			</div>
			<div className='flex justify-between items-center'>
				<button
					onClick={() => setShowFilter(!showFilter)}
					className='text-base text-black font-medium flex items-center'
				>
					FILTER
					<img
						loading='lazy'
						className={`${
							showFilter ? 'rotate-90' : ''
						} max-w-[8px] w-auto h-auto ml-2 transition-all duration-75 ease-in-out cursor-pointer`}
						src={assets.backIcon}
						alt='Arrow icon'
					/>
				</button>
				<SearchBar
					placeholder='Search by Product'
					search={search}
					setSearch={setSearch}
				/>
			</div>
			<div className='text-sm sm:text-[15px] tracking-wide text-gray-700 mt-5'>
				<div className='w-full hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr] bg-gradient-to-r from-blue-600 to-blue-700 shadow-md shadow-blue-900 text-white rounded px-2 py-1 my-5 text-left tracking-wider'>
					<p>Order Details</p>
					<p>Payment Details</p>
					<div className='flex items-center gap-1'>
						<p
							className='cursor-pointer'
							onClick={() => setSortType('relavent')}
						>
							Order Amount
						</p>
						<div className='flex flex-col'>
							<button onClick={() => setSortType('high-low')}>
								<img
									loading='lazy'
									className={`w-[8px] h-auto ${
										sortType === 'high-low' ? 'opacity-100' : 'opacity-80'
									}`}
									src={assets.upIconWhite}
									alt='Up Arrow icon'
								/>
							</button>
							<button onClick={() => setSortType('low-high')}>
								<img
									loading='lazy'
									className={`w-[8px] h-auto rotate-180 ${
										sortType === 'low-high' ? 'opacity-100' : 'opacity-80'
									}`}
									src={assets.upIconWhite}
									alt='Up Arrow icon'
								/>
							</button>
						</div>
					</div>
					<p>Status</p>
				</div>

				{!ordersLoading ? (
					filterOrders.length > 0 ? (
						filterOrders.map((order, index) => (
							<div
								key={index}
								className='pt-3 px-5 pb-3 border border-gray-300 grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[2fr_1fr_1fr_1fr] mt-3 bg-white rounded'
							>
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
									className='w-auto h-auto max-w-[160px] max-h-[40px] px-3 py-2 font-semibold mt-5 sm:mt-0 bg-slate-100'
									onChange={(e) => handleOrderStatus(e, order._id)}
									name=''
									id=''
									value={order.status}
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
						<p className='text-xl font-semibold text-center mt-20'>
							No Orders Found
						</p>
					)
				) : (
					<>
						{[...Array(5)].map((_, index) => (
							<OrderSkeleton key={index} />
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default Orders;
