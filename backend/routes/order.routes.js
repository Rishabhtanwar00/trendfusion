import express from 'express';
import {
	getAllOrders,
	getOrderById,
	getUserOrders,
	placeOrder,
	placeOrderRazorpay,
	placeOrderStripe,
	updateOrderStatus,
	verifyRazorpayPayment,
	verifyStripePayment,
} from '../controllers/order.controller.js';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

//payment methods
router.post('/cod', userAuth, placeOrder);
router.post('/stripe', userAuth, placeOrderStripe);
router.post('/razorpay', userAuth, placeOrderRazorpay);

//for frontend user
router.post('/user-orders', userAuth, getUserOrders);
router.post('/single', userAuth, getOrderById);

//for admin
router.post('/all', adminAuth, getAllOrders);
router.post('/update-status', adminAuth, updateOrderStatus);

//verify payment
router.post('/verify-stripe', userAuth, verifyStripePayment);
router.post('/verify-razorpay', userAuth, verifyRazorpayPayment);

export default router;
