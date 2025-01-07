import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
	const { backendUrl, token, setToken, navigate } = useContext(ShopContext);
	const [currentState, setCurrentState] = useState('Login');
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const submitHandler = async (e) => {
		try {
			e.preventDefault();

			const url = `${backendUrl}/api/auth/${
				currentState === 'Sign Up' ? 'register' : 'login'
			}`;
			const formData = {
				email: userData.email,
				password: userData.password,
				...(currentState === 'Sign Up' && { name: userData.name }),
			};

			const { data } = await axios.post(url, formData);
			if (data.error) {
				toast.error(data.error);
			} else {
				toast.success('Welcome to Trendfusion :)');
				localStorage.setItem('token', data.token);
				setToken(data.token);
			}
		} catch (err) {
			console.log('error in login user: ' + err.message);
			toast.error(err.message);
		}
	};

	const handleChange = (field, value) => {
		setUserData((prev) => ({ ...prev, [field]: value }));
	};

	useEffect(() => {
		token && navigate('/');
	}, [token]);

	return (
		<div className='my-28 flex flex-col items-center justify-center'>
			<div className='text-3xl flex items-center gap-5'>
				<p className='prata-regular text-gray-800 font-bold'>{currentState}</p>
				<hr className='h-[2px] w-8 bg-gray-800' />
			</div>
			<form onSubmit={submitHandler} className='mt-3 flex flex-col'>
				{currentState === 'Sign Up' && (
					<input
						className='px-4 py-2 mt-5 border border-gray-600 rounded-none w-full sm:w-[400px]'
						type='text'
						placeholder='Name'
						required
						onChange={(e) => handleChange('name', e.target.value)}
					/>
				)}
				<input
					className='px-4 py-2 mt-5 border border-gray-600 rounded-none w-full sm:w-[400px]'
					type='email'
					placeholder='Email Address'
					required
					onChange={(e) => handleChange('email', e.target.value)}
				/>
				<input
					className='px-4 py-2 mt-5 border border-gray-600 rounded-none w-full sm:w-[400px]'
					type='password'
					placeholder='Password'
					required
					onChange={(e) => handleChange('password', e.target.value)}
				/>
				<div className='flex justify-between mt-1 text-gray-700 text-sm'>
					<p className='cursor-pointer'>Forget Password?</p>
					<p
						className='cursor-pointer'
						onClick={() =>
							currentState === 'Sign Up'
								? setCurrentState('Login')
								: setCurrentState('Sign Up')
						}
					>
						{currentState === 'Sign Up' ? 'Login Here' : 'Create Account'}
					</p>
				</div>
				<div className='flex justify-center'>
					<button
						type='submit'
						className='bg-black text-white py-2 px-8 mt-5 w-fit active:scale-90 transition-all duration-200 ease-in-out'
					>
						{currentState === 'Sign Up' ? 'Sign Up' : 'Sign In'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
