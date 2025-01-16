import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

const SearchBar = () => {
	const { search, setSearch, showSearch, setShowSearch } =
		useContext(ShopContext);

	const [visible, setVisible] = useState(false);
	const location = useLocation();

	const handleVisiblity = () => {
		if (location.pathname.includes('collection')) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	};

	useEffect(() => {
		handleVisiblity();
	}, [location]);

	return (
		showSearch &&
		visible && (
			<div className='py-5 border-b-2 flex items-center justify-center'>
				<div className='flex items-center px-5 py-2 border-2 border-gray-500 rounded-3xl'>
					<input
						className='outline-none w-full sm:w-[30vw]'
						type='text'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<img
						className='w-4 h-fit'
						src={assets.searchIcon}
						alt='search icon'
					/>
				</div>
				<img
					onClick={() => setShowSearch(false)}
					className='w-4 h-fit ml-3 cursor-pointer'
					src={assets.crossIcon}
					alt='cross icon'
				/>
			</div>
		)
	);
};

export default SearchBar;
