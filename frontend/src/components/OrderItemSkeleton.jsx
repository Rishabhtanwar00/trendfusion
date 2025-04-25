const OrderItemSkeleton = () => {
	return (
		<div className='flex flex-col sm:flex-row items-start sm:items-center sm:justify-between border-y p-2 pr-5 text-sm gap-3 bg-white rounded animate-pulse'>
			<div className='flex gap-3 w-full sm:w-auto'>
				<div className='h-[120px] w-[100px] bg-gray-200 rounded'></div>

				<div className='flex flex-col gap-3 flex-grow'>
					<div className='h-4 bg-gray-200 rounded w-3/4'></div>

					<div className='flex gap-2'>
						<div className='h-5 w-16 bg-gray-200 rounded'></div>
						<div className='h-5 w-20 bg-gray-200 rounded'></div>
						<div className='h-5 w-16 bg-gray-200 rounded'></div>
					</div>

					<div className='h-4 w-1/2 bg-gray-200 rounded'></div>
					<div className='h-4 w-1/3 bg-gray-200 rounded'></div>
				</div>
			</div>

			<div className='w-full md:w-1/2 flex justify-between pl-5 lg:pl-0 items-center'>
				<div className='flex items-center gap-3'>
					<div className='h-2 w-2 rounded-full bg-gray-300'></div>
					<div className='h-3 w-20 bg-gray-200 rounded'></div>
				</div>

				<div className='h-9 w-[102px] bg-gray-300 rounded'></div>
			</div>
		</div>
	);
};

export default OrderItemSkeleton;
