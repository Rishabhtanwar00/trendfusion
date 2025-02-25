const Loader = ({  loaderText }) => {
	return (
		<div className='loader-container flex items-center justify-center py-10'>
			<div className='loader' data-attr={loaderText}></div>
		</div>
	);
};

export default Loader;
