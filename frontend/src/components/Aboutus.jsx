import Title from '../components/Title';
import { assets } from '../assets/assets';

const Aboutus = () => {
	return (
		<div className='text-center text-2xl py-8'>
			<Title text1='ABOUT' text2='US' />
			<div className='flex items-center justify-center gap-20 flex-wrap md:flex-nowrap my-10'>
				<img
					className='w-full sm:w-fit h-auto sm:h-[70vh]'
					src={assets.aboutImg}
					alt='about img'
				/>
				<div className='flex flex-col text-base text-gray-500 text-left gap-5 w-full sm:w-1/2'>
					<p>
						TrendFusion was born out of a passion for innovation and a desire to
						revolutionize the way people shop online. Our journey began with a
						simple idea: to provide a platform where customers can easily
						discover, explore, and purchase a wide range of products from the
						comfort of their homes.
					</p>
					<p>
						Since our inception, we've worked tirelessly to curate a diverse
						selection of high-quality products that cater to every taste and
						preference. From fashion and beauty to electronics and home
						essentials, we offer an extensive collection sourced from trusted
						brands and suppliers.
					</p>
					<p className='font-semibold text-gray-800'>Our Mission</p>
					<p>
						Our mission at TrendFusion is to empower customers with choice,
						convenience, and confidence. We're dedicated to providing a seamless
						shopping experience that exceeds expectations, from browsing and
						ordering to delivery and beyond.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Aboutus;
