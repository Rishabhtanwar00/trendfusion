import { useContext, useEffect } from 'react';
import { ShopContext } from '../context/shopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
	const { token, backendUrl, navigate, setCartItems } = useContext(ShopContext);
	const [searchParams, setSearchParams] = useSearchParams();
	const success = searchParams.get('success');
	const orderId = searchParams.get('orderId');
	console.log('success' + success);
	console.log('orderId' + orderId);
	const verifyPayment = async () => {
		try {
			const result = await axios.post(
				`${backendUrl}/api/order/verify-stripe`,
				{ success, orderId },
				{ headers: { token } }
			);

			console.log('result: ' + result);

			const { data } = result;

			if (data.mssg) {
				setCartItems({});
				navigate('/orders');
				toast.success(data.mssg);
				return;
			}

			if (data.err_msg) {
				toast.error(data.err_msg);
				navigate('/cart');
				return;
			}
		} catch (err) {
			console.log('error in verify payment: ' + err.message);
			toast.error(err.message);
		}
	};

	useEffect(() => {
		verifyPayment();
	}, [token]);

	return <div>Verify</div>;
};

export default Verify;
