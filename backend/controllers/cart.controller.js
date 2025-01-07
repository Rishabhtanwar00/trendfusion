import User from '../models/user.model.js';

//add to cart
export const addToCart = async (req, res) => {
	try {
		const { userId, itemId, size } = req.body;

		const user = await User.findById(userId);
		const cartData = user.cartData;

		if (cartData[itemId]) {
			if (cartData[itemId][size]) {
				cartData[itemId][size] += 1;
			} else {
				cartData[itemId][size] = 1;
			}
		} else {
			cartData[itemId] = {};
			cartData[itemId][size] = 1;
		}

		await User.findByIdAndUpdate(userId, { cartData });

		return res.status(200).json({ mssg: 'Added to Cart' });
	} catch (err) {
		console.log('error in addToCart Controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//update to cart
export const updateCart = async (req, res) => {
	try {
		const { userId, itemId, size, quantity } = req.body;
		
		const user = await User.findById(userId);
		const cartData = user.cartData;

		cartData[itemId][size] = quantity;

		await User.findByIdAndUpdate(userId, { cartData });

		return res.status(200).json({ mssg: 'Cart Updated' });
	} catch (err) {
		console.log('error in updateCart Controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//get user cart
export const getUserCart = async (req, res) => {
	try {
		const { userId } = req.body;

		const user = await User.findById(userId);
		const cartData = user.cartData;

		return res.status(200).json({ cartData });
	} catch (err) {
		console.log('error in getUserCart Controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};
