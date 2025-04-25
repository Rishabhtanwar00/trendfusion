import { useEffect, useState } from 'react';

import { assets } from '../assets/assets.js';

import SearchBar from '../components/SearchBar.jsx';
import OrdersFilter from '../components/OrdersFilter.jsx';

import useOrders from '../hooks/useOrders.js';
import OrderSkeleton from '../components/OrderSkeleton.jsx';
import OrderItem from '../components/OrderItem.jsx';

const Orders = () => {
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
							<OrderItem key={index} order={order} />
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
