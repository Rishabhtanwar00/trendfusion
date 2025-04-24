import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const sliderData = [
		{
			id: 1,
			image: assets.heroImg1,
			title: 'Spring Collection 2025',
			description: 'Refresh your wardrobe with the latest trends in fashion.',
			buttonText: 'Shop Now',
			link: '/collection',
			bgcolor: '#6ee7b7',
		},
		{
			id: 2,
			image: assets.heroImg2,
			title: 'Flat 50% Off',
			description: "Exclusive deals on summer essentials. Don't miss out!",
			buttonText: 'Grab the Deal',
			link: '/collection',
			bgcolor: '#f7ee65',
		},
		{
			id: 3,
			image: assets.heroImg3,
			title: 'New Arrivals',
			description: 'Explore our latest designs tailored for comfort and style.',
			buttonText: 'Explore Now',
			link: '/collection',
			bgcolor: '#bde2da',
		},
		{
			id: 4,
			image: assets.heroImg4,
			title: 'Limited Edition',
			description: 'Unique designs for those who love to stand out.',
			buttonText: 'Shop Limited Edition',
			link: '/collection',
			bgcolor: '#fae4d7',
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
		<div className='relative w-[100vw] overflow-hidden'>
			<div
				className='flex transition-transform duration-700 ease-in-out'
				style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
			>
				{sliderData.map((slider, index) => (
					<div
						key={index}
						className='flex flex-col sm:flex-row sm:items-center sm:justify-center min-w-[100vw] h-[100vh] sm:h-[500px] pt-5 px-[20px] sm:px-[40px]'
						style={{ backgroundColor: slider.bgcolor }}
					>
						<div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
							<div className='text-[#1b1b1b] text-center sm:text-left'>
								<h1 className='text-3xl lg:text-5xl leading-relaxed sm:py-3 font-semibold prata-regular'>
									{slider.title}
								</h1>
								<p className='font-medium text-sm md:text-base mb-10'>
									{slider.description}
								</p>
								<Link
									to={slider.link}
									className='px-5 py-2 bg-transparent border-2 border-black text-base min-w-[150px] active:scale-90 transition-all ease-in-out duration-150 hover:bg-black hover:text-white'
								>
									{slider.buttonText}
								</Link>
								{/* <div className='flex items-center gap-2'>
									<p className='w-8 sm:w-11 h-[2px] bg-[#1b1b1b]'></p>
									<p className='font-medium text-sm md:text-base'>
										BEST SELLERS
									</p>
								</div>
								<h1 className='prata-regular text-3xl lg:text-5xl leading-relaxed sm:py-3'>
									NEW ARRIVALS
								</h1>
								<div className='flex items-center gap-2'>
									<p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
									<p className='w-8 sm:w-11 h-[2px] bg-[#1b1b1b]'></p>
								</div> */}
							</div>
						</div>
						<div className='w-full sm:w-1/2 flex items-center justify-center'>
							<img
								loading='lazy'
								className='w-auto h-[350px] sm:h-[500px]'
								src={slider.image}
								alt='hero img'
							/>
						</div>
					</div>
				))}
			</div>
			<div className='absolute top-1/2 left-[10px]'>
				<button
					className='py-1.5 px-2 bg-gray-200 rounded-full disabled:hidden'
					onClick={handlePrev}
					disabled={currentIndex === 0}
				>
					<img
						loading='lazy'
						className='rotate-180 w-[10px]'
						src={assets.backIcon}
						alt='Arrow icon'
					/>
				</button>
			</div>
			<div className='absolute top-1/2 right-[20px]'>
				<button
					className='py-1.5 px-2 bg-gray-200 rounded-full disabled:hidden'
					onClick={handleNext}
					disabled={currentIndex === sliderData.length - 1}
				>
					<img
						loading='lazy'
						className='w-[10px]'
						src={assets.backIcon}
						alt='Arrow icon'
					/>
				</button>
			</div>
			<div className='absolute bottom-4 left-1/2 flex gap-1 transform translate-x-[-50%]'>
				{sliderData.map((_, index) => (
					<div
						key={index}
						className={`w-[6px] h-[6px] rounded-full ${
							index === currentIndex ? 'bg-black' : 'bg-gray-500'
						}`}
						onClick={() => setCurrentIndex(index)}
					></div>
				))}
			</div>
		</div>
	);
};

export default Hero;
