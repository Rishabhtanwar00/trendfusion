import { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/shopContext';
import axios from 'axios';
import BackButton from '../components/BackButton';
import OrderItem from '../components/OrderItem';
import OrderSkeleton from '../../../admin/src/components/OrderSkeleton';

const Orders = () => {
	const { token, backendUrl, loading, setLoading } = useContext(ShopContext);

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
							ordersData.map((order, index) => (
								<OrderItem key={index} order={order} />
							))
						) : (
							<p className='text-xl font-semibold mt-[90px] text-center'>
								No Orders Found.
							</p>
						)
					) : (
						<>
							{[...Array(3)].map((_, index) => (
								<OrderSkeleton key={index} />
							))}
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default Orders;
