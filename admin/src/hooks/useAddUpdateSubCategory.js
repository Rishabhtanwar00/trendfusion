import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const addUpdateSubCategory = async ({
	backendUrl,
	token,
	category,
	subCategory,
	categoryId,
	subCategoryId,
	isSubUpdating,
}) => {
	let apiEndPoint = `${backendUrl}/api/subcategory/add`;
	let subCategoryJSONData = {
		categoryName: category,
		name: subCategory.trim(),
	};

	if (isSubUpdating) {
		apiEndPoint = `${backendUrl}/api/subcategory/update`;
		subCategoryJSONData = {
			categoryId: categoryId,
			subCategoryId: subCategoryId,
			name: subCategory.trim(),
		};
	}

	const { data } = await axios.post(apiEndPoint, subCategoryJSONData, {
		headers: { token },
	});

	return data;
};

const useAddUpdateSubCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addUpdateSubCategory,
		onSuccess: () => {
			queryClient.invalidateQueries(['subCategories']);
		},
	});
};

export default useAddUpdateSubCategory;
