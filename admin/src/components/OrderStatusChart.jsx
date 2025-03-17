import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';

const OrderStatusChart = () => {
	const orderStatusData = [
		{ name: 'Completed', value: 300 },
		{ name: 'Pending', value: 120 },
		{ name: 'Canceled', value: 50 },
	];
	const COLORS = ['#00cc00', '#fc8403', '#ff0000'];

	return (
		<div className='bg-white p-4 shadow-lg rounded-xl'>
			<h2 className='text-xl font-bold mb-4'>Order Status Breakdown</h2>
			<ResponsiveContainer width='100%' height={250}>
				<PieChart>
					<Pie
						dataKey='value'
						data={orderStatusData}
						cx='50%'
						cy='50%'
						outerRadius={80}
						fill='#82ca9d'
						label
					>
						{orderStatusData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index]} />
						))}
					</Pie>
					<Legend />
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default OrderStatusChart;
