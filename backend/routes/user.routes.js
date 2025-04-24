import express from 'express';
import userAuth from '../middleware/userAuth.js';
import {
	addItemToWishlist,
	addNewAddress,
	getUserProfile,
	markDefaultAddress,
	removeAddress,
	removeItemFromWishlist,
	updateAddress,
} from '../controllers/user.controller.js';

const router = new express();

router.post('/profile', userAuth, getUserProfile);

router.post('/add-address', userAuth, addNewAddress);
router.post('/update-address', userAuth, updateAddress);
router.post('/remove-address', userAuth, removeAddress);
router.post('/default-address', userAuth, markDefaultAddress);

router.post('/add-wishlist', userAuth, addItemToWishlist);
router.post('/remove-wishlist', userAuth, removeItemFromWishlist);

export default router;
