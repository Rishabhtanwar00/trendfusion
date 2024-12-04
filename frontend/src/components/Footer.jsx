const Footer = () => {
	return (
		<div>
			<div className='py-5 flex flex-wrap justify-between text-gray-600 gap-3 text-sm'>
				<div className='w-full sm:w-2/4'>
					<h1 className='w-fit text-3xl font-medium text-black mb-3'>
						TrendFusion
					</h1>
					<p className='w-full sm:w-3/4'>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
						obcaecati debitis harum enim ullam dicta ad, esse, voluptatibus
						inventore magni sit. Pariatur incidunt soluta voluptatem debitis
						sequi architecto sed impedit!
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
