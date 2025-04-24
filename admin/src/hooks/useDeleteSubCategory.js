import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const deleteSubCategory = async ({
	backendUrl,
	token,
	categoryId,
	subCategoryId,
}) => {
	const { data } = await axios.post(
		`${backendUrl}/api/subcategory/remove`,
		{ categoryId, subCategoryId },
		{ headers: { token } }
	);
	return data;
};

const useDeleteSubCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteSubCategory,
		onSuccess: () => {
			queryClient.invalidateQueries(['subCategories']);
		},
	});
};

export default useDeleteSubCategory;
