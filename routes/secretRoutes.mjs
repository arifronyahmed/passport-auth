import express from 'express';
import getSecret from '../controllers/secretController.mjs';
import protect from '../middleware/protect.mjs';

const router = express.Router();

router.use(protect);
router.get('/', getSecret);

export default router;
