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
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [shouldFetchProducts, setShouldFetchProducts] = useState(false);
	const [shouldFetchCategories, setShouldFetchCategories] = useState(false);

	const fetchAllProducts = async () => {
		setLoading(true);
		try {
			const result = await axios.get(`${backendUrl}/api/product/list`);
			result.data.products && setProducts(result.data.products);
		} catch (err) {
			console.log(
				'error in fetching all products in soap context: ' + err.message
			);
			toast.error('Error in getting products :(');
			setLoading(false);
		}
		setLoading(false);
	};

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
		fetchAllProducts();
	}, []);

	useEffect(() => {
		if (shouldFetchProducts) {
			fetchAllProducts();
			setShouldFetchProducts(false);
		}
	}, [shouldFetchProducts]);

	useEffect(() => {
		localStorage.setItem('token', token);
	}, [token]);

	const value = {
		backendUrl,
		navigate,
		token,
		setToken,
		products,
		setProducts,
		search,
		setSearch,
		loading,
		setLoading,
		categories,
		setCategories,
		shouldFetchProducts,
		setShouldFetchProducts,
		shouldFetchCategories,
		setShouldFetchCategories,
	};

	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	);
};

export default ShopContextProvider;
