import { useContext } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/shopContext';

const Orders = () => {
	const { products, currency } = useContext(ShopContext);
	return (
		<div className='my-10'>
			<div className='text-2xl'>
				<Title text1='MY' text2='ORDERS' />
			</div>
			<div className='flex flex-col gap-5 mt-5'>
				{products.slice(0, 4).map((item, index) => (
					<div
						key={index}
						className='flex items-center justify-between border-y p-2 text-sm'
					>
						<div className='flex gap-3'>
							<img
								className='w-[80px] h-fit'
								src={item.image[0]}
								alt='product image'
							/>
							<div className='flex flex-col gap-3'>
								<p className='text-base'>{item.name}</p>
								<div className='flex gap-3'>
									<p>
										{currency}
										{item.price}
									</p>
									<p>Quantity: 1</p>
									<p>Size: M</p>
								</div>
								<p>
									Date: <span className='text-gray-500'>4th Dec 2025</span>
								</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<p className='h-2 w-2 rounded-full bg-green-500'></p>
							<p>Ready to ship</p>
						</div>
						<button className='border bg-black text-white px-3 py-2 active:scale-90 transition-all duration-150 ease-in-out'>
							Track Order
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Orders;
