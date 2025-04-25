const ProductItemSkeleton = () => {
	return (
		<div className='text-[#1b1b1b] bg-white pb-2 border border-black rounded-lg overflow-hidden relative flex flex-col justify-between animate-pulse'>
			<div className='h-[200px] bg-gray-200 w-full mb-3'></div>

			<div className='px-2'>
				<div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
				<div className='h-4 bg-gray-200 rounded w-1/3 mb-3'></div>

				<div className='flex flex-col sm:flex-row items-start md:items-center gap-2'>
					<div className='flex gap-1'>
						{Array(5)
							.fill(0)
							.map((_, index) => (
								<div
									key={index}
									className='w-3 h-3 rounded-full bg-gray-300'
								></div>
							))}
					</div>
					<div className='h-3 w-20 bg-gray-200 rounded'></div>
				</div>
			</div>

			<div className='absolute top-[0px] right-[8px] rounded-full bg-gray-300 p-2 w-fit mt-3'></div>
			<div className='absolute bottom-[10px] right-[8px] rounded-full bg-gray-300 p-3 w-fit mt-3'></div>
		</div>
	);
};

export default ProductItemSkeleton;
