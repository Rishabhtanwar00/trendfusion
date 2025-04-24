import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const deleteCategory = async ({ backendUrl, token, categoryId }) => {
	const result = await axios.post(
		`${backendUrl}/api/category/remove`,
		{ categoryId },
		{ headers: { token } }
	);
	return result.data;
};

const useDeleteCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries(['categories']);
		},
	});
};

export default useDeleteCategory;
