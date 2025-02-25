import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const currency = '₹';
	const deliveryFee = 30;

	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('');
	const [showSearch, setShowSearch] = useState(false);
	const [cartItems, setCartItems] = useState({});
	const [token, setToken] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		fetchAllProducts();
	}, []);

	useEffect(() => {
		if (!token && localStorage.getItem('token')) {
			setToken(localStorage.getItem('token'));
			fetchUserCart(localStorage.getItem('token'));
		}
	}, [token]);

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

	const fetchUserCart = async (token) => {
		try {
			const { data } = await axios.post(
				`${backendUrl}/api/cart/usercart`,
				{},
				{ headers: { token } }
			);

			if (data.error) {
				toast.error(data.error);
			} else {
				setCartItems(data.cartData);
			}
		} catch (err) {
			console.log(
				'error in fetching user cart in soap context: ' + err.message
			);
			// toast.error(err.message);
		}
	};

	const addToCart = async (itemId, size) => {
		if (!size) {
			toast.error('Please select size of the Product.');
			return;
		}
		const cartData = structuredClone(cartItems);
		if (cartData[itemId]) {
			if (cartData[itemId][size]) {
				cartData[itemId][size] += 1;
			} else {
				cartData[itemId][size] = 1;
			}
		} else {
			cartData[itemId] = {};
			cartData[itemId][size] = 1;
		}
		setCartItems(cartData);

		if (token) {
			const { data } = await axios.post(
				`${backendUrl}/api/cart/add`,
				{ itemId, size },
				{ headers: { token } }
			);

			if (data.error) {
				toast.error(data.error);
			} else {
				toast.success(data.mssg);
			}
		}
	};

	const getCartCount = () => {
		let totalCount = 0;
		for (const items in cartItems) {
			for (const item in cartItems[items]) {
				try {
					if (cartItems[items][item] > 0) {
						totalCount += cartItems[items][item];
					}
				} catch (e) {
					console.log('Exception in getting cart count: ' + e.getMessage());
				}
			}
		}
		return totalCount;
	};

	const updateQuantity = async (itemId, size, quantity) => {
		const cartData = structuredClone(cartItems);
		cartData[itemId][size] = quantity;
		setCartItems(cartData);

		if (token) {
			const { data } = await axios.post(
				`${backendUrl}/api/cart/update`,
				{ itemId, size, quantity },
				{ headers: { token } }
			);

			if (data.error) {
				toast.error(data.error);
			} else {
				toast.success(data.mssg);
			}
		}
	};

	const getCartAmount = () => {
		let totalAmount = 0;
		for (const items in cartItems) {
			const itemInfo = products.find((product) => product._id === items);
			for (const item in cartItems[items]) {
				if (cartItems[items][item] > 0) {
					totalAmount += itemInfo.price * cartItems[items][item];
				}
			}
		}
		return totalAmount;
	};

	const value = {
		backendUrl,
		products,
		currency,
		deliveryFee,
		search,
		setSearch,
		showSearch,
		setShowSearch,
		addToCart,
		cartItems,
		setCartItems,
		getCartCount,
		updateQuantity,
		getCartAmount,
		navigate,
		token,
		setToken,
		loading,
		setLoading,
	};

	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	);
};

export default ShopContextProvider;
