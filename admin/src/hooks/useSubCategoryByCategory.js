import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { ShopContext } from '../context/shopContext';

const fetchSubCategories = async (backendUrl, token, category) => {
	try {
		console.log(category);
		const { data } = await axios.post(
			`${backendUrl}/api/subcategory/all`,
			{ category },
			{ headers: { token } }
		);

		return data.subcategories;
	} catch (error) {
		console.error('Failed to fetch subcategories:', error);
		return [];
	}
};

const useSubCategoryByCategory = (category) => {
	const { backendUrl, token } = useContext(ShopContext);

	return useQuery({
		queryKey: ['subCategories', category],
		queryFn: () => fetchSubCategories(backendUrl, token, category),
		enabled: category !== '',
	});
};
export default useSubCategoryByCategory;
