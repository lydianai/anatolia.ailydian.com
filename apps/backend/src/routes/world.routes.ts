import { Router } from 'express';
import worldController from '../controllers/world.controller';
import { authenticate, optionalAuth } from '../middleware/auth';

const router = Router();

// Public/optional auth routes
router.get('/zones', optionalAuth, worldController.getActiveZones);
router.get('/zones/:zone', optionalAuth, worldController.getWorldState);
router.get('/zones/:zone/players', optionalAuth, worldController.getPlayersInZone);

// Protected routes (admin only for state updates)
router.patch('/zones/:zone', authenticate, worldController.updateWorldState);

export default router;
