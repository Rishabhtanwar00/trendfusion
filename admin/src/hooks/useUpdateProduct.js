import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const updateProduct = async ({ backendUrl, token, productId, productData }) => {
	const formData = new FormData();

	if (productData.sizes.length === 0) {
		return;
	}

	Object.entries(productData).forEach(([key, value]) => {
		if (key === 'sizes') {
			formData.append(key, JSON.stringify(value));
		} else {
			formData.append(key, value);
		}
	});
	formData.append('productId', productId);
	Object.entries(productData).forEach(([key, value]) => {
		console.log(key + ': ' + value);
	});

	const result = await axios.post(
		`${backendUrl}/api/product/update`,
		formData,
		{ headers: { token } }
	);

	return result.data;
};

const useUpdateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateProduct,
		onSuccess: () => {
			queryClient.invalidateQueries(['products']);
		},
	});
};

export default useUpdateProduct;
