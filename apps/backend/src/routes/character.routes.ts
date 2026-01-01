import { Router } from 'express';
import characterController from '../controllers/character.controller';
import { authenticate, optionalAuth } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { createCharacterSchema, updateCharacterSchema } from '../utils/validators';

const router = Router();

// Protected routes
router.post('/', authenticate, validate(createCharacterSchema), characterController.create);
router.get('/', authenticate, characterController.getAll);
router.get('/:id', optionalAuth, characterController.getOne);
router.patch('/:id', authenticate, validate(updateCharacterSchema), characterController.update);
router.delete('/:id', authenticate, characterController.delete);
router.get('/:id/nearby', optionalAuth, characterController.getNearby);

export default router;
