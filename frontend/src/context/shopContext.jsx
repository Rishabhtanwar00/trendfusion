import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const currency = '$';
	const deliveryFee = 10;

	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('');
	const [showSearch, setShowSearch] = useState(false);
	const [cartItems, setCartItems] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		fetchAllProducts();
	}, []);

	const fetchAllProducts = async () => {
		try {
			const result = await axios.get(`${backendUrl}/api/product/list`);
			result.data.products && setProducts(result.data.products);
			console.log(result.data.products);
		} catch (err) {
			console.log(
				'error in fetching all products in soap context: ' + err.message
			);
			toast.error(err.message);
		}
	};

	const addToCart = (itemId, size) => {
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

	const updateQuantity = (itemId, size, quantity) => {
		const cartData = structuredClone(cartItems);
		cartData[itemId][size] = quantity;
		setCartItems(cartData);
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
		getCartCount,
		updateQuantity,
		getCartAmount,
		navigate,
	};

	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	);
};

export default ShopContextProvider;
