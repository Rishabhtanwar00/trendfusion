import { assets } from '../assets/assets';

const OurPolicy = () => {
	return (
		<div className='flex flex-col sm:flex-row justify-around items-center gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
			<div className=''>
				<img className='w-12 m-auto mb-5' src={assets.exchangeIcon} alt='' />
				<p className='font-semibold'>Easy Exchange Policy</p>
				<p className='text-sm text-gray-500 pt-1'>
					We offer hassel free exchange policy
				</p>
			</div>
			<div className=''>
				<img className='w-12 m-auto mb-5' src={assets.returnIcon} alt='' />
				<p className='font-semibold'>7 Days Return Policy</p>
				<p className='text-sm text-gray-500 pt-1'>
					We provide 7 days return policy
				</p>
			</div>
			<div className=''>
				<img className='w-12 m-auto mb-5' src={assets.supportIcon} alt='' />
				<p className='font-semibold'>Best Customer Support</p>
				<p className='text-sm text-gray-500 pt-1'>
					We provide 24 * 7 customer support.
				</p>
			</div>
		</div>
	);
};

export default OurPolicy;
