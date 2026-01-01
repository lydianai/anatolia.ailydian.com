import { Router } from 'express';
import chatController from '../controllers/chat.controller';
import { authenticate } from '../middleware/auth';
import { validate, validateQuery } from '../middleware/validation';
import { chatLimiter } from '../middleware/rate-limit';
import { chatMessageSchema, paginationSchema } from '../utils/validators';

const router = Router();

// All routes are protected
router.post('/messages', authenticate, chatLimiter, validate(chatMessageSchema), chatController.sendMessage);
router.get('/messages/:roomId', authenticate, validateQuery(paginationSchema), chatController.getMessages);
router.delete('/messages/:id', authenticate, chatController.deleteMessage);

router.post('/rooms', authenticate, chatController.createRoom);
router.get('/rooms', authenticate, chatController.getRooms);
router.get('/rooms/:id', authenticate, chatController.getRoom);

export default router;
