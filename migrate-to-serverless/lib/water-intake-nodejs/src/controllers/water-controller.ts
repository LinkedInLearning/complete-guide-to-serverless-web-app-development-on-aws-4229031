import { Request, Response } from 'express';
import { WaterService } from '../services/water-service.js';
import { z } from 'zod';

const addIntakeSchema = z.object({
  amount: z.number().min(1).max(5000),
  userId: z.string().min(1)
});

export class WaterController {
  constructor(private service: WaterService) {}

  addIntake = async (req: Request, res: Response) => {
    try {
      const { amount, userId } = addIntakeSchema.parse(req.body);
      const intake = await this.service.addWaterIntake(userId, amount);
      res.status(201).json(intake);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

  getLast30Days = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }
      const intakes = await this.service.getLast30DaysIntake(userId);
      res.json(intakes);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const intake = await this.service.getIntakeById(req.params.id);
      if (!intake) {
        return res.status(404).json({ error: 'Intake not found' });
      }
      res.json(intake);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}