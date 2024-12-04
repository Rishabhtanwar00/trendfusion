const NewsLetter = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className='my-10 flex flex-col items-center text-center text-gray-800'>
			<h3 className='font-semibold text-2xl'>Subscribe now & get 20% off</h3>
			<p className='text-sm text-gray-500 mx-auto my-2'>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid.
			</p>
			<form className='flex my-6' onSubmit={handleSubmit}>
				<input
					className='w-full sm:w-[500px] flex-1 px-4 py-3 border focus:outline-none'
					type='email'
					placeholder='Enter your email'
					required
				/>
				<button
					className='text-base bg-black text-white p-3 px-5 hover:bg-white hover:text-black transition-all duration-300 ease-in-out border-2 border-black'
					type='submit'
				>
					Subscribe
				</button>
			</form>
		</div>
	);
};

export default NewsLetter;
