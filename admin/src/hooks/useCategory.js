import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { ShopContext } from '../context/shopContext';

const useCategory = () => {
	const { backendUrl, token } = useContext(ShopContext);

	return useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const { data } = await axios.post(
				`${backendUrl}/api/category/all`,
				{},
				{ headers: { token } }
			);

			return data.categories;
		},
	});
};

export default useCategory;
