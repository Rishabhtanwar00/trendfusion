import express from 'express';
import userAuth from '../middleware/userAuth.js';
import {
	addNewAddress,
	getUserProfile,
	markDefaultAddress,
	removeAddress,
	updateAddress,
} from '../controllers/user.controller.js';

const router = new express();

router.post('/profile', userAuth, getUserProfile);
router.post('/add-address', userAuth, addNewAddress);
router.post('/update-address', userAuth, updateAddress);
router.post('/remove-address', userAuth, removeAddress);
router.post('/default-address', userAuth, markDefaultAddress);

export default router;
