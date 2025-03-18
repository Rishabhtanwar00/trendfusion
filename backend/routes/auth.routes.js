import express from 'express';
import {
	adminLogin,
	getUserData,
	login,
	register,
} from '../controllers/auth.controller.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/admin', adminLogin);

router.post('/user', userAuth, getUserData);

export default router;
