import { useContext, useEffect, useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider';
import { ShopContext } from '../context/shopContext';

const OrdersFilter = ({ setFilterOrders, showFilter, setShowFilter }) => {
	const { orders, setLoading, search } = useContext(ShopContext);

	const [orderStatus, setOrderStatus] = useState([]);
	const [paymentMethod, setPaymentMethod] = useState([]);
	const [amountRange, setAmountRange] = useState([0, 10000]);

	const handleOrderStatus = (e) => {
		const value = e.target.value;
		setOrderStatus((prev) =>
			prev.includes(value)
				? prev.filter((status) => status !== value)
				: [...prev, value]
		);
	};

	const handlePaymentMethod = (e) => {
		const value = e.target.value;
		setPaymentMethod((prev) =>
			prev.includes(value)
				? prev.filter((status) => status !== value)
				: [...prev, value]
		);
	};

	const applyOrdersFilter = () => {
		setLoading(true);
		let ordersCopy = orders.slice();

		// Filter by search query
		if (search) {
			ordersCopy = ordersCopy.filter((order) =>
				order.items.some((product) =>
					product.name.toLowerCase().includes(search.toLowerCase())
				)
			);
		}

		if (orderStatus.length > 0) {
			ordersCopy = ordersCopy.filter((order) =>
				orderStatus.includes(order.status.trim())
			);
		}

		if (paymentMethod.length > 0) {
			ordersCopy = ordersCopy.filter((order) =>
				paymentMethod.includes(order.paymentMethod.trim())
			);
		}

		ordersCopy = ordersCopy.filter(
			(order) =>
				parseInt(order.amount) >= amountRange[0] &&
				parseInt(order.amount) <= amountRange[1]
		);

		setFilterOrders(ordersCopy);
		setLoading(false);
	};

	useEffect(() => {
		applyOrdersFilter();
	}, [search, orders, orderStatus, paymentMethod, amountRange]);

	return (
		<div
			className='fixed right-[-17px] top-0 h-[100vh] w-[80vw] sm:w-[350px] bg-slate-100 text-black flex flex-col p-5 transition-all ease-in-out duration-300 z-20 border-l-2 border-gray-300 overflow-y-scroll'
			style={{
				transform: `${showFilter ? 'translateX(0)' : 'translateX(100vw)'}`,
			}}
		>
			<button
				className='border-2 border-[#d41e26] bg-[#f02028] text-white px-1.5 py-0.5 w-fit h-fit rounded'
				onClick={() => setShowFilter(false)}
			>
				Close
			</button>
			<div className='heading mt-5 mb-2'>
				<h1 style={{ '--bg-color': 'rgb(37 99 235)' }}>APPLY FILTER</h1>
			</div>
			<div className='flex flex-col gap-2 mr-[17px]'>
				<div className='w-full min-w-[200px] text-base text-gray-500 border border-black p-3 flex flex-col gap-1 my-3 rounded'>
					<p className=' text-black font-medium mb-1 text-sm'>ORDER STATUS</p>

					{[
						'Order Placed',
						'Packed',
						'Shipped',
						'Out for delivery',
						'Delivered',
					].map((status, index) => (
						<p key={index} className=''>
							<input
								className='mr-2'
								type='checkbox'
								value={status}
								checked={orderStatus.includes(status)}
								onChange={handleOrderStatus}
							/>
							{status}
						</p>
					))}
				</div>
				<div className='w-full min-w-[200px] text-base text-gray-500 border border-black p-3 flex flex-col gap-1 my-3 rounded'>
					<p className=' text-black font-medium mb-1 text-sm'>PAYMENT METHOD</p>

					{['COD', 'Razorpay'].map((method, index) => (
						<p key={index} className=''>
							<input
								className='mr-2'
								type='checkbox'
								value={method}
								checked={paymentMethod.includes(method)}
								onChange={handlePaymentMethod}
							/>
							{method}
						</p>
					))}
				</div>

				<div className='w-full min-w-[200px] block'>
					<p className='font-semibold text-sm my-3'>
						FILTER BY ORDER AMOUNT RANGE
					</p>
					<PriceRangeSlider
						priceRange={amountRange}
						setPriceRange={setAmountRange}
					/>
				</div>
			</div>
		</div>
	);
};

export default OrdersFilter;
