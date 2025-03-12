import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const navigate = useNavigate();
	const [token, setToken] = useState(
		localStorage.getItem('token') ? localStorage.getItem('token') : ''
	);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [shouldFetchCategories, setShouldFetchCategories] = useState(false);

	const fetchAllCategories = async () => {
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/category/all`,
				{},
				{ headers: { token } }
			);

			if (data.error) {
				toast.error(data.error);
				return;
			}
			const allCategories = data.categories;
			setCategories(allCategories);
		} catch (err) {
			console.log('error in getAllCategories: ' + err.message);
		}
	};

	useEffect(() => {
		fetchAllCategories();
	}, []);

	useEffect(() => {
		if (shouldFetchCategories) {
			fetchAllCategories();
			setShouldFetchCategories(false);
		}
	}, [shouldFetchCategories]);

	useEffect(() => {
		localStorage.setItem('token', token);
	}, [token]);

	const value = {
		backendUrl,
		navigate,
		token,
		setToken,
		loading,
		setLoading,
		categories,
		setCategories,
		shouldFetchCategories,
		setShouldFetchCategories,
	};

	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	);
};

export default ShopContextProvider;
