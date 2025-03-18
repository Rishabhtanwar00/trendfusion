import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import Title from '../components/Title';

const statusSteps = [
	'Order Placed',
	'Packed',
	'Shipped',
	'Out for delivery',
	'Delivered',
];

const TrackOrder = () => {
	const { orderId } = useParams();
	const { backendUrl, token, currency } = useContext(ShopContext);
	const [orderData, setOrderData] = useState(false);
	const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

	const fetchOrderDetails = async () => {
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/order/single`,
				{ orderId },
				{ headers: { token } }
			);

			if (data.error) {
				console.log('error while fecthing order data: ' + data.error);
				return;
			}

			setOrderData(data.order);

			const index = statusSteps.indexOf(data.order.status);
			setCurrentStatusIndex(index);
		} catch (err) {
			console.log('error in fetchOrderDetails: ' + err.message);
		}
	};

	useEffect(() => {
		fetchOrderDetails();
	}, [orderId]);

	return (
		<div className='max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg border rounded-lg tracking-wide'>
			<div className='text-2xl'>
				<Title text1='TRACK' text2='YOUR ORDER' />
			</div>

			<div className='my-4 flex gap-5 justify-start'>
				<div className='flex flex-col gap-5'>
					<div className='min-w-[350px] border p-4 rounded-lg h-fit shadow-lg'>
						<h2 className='text-lg font-semibold mb-3'>Order Details</h2>
						<div className='flex flex-col gap-1'>
							<p>
								<strong>Order ID:</strong> {orderData._id}
							</p>
							<p>
								<strong>Order Amount:</strong> {currency} {orderData.amount}
							</p>
							<p>
								<strong>Payment Status:</strong>{' '}
								<span
									className={`text-white font-semibold px-2 py-1 ${
										orderData.payment ? 'bg-blue-600' : 'bg-red-500'
									}`}
								>
									{orderData.payment ? 'Paid' : 'Unpaid'}
								</span>
							</p>
							<p>
								<strong>Payment Method:</strong>{' '}
								<span className=''>
									{orderData.paymentMethod === 'COD' ? 'COD' : 'Online'}
								</span>
							</p>
							<p>
								<strong>Order Date:</strong>{' '}
								<span className=''>
									{new Date(orderData.date).toLocaleDateString()}
								</span>
							</p>
						</div>
					</div>
					<div className='border p-4 rounded-lg h-fit shadow-lg'>
						<h2 className='text-lg font-semibold mb-3'>Products in Order</h2>
						<div className='space-y-4'>
							{orderData &&
								orderData.items.map((item) => (
									<div
										key={item._id}
										className='flex items-center border p-3 rounded-lg'
									>
										<Link to={`/product/${item._id}`}>
											<img
												src={item.image[0]}
												alt={item.name}
												className='w-16 h-16 rounded-md object-cover'
											/>
										</Link>
										<div className='ml-4'>
											<p className='font-medium'>{item.name}</p>
											<div className='flex gap-5 mt-1'>
												<p className='py-[1px] px-2 text-white bg-blue-600'>
													{item.size}
												</p>
												<p>
													Qty: {item.quantity} × {currency} {item.price}
												</p>
											</div>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>

				<div className='border p-4 rounded-lg shadow-lg h-fit'>
					<h2 className='text-lg font-semibold mb-3'>Order Status</h2>
					<div className='flex flex-col items-start'>
						{statusSteps.map((step, index) => (
							<div
								key={step}
								className={`min-w-[300px] flex flex-col items-start justify-start ${
									index <= currentStatusIndex
										? 'text-blue-500'
										: 'text-gray-400'
								}`}
							>
								<div className='flex gap-2'>
									<div
										className={`w-6 h-6 rounded-full flex items-center justify-center border ${
											index <= currentStatusIndex
												? 'bg-blue-500 text-white border-blue-500'
												: 'bg-white border-gray-400'
										}`}
									>
										{index + 1}
									</div>

									<p
										className={`${index <= currentStatusIndex && 'text-black'}`}
									>
										{step}
									</p>
								</div>
								{index < statusSteps.length - 1 && (
									<div
										className={`w-1 h-6 ml-[10px] ${
											index < currentStatusIndex ? 'bg-blue-500' : 'bg-gray-300'
										}`}
									></div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='text-center mt-4'>
				<p className='text-gray-500'>
					Need help?{' '}
					<Link to='/orders' className='text-blue-500 underline'>
						Contact Support
					</Link>
				</p>
			</div>
		</div>
	);
};

export default TrackOrder;
