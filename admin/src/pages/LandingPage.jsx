import SalesDetails from '../components/SalesDetails.jsx';
import SalesChart from '../components/SalesChart.jsx';
import OrderStatusChart from '../components/OrderStatusChart.jsx';
import ProductsChart from '../components/ProductsChart.jsx';
import RevenueChart from '../components/RevenueChart.jsx';
import RecentOrders from '../components/RecentOrders.jsx';

const LandingPage = () => {
	return (
		<div>
			<SalesDetails />
			<div className='mt-10 mb-5 grid grid-cols-[1fr] lg:grid-cols-[2fr_1fr] gap-5'>
				<SalesChart />
				<OrderStatusChart />
			</div>
			<div className='grid grid-cols-[1fr] lg:grid-cols-[1fr_1fr] gap-10'>
				<RecentOrders />
				<div className='flex flex-col flex-wrap lg:flex-nowrap gap-5'>
					<ProductsChart />
					<RevenueChart />
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
