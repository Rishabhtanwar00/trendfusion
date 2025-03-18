const RecentOrders = () => {
	const recentOrders = [
		{ id: '#1001', customer: 'John Doe', status: 'Completed', amount: '₹ 870' },
		{
			id: '#1002',
			customer: 'Alex Carry',
			status: 'Completed',
			amount: '₹ 680',
		},
		{
			id: '#1003',
			customer: 'Jane Smith',
			status: 'Pending',
			amount: '₹ 1020',
		},
		{ id: '#1004', customer: 'Jane Doe', status: 'Completed', amount: '₹ 580' },
		{
			id: '#1005',
			customer: 'Mike Johnson',
			status: 'Canceled',
			amount: '₹ 890',
		},
	];

	return (
		<div className='py-2 sm:p-4 bg-transparent rounded-lg w-full'>
			<h2 className='text-xl font-semibold mb-4'>Recent Orders</h2>
			<table className='table-fixed w-full text-center border-separate border-spacing-y-4 text-sm sm:text-base'>
				<thead className=''>
					<tr className='bg-gradient-to-r from-emerald-600 to-emerald-800 shadow-md shadow-emerald-900 text-white'>
						<th className='py-1 px-0.5 sm:px-2'>Order ID</th>
						<th className='py-1 px-0.5 sm:px-2'>Customer</th>
						<th className='py-1 px-0.5 sm:px-2'>Status</th>
						<th className='py-1 px-0.5 sm:px-2'>Amount</th>
					</tr>
				</thead>
				<tbody>
					{recentOrders.map((order) => (
						<tr key={order.id}>
							<td className='py-2 px-0.5 sm:px-2'>{order.id}</td>
							<td className='py-2 px-0.5 sm:px-2'>{order.customer}</td>
							<td
								className={`py-1 px-1 text-[12px] sm:text-base h-fit rounded ${
									order.status === 'Completed' && 'bg-[#00cc00] text-white '
								} ${order.status === 'Pending' && 'bg-[#fc8403] text-white '} ${
									order.status === 'Canceled' && 'bg-[#ff0000] text-white '
								}`}
							>
								{order.status}
							</td>
							<td className='py-2 px-0.5 sm:px-2'>{order.amount}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default RecentOrders;
