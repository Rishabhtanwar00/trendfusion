import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ShopContext } from '../context/shopContext';
import { useContext } from 'react';

const useProducts = () => {
	const { backendUrl } = useContext(ShopContext);

	return useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const { data } = await axios.get(`${backendUrl}/api/product/list`);
			return data.products;
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
		cacheTime: 1000 * 60 * 15, // 15 minutes
	});
};

export default useProducts;
