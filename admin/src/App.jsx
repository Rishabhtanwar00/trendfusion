import { Route, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ListProducts from './pages/ListProducts';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import UpdateProduct from './pages/UpdateProduct';
import ManageCategory from './pages/ManageCategory';
import { useContext } from 'react';
import { ShopContext } from './context/shopContext';

function App() {
	const { token } = useContext(ShopContext);
	return (
		<div className='min-h-screen'>
			<ToastContainer closeOnClick={true} autoClose={2000} />
			{!token ? (
				<Login />
			) : (
				<>
					<Navbar />
					<div className='flex w-full bg-slate-100'>
						<div className='w-[18%] min-h-screen border-r-2'>
							<Sidebar />
						</div>
						<div className='w-[70%] mx-auto my-8 ml-[5vw]'>
							<Routes>
								<Route path='/' element={<LandingPage />} />
								<Route path='/add-product' element={<AddProduct />} />
								<Route path='/list-products' element={<ListProducts />} />
								<Route path='/orders' element={<Orders />} />
								<Route
									path='/update-product/:productId'
									element={<UpdateProduct />}
								></Route>
								<Route
									path='/manage-category'
									element={<ManageCategory />}
								></Route>
							</Routes>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default App;
