import { assets } from '../assets/assets.js';
import SalesChart from '../components/SalesChart.jsx';
import OrderStatusChart from '../components/OrderStatusChart.jsx';
import ProductsChart from '../components/ProductsChart.jsx';
import RevenueChart from '../components/RevenueChart.jsx';
import RecentOrders from '../components/RecentOrders.jsx';

const LandingPage = () => {
	return (
		<div>
			<div className='grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] gap-5 xl:gap-10'>
				<div className='flex flex-wrap items-center justify-center p-5 gap-8 text-white bg-gradient-to-r from-red-500 to-red-800 shadow-md shadow-red-900'>
					<img className='h-[40px]' src={assets.salesIcon} alt='' />
					<div className='text-center xl:text-left'>
						<p>Total Sales</p>
						<p className='ml-1'>₹ 1,50,000</p>
					</div>
				</div>
				<div className='flex flex-wrap items-center justify-center p-5 gap-8 text-white bg-gradient-to-r from-emerald-500 to-emerald-800 shadow-md shadow-emerald-900'>
					<img className='h-[40px]' src={assets.customersIcon} alt='' />
					<div className='text-center xl:text-left'>
						<p>New Customers</p>
						<p className='ml-1'>93</p>
					</div>
				</div>
				<div className='flex flex-wrap items-center justify-center p-5 gap-8 text-white bg-gradient-to-r from-blue-600 to-blue-800 shadow-md shadow-blue-900'>
					<img className='h-[40px]' src={assets.ordersIcon} alt='' />
					<div className='text-center xl:text-left'>
						<p>New Orders</p>
						<p className='ml-1'>100</p>
					</div>
				</div>
				<div className='flex flex-wrap items-center justify-center p-5 gap-8 text-white bg-gradient-to-r from-orange-500 to-orange-800 shadow-md shadow-orange-900'>
					<img className='h-[40px]' src={assets.revenueIcon} alt='' />
					<div className='text-center xl:text-left'>
						<p>Total Profit</p>
						<p className='ml-1'>₹ 1,00,000</p>
					</div>
				</div>
			</div>
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
