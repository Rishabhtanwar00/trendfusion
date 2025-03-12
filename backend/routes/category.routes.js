import express from 'express';
import {
	addCategory,
	getAllCategory,
	removeCategory,
	updateCategory,
} from '../controllers/category.controller.js';
import adminAuth from '../middleware/adminAuth.js';

const router = new express();

router.post('/add', adminAuth, addCategory);
router.post('/update', adminAuth, updateCategory);
router.post('/remove', adminAuth, removeCategory);
router.post('/all', adminAuth, getAllCategory);

export default router;
