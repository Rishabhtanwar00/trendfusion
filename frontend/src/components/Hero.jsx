import { assets } from '../assets/assets';

const Hero = () => {
	return (
		<div className='flex flex-col sm:flex-row border border-gray-400 mt-14'>
			<div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
				<div className='text-[#414141]'>
					<div className='flex items-center gap-2'>
						<p className='w-8 sm:w-11 h-[2px] bg-[#414141]'></p>
						<p className='font-medium text-sm md:text-base'>BEST SELLERS</p>
					</div>
					<h1 className='prata-regular text-3xl lg:text-5xl leading-relaxed sm:py-3'>
						NEW ARRIVALS
					</h1>
					<div className='flex items-center gap-2'>
						<p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
						<p className='w-8 sm:w-11 h-[2px] bg-[#414141]'></p>
					</div>
				</div>
			</div>
			<img className='w-full sm:w-1/2' src={assets.heroImg} alt='hero img' />
		</div>
	);
};

export default Hero;
