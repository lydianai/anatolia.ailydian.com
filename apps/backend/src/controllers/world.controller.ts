import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import worldService from '../services/world.service';
import { successResponse } from '../utils/response';

export class WorldController {
  async getWorldState(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { zone } = req.params;
      const worldState = await worldService.getWorldState(zone);
      return successResponse(res, worldState);
    } catch (error) {
      next(error);
    }
  }

  async updateWorldState(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { zone } = req.params;
      const worldState = await worldService.updateWorldState(zone, req.body.state);
      return successResponse(res, worldState, 'World state updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async getActiveZones(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const zones = await worldService.getActiveZones();
      return successResponse(res, zones);
    } catch (error) {
      next(error);
    }
  }

  async getPlayersInZone(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { zone } = req.params;
      const players = await worldService.getPlayersInZone(zone);
      return successResponse(res, players);
    } catch (error) {
      next(error);
    }
  }
}

export default new WorldController();
