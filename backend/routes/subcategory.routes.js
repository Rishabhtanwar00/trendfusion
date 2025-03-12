import express from 'express';
import {
	addSubCategory,
	getAllSubCategory,
	removeSubCategory,
	updateSubCategory,
} from '../controllers/subcategory.controller.js';
import adminAuth from '../middleware/adminAuth.js';

const router = new express();

router.post('/add', adminAuth, addSubCategory);
router.post('/update', adminAuth, updateSubCategory);
router.post('/remove', adminAuth, removeSubCategory);
router.post('/all', adminAuth, getAllSubCategory);

export default router;
