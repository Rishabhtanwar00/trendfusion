import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const addProduct = async ({ backendUrl, token, productData }) => {
	const formData = new FormData();

	if (productData.sizes.length === 0) {
		toast.error('Select at least 1 size.');
		return;
	}

	if (productData.image1 === null) {
		toast.error('Upload at least 1 image.');
		return;
	}

	Object.entries(productData).forEach(([key, value]) => {
		if (key.startsWith('image') && value) {
			formData.append(key, value);
		} else if (key === 'sizes') {
			formData.append(key, JSON.stringify(value));
		} else {
			formData.append(key, value);
		}
	});

	const { data } = await axios.post(`${backendUrl}/api/product/add`, formData, {
		headers: { token },
	});
	return data;
};

const useAddProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addProduct,
		onSuccess: () => {
			queryClient.invalidateQueries(['products']);
		},
	});
};

export default useAddProduct;
