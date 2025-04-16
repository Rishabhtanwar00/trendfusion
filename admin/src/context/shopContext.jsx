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
	const [shouldFetchProducts, setShouldFetchProducts] = useState(false);
	const [orders, setOrders] = useState([]);
	const [shouldFetchOrders, setShouldFetchOrders] = useState(false);
	const [categories, setCategories] = useState([]);
	const [shouldFetchCategories, setShouldFetchCategories] = useState(false);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			const result = await axios.get(`${backendUrl}/api/product/list`);
			result.data.products && setProducts(result.data.products);
		} catch (err) {
			console.log(
				'error in fetching all products in soap context: ' + err.message
			);
			setLoading(false);
		}
		setLoading(false);
	};

	const fetchCategories = async () => {
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

	const fetchOrders = async () => {
		setLoading(true);
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/order/all`,
				{},
				{ headers: { token } }
			);

			if (data.error) {
				toast.error(data.error);
				return;
			}

			setOrders(data.orders.reverse());
		} catch (err) {
			console.log('error in fetching all orders: ' + err.message);
			setLoading(false);
		}
		setLoading(false);
	};

	useEffect(() => {
		setSearch('');
	}, [location.pathname]);

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		if (shouldFetchCategories) {
			fetchCategories();
			setShouldFetchCategories(false);
		}
	}, [shouldFetchCategories]);

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		if (shouldFetchProducts) {
			fetchProducts();
			setShouldFetchProducts(false);
		}
	}, [shouldFetchProducts]);

	useEffect(() => {
		fetchOrders();
	}, []);

	useEffect(() => {
		if (shouldFetchOrders) {
			fetchOrders();
			setShouldFetchOrders(false);
		}
	}, [shouldFetchOrders]);

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
		orders,
		setOrders,
		search,
		setSearch,
		loading,
		setLoading,
		categories,
		setCategories,
		shouldFetchProducts,
		setShouldFetchProducts,
		shouldFetchOrders,
		setShouldFetchOrders,
		shouldFetchCategories,
		setShouldFetchCategories,
	};

	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	);
};

export default ShopContextProvider;
