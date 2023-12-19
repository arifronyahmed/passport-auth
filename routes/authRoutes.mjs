import express from 'express';
import {
  registerUser,
  signin,
  signout,
} from '../controllers/authController.mjs';

const router = express.Router();

router.post('/register', registerUser);
router.get('/signout', signout).post('/signin', signin);

export default router;
