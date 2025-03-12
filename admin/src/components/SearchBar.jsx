import { assets } from '../assets/assets';

const SearchBar = ({ search, setSearch, placeholder }) => {
	return (
		<div className='flex items-center justify-center'>
			<div className='flex items-center px-2 py-1 border-2 border-gray-500 rounded'>
				<input
					className='outline-none border-none w-full sm:w-[250px] bg-transparent'
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
