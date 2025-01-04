import User from '../models/user.model.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import generateJWT from '../utils/generateJWT.js';

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const isUserExists = await User.findOne({ email });
		if (isUserExists) {
			return res.status(400).json({ error: 'User already exists' });
		}

		if (!validator.isEmail(email)) {
			return res.status(400).json({ error: 'Enter valid email address' });
		}

		if (password.length < 8) {
			return res
				.status(400)
				.json({ error: 'Password must be atleast 8 characters long' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
		});

		const user = await newUser.save();

		const token = generateJWT(user._id);

		return res.status(200).json({ token: token });
	} catch (err) {
		console.log('Error in register controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		const comparePassword = await bcrypt.compare(
			password,
			user?.password || ''
		);

		if (!user || !comparePassword) {
			return res.status(404).json({ error: 'Invalid credentials' });
		}

		const token = generateJWT(user._id);

		return res.status(200).json({ token: token });
	} catch (err) {
		console.log('Error in login controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

export const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (
			email !== process.env.ADMIN_EMAIL ||
			password !== process.env.ADMIN_PASSWORD
		) {
			return res.status(200).json({ error: 'Invalid credentials' });
		}

		const token = generateJWT({ id: email + password });

		return res.status(200).json({ token });
	} catch (err) {
		console.log('Error in adminLogin controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};
