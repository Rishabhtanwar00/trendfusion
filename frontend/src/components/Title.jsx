const Title = ({ text1, text2 }) => {
	return (
		<div className='inline-flex items-center gap-1 sm:gap-2 mb-3'>
			<p className='text-gray-700'>
				{text1} <span className='text-[#1b1b1b] font-medium'>{text2}</span>
			</p>
			<p className='w-5 md:w-12 h-[1px] md:h-[2px] bg-gray-700'></p>
		</div>
	);
};

export default Title;
