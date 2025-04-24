// components/ProductSkeleton.jsx
const ProductSkeleton = () => {
	return (
		<>
			{/* Desktop */}
			<div className='w-full hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr] border px-2 py-1 mt-5 text-left text-base items-center bg-white tracking-wide rounded animate-pulse'>
				<div className='w-12 h-12 bg-gray-300 rounded'></div>
				<div className='h-4 bg-gray-300 rounded w-2/3'></div>
				<div className='h-4 bg-gray-300 rounded w-1/2'></div>
				<div className='h-4 bg-gray-300 rounded w-1/3'></div>
				<div className='flex gap-3 justify-center'>
					<div className='h-6 w-16 bg-gray-300 rounded'></div>
					<div className='h-8 w-8 bg-gray-300 rounded-full'></div>
				</div>
			</div>

			{/* Mobile */}
			<div className='w-full flex-col items-center justify-center sm:hidden border px-2 py-1 mt-5 text-left text-base animate-pulse'>
				<div className='flex justify-start gap-5'>
					<div className='w-12 h-12 bg-gray-300 rounded'></div>
					<div className='flex flex-col gap-2'>
						<div className='h-4 w-24 bg-gray-300 rounded'></div>
						<div className='h-3 w-20 bg-gray-300 rounded'></div>
					</div>
				</div>
				<div className='flex justify-between mt-3 mb-1 pr-3 items-center'>
					<div className='h-4 w-16 bg-gray-300 rounded'></div>
					<div className='flex gap-3 justify-center'>
						<div className='h-6 w-16 bg-gray-300 rounded'></div>
						<div className='h-8 w-8 bg-gray-300 rounded-full'></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductSkeleton;
