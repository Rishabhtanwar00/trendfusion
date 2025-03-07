import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import ShopContextProvider from '../context/shopContext.jsx';
import { beforeEach, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
	render(
		<MemoryRouter>
			<ShopContextProvider>
				<Login />
			</ShopContextProvider>
		</MemoryRouter>
	);
});

test('login page rendered', () => {
	const headingEl = screen.getByText('Login');
	expect(headingEl).toBeInTheDocument();
});

test('email input rendered', () => {
	const emailEl = screen.getByPlaceholderText('Email Address');
	expect(emailEl).toBeInTheDocument();
});

test('password input rendered', () => {
	const passwordEl = screen.getByPlaceholderText('Password');
	expect(passwordEl).toBeInTheDocument();
});
 
test('toggle between sign up and login', () => {

	fireEvent.click(screen.getByText("Create Account"));

	expect(screen.getByText('Sign Up')).toBeInTheDocument();
	expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();

	fireEvent.click(screen.getByText("Login Here"));

	expect(screen.getByText('Login')).toBeInTheDocument();
	expect(screen.queryByPlaceholderText("Name")).not.toBeInTheDocument();
});
 