// components/OrderSkeleton.jsx
const OrderSkeleton = () => {
	return (
		<div className='px-5 py-3 border border-gray-300 grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[2fr_1fr_1fr_1fr] mt-3 bg-white rounded animate-pulse'>
			<div className='flex flex-col gap-2'>
				<div className='h-4 bg-gray-300 rounded w-2/3'></div>
				<div className='h-4 bg-gray-300 rounded w-1/2'></div>
				<div className='h-4 bg-gray-300 rounded w-3/4'></div>
				<div className='h-4 bg-gray-300 rounded w-1/2'></div>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='h-4 bg-gray-300 rounded w-1/3'></div>
				<div className='h-4 bg-gray-300 rounded w-1/2'></div>
				<div className='h-4 bg-gray-300 rounded w-2/3'></div>
			</div>
			<div className='h-4 bg-gray-300 rounded w-1/4'></div>
			<div className='h-8 bg-gray-300 rounded w-full max-w-[160px] mt-2'></div>
		</div>
	);
};

export default OrderSkeleton;
