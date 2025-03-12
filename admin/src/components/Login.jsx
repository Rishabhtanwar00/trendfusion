import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/shopContext';

const Login = () => {
	const { backendUrl, setToken } = useContext(ShopContext);
	const [email, setEmail] = useState('admin@trendfusion.com');
	const [password, setPassword] = useState('admin1234');

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const result = await axios.post(`${backendUrl}/api/auth/admin`, {
				email,
				password,
			});
			if (result.data.error) {
				toast.error(result.data.error);
				return;
			} else {
				setToken(result.data.token);
				toast.success('Admin Login Success!');
			}
		} catch (err) {
			console.log('Error in handleSubmit of admin login: ' + err.message);
			toast.error(err.message);
		}
	};
	return (
		<div className='min-h-screen w-full flex items-center justify-center bg-gray-50 tracking-wide'>
			<div className='flex flex-col py-8 px-5 justify-center gap-3 shadow-xl'>
				<h1 className='text-2xl text-black font-semibold mb-5 text-center'>
					Admin Panel Login
				</h1>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-5 items-center'
				>
					<div className='flex flex-col gap-2'>
						<label className='text-sm text-gray-600 font-semibold'>
							Email Address
						</label>
						<input
							type='text'
							className='px-3 py-2 text-base border w-full sm:w-[320px] rounded border-gray-300'
							placeholder='Enter email address'
							onChange={(e) => setEmail(e.target.value)}
							required
							defaultValue='admin@trendfusion.com'
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label className='text-sm text-gray-600 font-semibold'>
							Password
						</label>
						<input
							type='password'
							className='px-3 py-2 text-base border w-full sm:w-[320px] rounded border-gray-300'
							placeholder='Enter password'
							onChange={(e) => setPassword(e.target.value)}
							required
							defaultValue='admin1234'
						/>
					</div>
					<input
						className='px-5 py-2 w-fit bg-black text-white rounded cursor-pointer active:scale-90 transition-all duration-150 ease-in-outs'
						type='submit'
						value='Login'
					/>
				</form>
			</div>
		</div>
	);
};

export default Login;
