import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const addUpdateCategory = async ({
	backendUrl,
	token,
	category,
	categoryId,
	isUpdating,
}) => {
	let apiEndPoint = `${backendUrl}/api/category/add`;
	const categoryJSONData = { name: category.trim() };

	if (isUpdating) {
		apiEndPoint = `${backendUrl}/api/category/update`;
		categoryJSONData.categoryId = categoryId;
	}

	const result = await axios.post(apiEndPoint, categoryJSONData, {
		headers: { token },
	});
	return result.data;
};

const useAddUpdateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addUpdateCategory,
		onSuccess: () => {
			queryClient.invalidateQueries(['categories']);
		},
	});
};

export default useAddUpdateCategory;
