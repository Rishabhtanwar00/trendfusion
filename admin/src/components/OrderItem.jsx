import { useContext } from 'react';
import { ShopContext } from '../context/shopContext';
import useUpdateOrderStatus from '../hooks/useUpdateOrderStatus';
import { toast } from 'react-toastify';

const OrderItem = ({ order }) => {
	const { backendUrl, token } = useContext(ShopContext);

	const { mutate } = useUpdateOrderStatus();
	const handleOrderStatus = async (e, itemId) => {
		try {
			mutate(
				{
					backendUrl,
					token,
					itemId,
					status: e.target.value,
				},
				{
					onError: () => {
						toast.error('Getting Error in Fetching Order Status.');
					},
					onSuccess: () => {
						toast.success('Order status updated successfully.');
					},
				}
			);
		} catch (err) {
			console.log('error in updating order status: ' + err.message);
			toast.error('Getting Error in Fetching Order Status.');
		}
	};

	return (
		<div className='pt-3 px-5 pb-3 border border-gray-300 grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[2fr_1fr_1fr_1fr] mt-3 bg-white rounded'>
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
	);
};

export default OrderItem;
