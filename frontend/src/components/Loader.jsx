import { useContext } from 'react';
import { ShopContext } from '../context/shopContext';

const Loader = ({ loaderText }) => {
	const { loading } = useContext(ShopContext);
	return (
		loading && (
			<div className='loader-container flex items-center justify-center py-10'>
				<div className='loader' data-attr={loaderText}></div>
			</div>
		)
	);
};

export default Loader;
