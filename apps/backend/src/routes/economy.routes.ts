import { Router } from 'express';
import economyController from '../controllers/economy.controller';
import { authenticate } from '../middleware/auth';
import { validate, validateQuery } from '../middleware/validation';
import { transactionLimiter } from '../middleware/rate-limit';
import { transactionSchema, paginationSchema } from '../utils/validators';

const router = Router();

// All routes are protected
router.post('/transactions', authenticate, transactionLimiter, validate(transactionSchema), economyController.createTransaction);
router.get('/transactions', authenticate, validateQuery(paginationSchema), economyController.getTransactions);
router.get('/transactions/:characterId', authenticate, validateQuery(paginationSchema), economyController.getCharacterTransactions);
router.get('/balance/:characterId', authenticate, economyController.getBalance);

export default router;
