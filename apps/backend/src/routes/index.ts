import { Router } from 'express';
import authRoutes from './auth.routes';
import characterRoutes from './character.routes';
import chatRoutes from './chat.routes';
import economyRoutes from './economy.routes';
import worldRoutes from './world.routes';

const router = Router();

// API v1 routes
router.use('/auth', authRoutes);
router.use('/characters', characterRoutes);
router.use('/chat', chatRoutes);
router.use('/economy', economyRoutes);
router.use('/world', worldRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

export default router;
