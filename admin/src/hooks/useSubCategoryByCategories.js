import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { ShopContext } from '../context/shopContext';

const fetchSubCategories = async (categories, backendUrl, token) => {
	try {
		const responses = await Promise.all(
			categories.map((category) =>
				axios.post(
					`${backendUrl}/api/subcategory/all`,
					{ category },
					{ headers: { token } }
				)
			)
		);

		const allSubCategories = responses
			.map(({ data }) => (data.error ? [] : data.subcategories))
			.flat();

		const uniqueMap = new Map();
		allSubCategories.forEach((sub) => uniqueMap.set(sub._id, sub));
		return Array.from(uniqueMap.values());
	} catch (error) {
		console.error('Failed to fetch subcategories:', error);
		return [];
	}
};

const useSubCategoryByCategories = (categories = []) => {
	const { backendUrl, token } = useContext(ShopContext);

	return useQuery({
		queryKey: ['subCategories', categories],
		queryFn: () => fetchSubCategories(categories, backendUrl, token),
		enabled: categories.length > 0 && !!token,
	});
};
export default useSubCategoryByCategories;
