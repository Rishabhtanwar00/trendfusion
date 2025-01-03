import { Route, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ListProducts from './pages/ListProducts';
import Orders from './pages/Orders';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<AddProduct />} />
				<Route path='/list-products' element={<ListProducts />} />
				<Route path='/orders' element={<Orders />} />
			</Routes>
		</>
	);
}

export default App;
