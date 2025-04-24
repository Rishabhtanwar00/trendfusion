import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Home from './pages/Home';
import About from './pages/About';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Product from './pages/Product';
import PlaceOrder from './pages/PlaceOrder';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Verify from './pages/Verify';
import PrivateRoute from './components/PrivateRoute';
import TrackOrder from './pages/TrackOrder';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
function App() {
	return (
		<div>
			<div className='fixed w-[100vw] mt-[-68px] sm:mt-[-72px] lg:mt-[-76px] z-[100] shadow'>
				<Navbar />
			</div>
			<div className='mt-[68px] sm:mt-[72px] lg:mt-[76px]'>
				<ToastContainer closeOnClick={true} autoClose={2000} />
				<SearchBar />
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/about' element={<About />}></Route>
					<Route path='/collection' element={<Collection />}></Route>
					<Route path='/contact' element={<Contact />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/product/:productId' element={<Product />}></Route>
					<Route
						path='/cart'
						element={
							<PrivateRoute>
								<Cart />
							</PrivateRoute>
						}
					></Route>
					<Route
						path='/orders'
						element={
							<PrivateRoute>
								<Orders />
							</PrivateRoute>
						}
					></Route>
					<Route
						path='/wishlist'
						element={
							<PrivateRoute>
								<Wishlist />
							</PrivateRoute>
						}
					></Route>
					<Route
						path='/placeorder'
						element={
							<PrivateRoute>
								<PlaceOrder />
							</PrivateRoute>
						}
					></Route>
					<Route
						path='/track-order/:orderId'
						element={
							<PrivateRoute>
								<TrackOrder />
							</PrivateRoute>
						}
					></Route>
					<Route path='/profile' element={<Profile />}></Route>
					<Route path='/verify' element={<Verify />}></Route>
				</Routes>
				<Footer />
			</div>
		</div>
	);
}

export default App;
