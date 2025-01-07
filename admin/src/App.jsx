import { Route, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ListProducts from './pages/ListProducts';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
	const [token, setToken] = useState(
		localStorage.getItem('token') ? localStorage.getItem('token') : ''
	);

	useEffect(() => {
		localStorage.setItem('token', token);
	}, [token]);

	return (
		<div className='min-h-screen '>
			<ToastContainer />
			{!token ? (
				<Login setToken={setToken} />
			) : (
				<>
					<Navbar setToken={setToken} />
					<div className='flex w-full'>
						<div className='w-[18%] min-h-screen border-r-2'>
							<Sidebar />
						</div>
						<div className='w-[70%] mx-auto my-8 ml-[5vw]'>
							<Routes>
								<Route path='/' element={<LandingPage />} />
								<Route
									path='/add-product'
									element={<AddProduct token={token} />}
								/>
								<Route
									path='/list-products'
									element={<ListProducts token={token} />}
								/>
								<Route path='/orders' element={<Orders token={token} />} />
							</Routes>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default App;
