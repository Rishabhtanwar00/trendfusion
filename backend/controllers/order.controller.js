import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import Stripe from 'stripe';
import razorpay from 'razorpay';

const currency = 'inr';
const deliveryFee = 10;

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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
		const { userId, items, amount, address } = req.body;
		const { origin } = req.headers;

		const orderData = {
			userId,
			items,
			amount,
			address,
			paymentMethod: 'Stripe',
			payment: false,
			date: Date.now(),
		};

		const newOrder = new Order(orderData);
		await newOrder.save();

		const line_items = items.map((item) => ({
			price_data: {
				currency: currency,
				product_data: {
					name: item.name,
				},
				unit_amount: item.price * 100,
			},
			quantity: item.quantity,
		}));

		line_items.push({
			price_data: {
				currency: currency,
				product_data: {
					name: 'Delivery Fee',
				},
				unit_amount: deliveryFee * 100,
			},
			quantity: 1,
		});

		console.log('new order: ' + newOrder);

		const session = await stripe.checkout.sessions.create({
			success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
			cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
			line_items: line_items,
			mode: 'payment',
		});

		return res.status(200).json({ session_url: session.url });
	} catch (err) {
		console.log('error in placeOrderStripe controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//place order by Razorpay
export const placeOrderRazorpay = async (req, res) => {
	try {
		const { userId, items, amount, address } = req.body;

		const orderData = {
			userId,
			items,
			amount,
			address,
			paymentMethod: 'Razorpay',
			payment: false,
			date: Date.now(),
		};

		const newOrder = new Order(orderData);
		await newOrder.save();

		const options = {
			amount: amount,
			currency: currency.toUpperCase(),
			receipt: newOrder._id.toString(),
		};

		await razorpayInstance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(200).json({ error: error });
			}
			return res.status(200).json({ order });
		});
	} catch (err) {
		console.log('error in placeOrderRazorpay controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

export const verifyRazorpayPayment = async (req, res) => {
	try {
		const { userId, razorpay_order_id } = req.body;

		const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

		if (orderInfo.status === 'paid') {
			await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
			await User.findByIdAndUpdate(userId, { cartData: {} });
			return res.status(200).json({ mssg: 'Payment successful' });
		} else {
			return res.status(200).json({ err_mssg: 'Payment not successful' });
		}
	} catch (err) {
		console.log('error in verifyRazorpayPayment controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//verify payment stripe
export const verifyStripePayment = async (req, res) => {
	try {
		const { userId, success, orderId } = req.body;
		console.log('success' + success);
		console.log('orderId: ' + orderId);
		if (success === 'true') {
			console.log('inside success');
			await Order.findByIdAndUpdate(orderId, { payment: true });
			console.log('inside success11');
			await User.findByIdAndUpdate(userId, { cartData: {} });
			console.log('inside success22');
			return res.status(200).json({ mssg: 'Payment verified' });
		} else {
			return res.status(200).json({ err_msg: 'Payment not verified' });
		}
	} catch (err) {
		console.log('error in verifyStripePayment controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//get all orders ( for admin )
export const getAllOrders = async (req, res) => {
	try {
		const allOrders = await Order.find({});

		return res.status(200).json({ orders: allOrders });
	} catch (err) {
		console.log('error in getAllOrders controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//get orders for user
export const getUserOrders = async (req, res) => {
	try {
		const { userId } = req.body;
		const userOrders = await Order.find({ userId });

		if (!userOrders) {
			return res.status(200).json({ error: 'No Orders found.' });
		}

		return res.status(200).json({ orders: userOrders });
	} catch (err) {
		console.log('error in getUserOrders controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//update order status ( for admin )
export const updateOrderStatus = async (req, res) => {
	try {
		const { itemId, status } = req.body;

		await Order.findByIdAndUpdate(itemId, { status });

		return res.status(200).json({ mssg: 'Status Updated' });
	} catch (err) {
		console.log('error in updateOrderStatus controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};
