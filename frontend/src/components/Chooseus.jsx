import Title from './Title';

const Chooseus = () => {
	return (
		<div className='text-2xl text-left my-10'>
			<Title text1='WHY' text2='CHOOSE US' />
			<div className='flex flex-wrap md:flex-nowrap text-sm text-gray-500 py-10'>
				<div className='text-left w-full sm:w-fit border px-10 py-8 md:px-16 md:py-16'>
					<p className='font-semibold text-gray-800 mb-3'>Quality Assurance:</p>
					<p className='w-full'>
						We meticulously select and vet each product to ensure it meets our
						stringent quality standards.
					</p>
				</div>
				<div className='text-left w-full sm:w-fit border px-10 py-8 md:px-16 md:py-16'>
					<p className='font-semibold text-gray-800 mb-3'>Convenience:</p>
					<p className='w-full'>
						With our user-friendly interface and hassle-free ordering process,
						shopping has never been easier.
					</p>
				</div>
				<div className='text-left w-full sm:w-fit border px-10 py-8 md:px-16 md:py-16'>
					<p className='font-semibold text-gray-800 mb-3'>
						Exceptional Customer Service:
					</p>
					<p className='w-full'>
						Our team of dedicated professionals is here to assist you the way,
						ensuring your satisfaction is our top priority.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Chooseus;
