import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { ShopContext } from '../context/shopContext';

const useOrders = () => {
	const { backendUrl, token } = useContext(ShopContext);

	return useQuery({
		queryKey: ['orders'],
		queryFn: async () => {
			const { data } = await axios.post(
				`${backendUrl}/api/order/all`,
				{},
				{ headers: { token } }
			);
			return data.orders.reverse();
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
		cacheTime: 1000 * 60 * 15, // 15 minutes
	});
};

export default useOrders;
