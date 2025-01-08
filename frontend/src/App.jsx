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
function App() {
	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<ToastContainer />
			<Navbar />
			<SearchBar />
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/about' element={<About />}></Route>
				<Route path='/collection' element={<Collection />}></Route>
				<Route path='/contact' element={<Contact />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/product/:productId' element={<Product />}></Route>
				<Route path='/cart' element={<Cart />}></Route>
				<Route path='/orders' element={<Orders />}></Route>
				<Route path='/placeorder' element={<PlaceOrder />}></Route>
				<Route path='/verify' element={<Verify />}></Route>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
