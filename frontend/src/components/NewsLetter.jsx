const NewsLetter = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className='py-10 px-[20px] sm:px-[40px] flex flex-col items-center text-center text-[white] bg-emerald-700'>
			<h3 className='font-semibold text-3xl'>Subscribe now & get 20% off</h3>
			<p className='text-sm mx-auto my-2'>
				Get e-mail updates about out latest shop and special offers.
			</p>
			<form className='flex my-6 overflow-hidden' onSubmit={handleSubmit}>
				<input
					className='w-full sm:w-[500px] flex-1 px-4 py-3 border-none outline-none focus:outline-none text-[#1b1b1b] rounded-l'
					type='email'
					placeholder='Enter your email'
					required
				/>
				<button
					className='text-base bg-[#1b1b1b] text-white p-3 px-5 active:scale-95 transition-all duration-300 ease-in-out rounded-r'
					type='submit'
				>
					Subscribe
				</button>
			</form>
		</div>
	);
};

export default NewsLetter;
