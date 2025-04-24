import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const deleteProduct = async ({ backendUrl, token, id }) => {
	const result = await axios.post(
		`${backendUrl}/api/product/remove`,
		{ id },
		{ headers: { token } }
	);

	return result.data;
};

const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries(['products']);
		},
	});
};

export default useDeleteProduct;
