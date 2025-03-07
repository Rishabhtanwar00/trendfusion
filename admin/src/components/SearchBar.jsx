import { assets } from '../assets/assets';

const SearchBar = ({ search, setSearch }) => {
	return (
		<div className='flex items-center justify-center'>
			<div className='flex items-center px-5 py-1 border-2 border-gray-500 rounded-3xl'>
				<input
					className='outline-none border-none w-full sm:w-[25vw]'
					type='text'
					placeholder='Search your product here'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<img
					className='max-w-4 w-auto h-auto'
					src={assets.searchIcon}
					alt='search icon'
				/>
			</div>
			<button
				onClick={() => setSearch('')}
				className='p-1.5 px-3 rounded-full bg-black text-white ml-3 cursor-pointer'
			>
				&#10008;
			</button>
		</div>
	);
};

export default SearchBar;
