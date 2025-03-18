import { useContext } from 'react';
import { ShopContext } from '../context/shopContext';

const PriceRangeSlider = ({ priceRange, setPriceRange }) => {
	const { currency } = useContext(ShopContext);

	const handleSliderChange = (event) => {
		const { value, name } = event.target;
		setPriceRange((prevRange) => {
			if (name === 'min') {
				return [parseInt(value), prevRange[1]];
			} else {
				return [prevRange[0], parseInt(value)];
			}
		});
	};

	return (
		<div className='p-0 w-full mx-auto'>
			<div className='mb-3'>
				<label className='text-[15px] text-gray-700 mb-2'>
					Min Price:{' '}
					<span className='text-black'>
						{currency} {priceRange[0]}
					</span>
				</label>
				<input
					type='range'
					name='min'
					min='0'
					max='10000'
					value={priceRange[0]}
					onChange={handleSliderChange}
					className='w-full h-2 bg-gray-300 rounded-lg mb-4'
				/>
			</div>
			<div className=''>
				<label className='text-[15px] text-gray-700 mb-2'>
					Max Price:{' '}
					<span className='text-black'>
						{currency} {priceRange[1]}
					</span>
				</label>
				<input
					type='range'
					name='max'
					min='0'
					max='10000'
					value={priceRange[1]}
					onChange={handleSliderChange}
					className='w-full h-2 bg-gray-300 rounded-lg'
				/>
			</div>
		</div>
	);
};

export default PriceRangeSlider;
