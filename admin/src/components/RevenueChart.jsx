import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';

const RevenueChart = () => {
	const revenueData = [
		{ name: 'COD', value: 3500 },
		{ name: 'UPI', value: 4200 },
		{ name: 'Credit Card', value: 2100 },
	];
	const COLORS = ['#00cc00', '#fc8403', '#ff0000'];

	return (
		<div className='bg-white p-4 shadow-lg rounded-xl'>
			<h2 className='text-xl font-bold mb-4'>Revenue Breakdown</h2>
			<ResponsiveContainer width='100%' height={250}>
				<PieChart>
					<Pie
						dataKey='value'
						data={revenueData}
						cx='50%'
						cy='50%'
						innerRadius={50}
						outerRadius={80}
						fill='#82ca9d'
						label
					>
						{revenueData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Legend />
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default RevenueChart;
