import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ShopContext } from './context/shopContext';

import Sidebar from './components/Sidebar';
import useScrollHeight from './hooks/useScrollHeight';

// Direct imports
import LandingPage from './pages/LandingPage';
import AddProduct from './pages/AddProduct';
import ManageCategory from './pages/ManageCategory';
import ListProducts from './pages/ListProducts';
import Orders from './pages/Orders';
import UpdateProduct from './pages/UpdateProduct';
import Login from './components/Login';
import Navbar from './components/Navbar';
import BackToTopButton from './components/BackToTopButton';

function App() {
	const { token } = useContext(ShopContext);
	const scrollHeight = useScrollHeight();
	const [moveSidebar, setMoveSidebar] = useState(false);

	useEffect(() => {
		setMoveSidebar(scrollHeight > 60);
	}, [scrollHeight]);

	if (!token) {
		return (
			<div className='min-h-screen'>
				<ToastContainer closeOnClick={true} autoClose={2000} />
				<Login />
			</div>
		);
	}

	return (
		<div className='min-h-screen'>
			<ToastContainer closeOnClick={true} autoClose={2000} />
			<div className='fixed bottom-5 right-5 z-50'>
				<BackToTopButton />
			</div>

			<Navbar />

			<div className='flex w-full bg-slate-100 relative'>
				<div
					className={`w-[50px] top-0 sm:w-[80px] min-h-screen border-r-2 bg-black fixed `}
				>
					<Sidebar moveSidebar={moveSidebar} />
				</div>

				<div className='w-[75vw] sm:w-[85vw] mx-auto my-8 ml-[18vw] md:ml-[13vw] lg:ml-[10vw]'>
					<Routes>
						<Route path='/' element={<LandingPage />} />
						<Route path='/add-product' element={<AddProduct />} />
						<Route path='/list-products' element={<ListProducts />} />
						<Route path='/orders' element={<Orders />} />
						<Route
							path='/update-product/:productId'
							element={<UpdateProduct />}
						/>
						<Route path='/manage-category' element={<ManageCategory />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
