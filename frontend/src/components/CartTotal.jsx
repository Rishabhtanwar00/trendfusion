import { useContext } from 'react';
import Title from './Title';
import { ShopContext } from '../context/shopContext';

const CartTotal = () => {
	const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);

	return (
		<div className='w-full'>
			<div className='text-2xl'>
				<Title text1='CART' text2='TOTAL' />
			</div>
			<div className='text-black'>
				<div className='flex justify-between p-2 border-b'>
					<p>Subtotal</p>
					<p>
						{currency} {getCartAmount()}.00
					</p>
				</div>
				<div className='flex justify-between p-2 border-b w-full'>
					<p>Delivery Fee</p>
					<p>
						{currency}{' '}
						{getCartAmount() > 1000 ? (
							<>
								<span className='line-through'>{deliveryFee}.00</span>{' '}
								<span className='text-green-600'>0.00</span>
							</>
						) : (
							<span>{deliveryFee}.00</span>
						)}
					</p>
				</div>
				<div className='flex justify-end p-2 w-full'>
					<p>
						{currency}{' '}
						{getCartAmount() > 0
							? getCartAmount() + (getCartAmount() > 1000 ? 0 : deliveryFee)
							: 0}
						.00
					</p>
				</div>
				{
					getCartAmount() > 1000 && (
						<p className='text-sm text-right text-green-600'>You are getting free delivery on this Order.</p>
					)
				}
			</div>
		</div>
	);
};

export default CartTotal;
