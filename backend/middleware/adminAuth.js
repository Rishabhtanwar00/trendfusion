import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
	try {
		const { token } = req.headers;

		if (!token) {
			return res.status(400).json({ error: 'Not Authorized' });
		}

		const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);

		if (
			decoded_token !==
			process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
		) {
			return res.status(400).json({ error: 'Not Authorized' });
		}

		next();
	} catch (err) {
		console.log('Error in adminAuth middleware: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

export default adminAuth;
