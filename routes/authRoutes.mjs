import express from 'express';
import {
  registerUser,
  signin,
  logout,
} from '../controllers/authController.mjs';

const router = express.Router();

router.post('/register', registerUser);
router.get('/logout', logout).post('/login', signin);

export default router;
