import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
	return (
		<div>
			<div className='py-5 flex flex-wrap justify-between text-gray-600 gap-3 text-sm border-t-2'>
				<div className='w-full sm:w-2/4'>
					<Link to='/'>
						<img
							className='h-auto w-auto max-h-10 mb-5'
							src={assets.trendfusionLogo}
							alt='TrendFusion logo'
						/>
					</Link>
					<p className='w-full sm:w-3/4'>
					TrendFusion – Your go-to fashion destination for the latest trends and timeless styles. Shop with ease, enjoy secure payments, fast delivery, and hassle-free returns!
					</p>
				</div>
				<div>
					<p className='text-gray-800 mb-3 text-xl font-medium'>COMPANY</p>
					<ul className='flex flex-col gap-1'>
						<li>Home</li>
						<li>About us</li>
						<li>Delivery</li>
						<li>Privacy Policy</li>
					</ul>
				</div>
				<div>
					<p className='text-gray-800 mb-3 text-xl font-medium'>GET IN TOUCH</p>
					<ul className='flex flex-col gap-1'>
						<li>+91 92938382039</li>
						<li>trendfusion@gmail.com</li>
					</ul>
				</div>
			</div>
			<div className='py-3 text-sm text-gray-800 border-t-2 text-center'>
				<p>Copyright 2024@ TrendFusion - All Right Reserved.</p>
			</div>
		</div>
	);
};

export default Footer;
