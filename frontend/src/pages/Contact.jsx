import { assets } from '../assets/assets';
import NewsLetter from '../components/NewsLetter';
import Title from '../components/Title';

const Contact = () => {
	return (
		<div>
			<div className='text-center text-2xl py-8'>
				<Title text1='CONTACT' text2='US' />
				<div className='flex items-center justify-center gap-10 sm:gap-20 flex-wrap md:flex-nowrap my-10'>
					<img
						className='w-full sm:w-fit h-fit sm:h-[65vh] ml-0 sm:ml-[10vw]'
						src={assets.contactImg}
						alt='contact img'
					/>
					<div className='flex flex-col text-base text-gray-500 text-left gap-5 w-full sm:w-1/2'>
						<p className='text-gray-800 font-semibold text-xl'>Our Store</p>
						<div>
							<p>54709 Willms Station </p>
							<p>Suite 350, Washington, USA</p>
						</div>
						<div>
							<p>Tel: +91 02938383848 </p>
							<p>trandfusion@gmail.com</p>
						</div>
						<p className='text-gray-800 font-semibold text-xl'>
							Carrers at TrendFusion
						</p>
						<p>Learn more about our teams and job openings.</p>
						<button className='px-8 py-4 text-sm w-fit bg-white text-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out border-2 border-black mt-4'>
							Explore Jobs
						</button>
					</div>
				</div>
			</div>
			<NewsLetter />
		</div>
	);
};

export default Contact;
