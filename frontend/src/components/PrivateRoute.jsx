import { useContext } from 'react';
import { ShopContext } from '../context/shopContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	const { token } = useContext(ShopContext);

	return !token ? <Navigate to='/login' /> : children;
};

export default PrivateRoute;
