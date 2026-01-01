import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import economyService from '../services/economy.service';
import { successResponse, paginatedResponse } from '../utils/response';

export class EconomyController {
  async createTransaction(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const transaction = await economyService.createTransaction(req.body);
      return successResponse(res, transaction, 'Transaction completed successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async getBalance(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { characterId } = req.params;
      const balance = await economyService.getBalance(characterId);
      return successResponse(res, balance);
    } catch (error) {
      next(error);
    }
  }

  async getTransactions(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '20', 10);

      const result = await economyService.getTransactions(userId, page, limit);

      return paginatedResponse(
        res,
        result.transactions,
        result.page,
        result.limit,
        result.total
      );
    } catch (error) {
      next(error);
    }
  }

  async getCharacterTransactions(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { characterId } = req.params;
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '20', 10);

      const result = await economyService.getCharacterTransactions(characterId, page, limit);

      return paginatedResponse(
        res,
        result.transactions,
        result.page,
        result.limit,
        result.total
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new EconomyController();
