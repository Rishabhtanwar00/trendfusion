import Order from '../models/order.model.js';
import User from '../models/user.model.js';

//place order by cod
export const placeOrder = async (req, res) => {
	try {
		const { userId, items, amount, address } = req.body;

		const orderData = {
			userId,
			items,
			amount,
			address,
			paymentMethod: 'COD',
			payment: false,
			date: Date.now(),
		};

		const newOrder = new Order(orderData);

		await newOrder.save();

		await User.findByIdAndUpdate(userId, { cartData: {} });

		return res.status(200).json({ mssg: 'Order Placed' });
	} catch (err) {
		console.log('error in placeOrder controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//place order by Stripe
export const placeOrderStripe = async (req, res) => {
	try {
	} catch (err) {
		console.log('error in placeOrderStripe controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//place order by Razorpay
export const placeOrderRazorpay = async (req, res) => {
	try {
	} catch (err) {
		console.log('error in placeOrderRazorpay controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//get all orders ( for admin )
export const getAllOrders = async (req, res) => {
	try {
	} catch (err) {
		console.log('error in getAllOrders controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//get orders for user
export const getUserOrders = async (req, res) => {
	try {
	} catch (err) {
		console.log('error in getUserOrders controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//update order status ( for admin )
export const updateOrderStatus = async (req, res) => {
	try {
	} catch (err) {
		console.log('error in updateOrderStatus controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};
