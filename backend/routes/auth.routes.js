import express from 'express';
import { adminLogin, login, register } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/admin', adminLogin);

export default router;
