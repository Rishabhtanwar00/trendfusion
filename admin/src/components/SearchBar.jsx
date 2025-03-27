import { useContext } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/shopContext';

const SearchBar = ({ placeholder }) => {
	const { search, setSearch } = useContext(ShopContext);
	return (
		<div className='flex items-center justify-center'>
			<div className='flex items-center px-2 py-1 border-2 border-gray-500 rounded'>
				<input
					className='outline-none border-none w-[150px] sm:w-[250px] bg-transparent'
					type='text'
					placeholder={placeholder}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<img
					className='max-w-4 w-auto h-auto'
					src={assets.searchIcon}
					alt='search icon'
				/>
			</div>
		</div>
	);
};

export default SearchBar;
