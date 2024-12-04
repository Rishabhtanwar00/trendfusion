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
						{currency}
						{getCartAmount()}.00
					</p>
				</div>
				<div className='flex justify-between p-2 border-b w-full'>
					<p>Delivery Fee</p>
					<p>
						{currency}
						{deliveryFee}.00
					</p>
				</div>
				<div className='flex justify-end p-2 w-full'>
					<p>
						{currency}
						{getCartAmount() > 0 ? getCartAmount() + deliveryFee : 0}.00
					</p>
				</div>
			</div>
		</div>
	);
};

export default CartTotal;
