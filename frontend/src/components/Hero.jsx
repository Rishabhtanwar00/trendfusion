import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const sliderData = [
		{
			id: 1,
			image: assets.heroImg,
			title: 'Spring Collection 2025',
			description: 'Refresh your wardrobe with the latest trends in fashion.',
			buttonText: 'Shop Now',
			link: '/collections/spring-2025',
		},
		{
			id: 2,
			image: assets.heroImg2,
			title: 'Flat 50% Off',
			description: "Exclusive deals on summer essentials. Don't miss out!",
			buttonText: 'Grab the Deal',
			link: '/collections/summer-sale',
		},
		{
			id: 3,
			image: assets.heroImg3,
			title: 'New Arrivals',
			description: 'Explore our latest designs tailored for comfort and style.',
			buttonText: 'Explore Now',
			link: '/collections/new-arrivals',
		},
		{
			id: 4,
			image: assets.heroImg4,
			title: 'Limited Edition',
			description: 'Unique designs for those who love to stand out.',
			buttonText: 'Shop Limited Edition',
			link: '/collections/limited-edition',
		},
	];

	const handleNext = () => {
		setCurrentIndex((prevIndex) => prevIndex + 1);
	};

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => prevIndex - 1);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
			);
		}, 8000);

		return () => clearInterval(interval);
	}, [currentIndex]);

	return (
		<div className='relative w-full overflow-hidden'>
			<div
				className='flex transition-transform duration-700 ease-in-out'
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{sliderData.map((slider, index) => (
					<div
						key={index}
						className='flex flex-col sm:flex-row border border-gray-400 mt-14 min-w-full h-[500px]'
					>
						<div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
							<div className='text-[#414141]'>
								<div className='flex items-center gap-2'>
									<p className='w-8 sm:w-11 h-[2px] bg-[#414141]'></p>
									<p className='font-medium text-sm md:text-base'>
										BEST SELLERS
									</p>
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
						<img
							className='w-full sm:w-1/2'
							src={slider.image}
							alt='hero img'
						/>
					</div>
				))}
			</div>
			<div className='absolute top-1/2 left-[10px]'>
				<button
					className='py-1.5 px-2 bg-gray-200 rounded-full disabled:hidden'
					onClick={handlePrev}
					disabled={currentIndex === 0}
				>
					<img className='rotate-180 w-[10px]' src={assets.backIcon} alt='' />
				</button>
			</div>
			<div className='absolute top-1/2 right-[10px]'>
				<button
					className='py-1.5 px-2 bg-gray-200 rounded-full disabled:hidden'
					onClick={handleNext}
					disabled={currentIndex === sliderData.length - 1}
				>
					<img className='w-[10px]' src={assets.backIcon} alt='' />
				</button>
			</div>
			<div className='absolute bottom-4 left-1/2 flex gap-1 transform translate-x-[-50%]'>
				{sliderData.map((_, index) => (
					<div
						key={index}
						className={`w-[6px] h-[6px] rounded-full ${
							index === currentIndex ? 'bg-gray-700' : 'bg-gray-300'
						}`}
						onClick={() => setCurrentIndex(index)}
					></div>
				))}
			</div>
		</div>
	);
};

export default Hero;
