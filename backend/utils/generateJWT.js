import jwt from 'jsonwebtoken';
const generateJWT = (id) => {
	const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY);
	return token;
};

export default generateJWT;
