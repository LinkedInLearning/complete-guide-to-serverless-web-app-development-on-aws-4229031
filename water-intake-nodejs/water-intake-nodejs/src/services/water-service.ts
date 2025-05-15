import { WaterRepository } from '../repositories/water-repository.interface.js';
import { WaterIntake } from '../types/water.js';
import { subDays } from 'date-fns';

export class WaterService {
  constructor(private repository: WaterRepository) {}

  async addWaterIntake(userId: string, amount: number): Promise<WaterIntake> {
    return this.repository.add({
      amount,
      userId,
      timestamp: new Date()
    });
  }

  async getLast30DaysIntake(userId: string): Promise<WaterIntake[]> {
    const endDate = new Date();
    const startDate = subDays(endDate, 30);
    return this.repository.getByDateRange(userId, startDate, endDate);
  }

  async getIntakeById(id: string): Promise<WaterIntake | null> {
    return this.repository.getById(id);
  }

  async getLastIntake(userId: string): Promise<WaterIntake | null> {
    return this.repository.getLastIntake(userId);
  }
}