import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const updateOrderStatus = async ({ backendUrl, token, itemId, status }) => {
	const { data } = await axios.post(
		`${backendUrl}/api/order/update-status`,
		{ itemId, status: status },
		{ headers: { token } }
	);
	return data;
};

const useUpdateOrderStatus = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateOrderStatus,
		onSuccess: () => {
			queryClient.invalidateQueries(['orders']);
		},
	});
};

export default useUpdateOrderStatus;
