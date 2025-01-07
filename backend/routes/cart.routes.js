import express from 'express';
import {
	addToCart,
	getUserCart,
	updateCart,
} from '../controllers/cart.controller.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

router.post('/add', userAuth, addToCart);
router.post('/update', userAuth, updateCart);
router.post('/usercart', userAuth, getUserCart);

export default router;
