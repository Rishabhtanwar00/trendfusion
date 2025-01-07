import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
	try {
		const { token } = req.headers;

		if (!token) {
			console.log('no token');
			return res.status(200).json({ error: 'Not Authorized' });
		}
		console.log('token');
		const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.body.userId = decoded_token.id;

		next();
	} catch (err) {
		console.log('error in userAuth: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

export default userAuth;
