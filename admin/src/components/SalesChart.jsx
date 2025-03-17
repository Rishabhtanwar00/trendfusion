import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const SalesChart = () => {
	const salesData = [
		{ name: 'Oct', sales: 3000, orders: 1100 },
		{ name: 'Nov', sales: 3500, orders: 2100 },
		{ name: 'Dec', sales: 2000, orders: 1400 },
		{ name: 'Jan', sales: 4000, orders: 2400 },
		{ name: 'Feb', sales: 3000, orders: 2210 },
		{ name: 'Mar', sales: 5000, orders: 3500 },
	];

	return (
		<div className='bg-white p-4 shadow-lg rounded-xl'>
			<h2 className='text-xl font-bold mb-4'>Sales Performance</h2>
			<ResponsiveContainer width='100%' height={250}>
				<LineChart
					data={salesData}
					margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
				>
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						type='monotone'
						dataKey='sales'
						stroke='#00cc00'
						strokeWidth={3}
						dot={{ r: 5 }}
					/>
					<Line
						type='monotone'
						dataKey='orders'
						stroke='#0000ff'
						strokeWidth={3}
						dot={{ r: 5 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default SalesChart;
