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
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from './context/shopContext';
import BackToTopButton from './components/BackToTopButton';

function App() {
	const { token } = useContext(ShopContext);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const toogleVisible = () => {
			if (window.scrollY > 60) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		};
		window.addEventListener('scroll', toogleVisible);
		return () => window.removeEventListener('scroll', toogleVisible);
	}, []);
	return (
		<div className='min-h-screen'>
			<ToastContainer closeOnClick={true} autoClose={2000} />
			<div className='fixed bottom-5 right-5 z-50'>
				<BackToTopButton />
			</div>
			{!token ? (
				<Login />
			) : (
				<>
					<Navbar />
					<div className='flex w-full bg-slate-100 relative'>
						<div className={`w-[60px] sm:w-[80px] min-h-screen border-r-2 bg-black fixed ${visible ?'top-0': 'top-[60px]'}`}>
							<Sidebar />
						</div>
						<div className='w-[75vw] sm:w-[85vw] mx-auto my-8 ml-[10vw]'>
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
