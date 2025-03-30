import express from 'express';
import { calculateLoan } from '../controllers/loanController.js';

const router = express.Router();

router.post('/calculate', calculateLoan);

export default router;
