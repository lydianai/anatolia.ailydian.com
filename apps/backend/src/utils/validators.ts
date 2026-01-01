import Joi from 'joi';

// Auth validators
export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().min(6).required(),
  displayName: Joi.string().max(50).optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Character validators
export const createCharacterSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  class: Joi.string()
    .valid('ENTREPRENEUR', 'DEVELOPER', 'DESIGNER', 'MARKETER', 'TRADER')
    .required(),
  appearance: Joi.object().optional(),
});

export const updateCharacterSchema = Joi.object({
  displayName: Joi.string().max(50).optional(),
  appearance: Joi.object().optional(),
});

export const characterMovementSchema = Joi.object({
  characterId: Joi.string().uuid().required(),
  position: Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required(),
    z: Joi.number().required(),
    rotation: Joi.number().required(),
    zone: Joi.string().required(),
  }).required(),
  velocity: Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required(),
    z: Joi.number().required(),
  }).optional(),
  timestamp: Joi.number().required(),
});

// Chat validators
export const chatMessageSchema = Joi.object({
  roomId: Joi.string().required(),
  content: Joi.string().min(1).max(1000).required(),
  type: Joi.string().valid('TEXT', 'EMOTE', 'SYSTEM', 'WHISPER').optional(),
  metadata: Joi.object().optional(),
});

// Transaction validators
export const transactionSchema = Joi.object({
  type: Joi.string()
    .valid('TRANSFER', 'PURCHASE', 'SALE', 'REWARD', 'PENALTY', 'DEPOSIT', 'WITHDRAWAL')
    .required(),
  amount: Joi.number().positive().required(),
  fromCharacterId: Joi.string().uuid().optional(),
  toCharacterId: Joi.string().uuid().optional(),
  description: Joi.string().max(200).optional(),
  metadata: Joi.object().optional(),
});

// Pagination validators
export const paginationSchema = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(20),
});
