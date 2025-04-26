const SizeSelector = ({
	sizeOptions = ['S', 'M', 'L', 'XL', '2XL'],
	selectedSizes,
	toggleSizes,
}) => {
	return (
		<div className='flex gap-2'>
			{sizeOptions.map((size) => (
				<div
					key={size}
					className={`${
						selectedSizes.includes(size)
							? 'bg-[#f02028] text-white'
							: 'bg-slate-200'
					} border cursor-pointer active:scale-95 transition-all duration-50 ease-in-out`}
					onClick={() => toggleSizes(size)}
				>
					<p className='py-1.5 px-3.5'>{size}</p>
				</div>
			))}
		</div>
	);
};

export default SizeSelector;
