import { useContext } from 'react';
import { ShopContext } from '../context/shopContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	const { token } = useContext(ShopContext);
	// const [isLoading, setIsLoading] = useState(true);

	// useEffect(() => {
	//     setIsLoading(false); // Mark as loaded once context initializes
	// }, [token]);

	// if (isLoading) return <div>Loading...</div>;

	return !token ? <Navigate to='/login' /> : children;
};

export default PrivateRoute;
