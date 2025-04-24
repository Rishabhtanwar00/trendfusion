import { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const navigate = useNavigate();

	const [token, setToken] = useState(
		localStorage.getItem('token') ? localStorage.getItem('token') : ''
	);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		localStorage.setItem('token', token);
	}, [token]);

	const value = useMemo(
		() => ({
			backendUrl,
			navigate,
			token,
			setToken,
			loading,
			setLoading,
		}),
		[backendUrl, navigate, token, loading]
	);

	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	);
};

export default ShopContextProvider;
