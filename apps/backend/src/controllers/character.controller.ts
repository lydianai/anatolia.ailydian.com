import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import characterService from '../services/character.service';
import { successResponse, paginatedResponse } from '../utils/response';

export class CharacterController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const character = await characterService.createCharacter(userId, req.body);
      return successResponse(res, character, 'Character created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const characters = await characterService.getCharacters(userId);
      return successResponse(res, characters);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const character = await characterService.getCharacter(id, userId);
      return successResponse(res, character);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;
      const character = await characterService.updateCharacter(id, userId, req.body);
      return successResponse(res, character, 'Character updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;
      const result = await characterService.deleteCharacter(id, userId);
      return successResponse(res, result, 'Character deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async getNearby(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const radius = parseInt(req.query.radius as string || '100', 10);
      const characters = await characterService.getNearbyCharacters(id, radius);
      return successResponse(res, characters);
    } catch (error) {
      next(error);
    }
  }
}

export default new CharacterController();
