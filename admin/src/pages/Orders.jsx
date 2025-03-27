import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../components/Loader.jsx';
import { ShopContext } from '../context/shopContext.jsx';
import { assets } from '../assets/assets.js';
import SearchBar from '../components/SearchBar.jsx';
import OrdersFilter from '../components/OrdersFilter.jsx';

const Orders = () => {
	const { backendUrl, token, loading, setShouldFetchOrders } =
		useContext(ShopContext);

	const [filterOrders, setFilterOrders] = useState([]);
	const [sortType, setSortType] = useState('relavent');
	const [showFilter, setShowFilter] = useState(false);

	const sortOrders = () => {
		let filterOrdersCopy = filterOrders.slice();
		switch (sortType) {
			case 'low-high':
				setFilterOrders(filterOrdersCopy.sort((a, b) => a.amount - b.amount));
				break;
			case 'high-low':
				setFilterOrders(filterOrdersCopy.sort((a, b) => b.amount - a.amount));
				break;
			default:
				setShouldFetchOrders(true);
		}
	};

	useEffect(() => {
		sortOrders();
	}, [sortType]);

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
			setShouldFetchOrders(true);
		} catch (err) {
			console.log('error in updating order status: ' + err.message);
			toast.error(err.message);
		}
	};

	return (
		<div>
			<OrdersFilter
				setFilterOrders={setFilterOrders}
				showFilter={showFilter}
				setShowFilter={setShowFilter}
			/>
			<div className='heading mb-5'>
				<h1 style={{ '--bg-color': 'rgb(37 99 235)' }}>All Orders</h1>
			</div>
			<div className='flex justify-between'>
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
				<SearchBar placeholder='Search by Product' />
			</div>
			<div className='text-sm sm:text-[15px] tracking-wide text-gray-700 mt-5'>
				<div className='w-full hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr] bg-blue-600 text-white rounded px-2 py-1 mt-5 text-left tracking-wider'>
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
					<p>Status</p>
				</div>
				{!loading ? (
					filterOrders.map((order, index) => (
						<div
							key={index}
							className='pt-3 px-5 pb-3 border border-gray-300 grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[2fr_1fr_1fr_1fr] mt-3 bg-white rounded'
						>
							{/* <img className='w-12 mb-3' src={assets.parcelIcon} alt='' /> */}
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
					<Loader loaderText='Fetching Orders...' />
				)}
			</div>
		</div>
	);
};

export default Orders;
