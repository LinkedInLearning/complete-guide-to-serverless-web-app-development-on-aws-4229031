import { WaterIntake } from '../types/water.js';
import { WaterRepository } from './water-repository.interface.js';
import crypto from 'crypto';

export class MockWaterRepository implements WaterRepository {
  private intakes: WaterIntake[] = [];

  async add(intake: Omit<WaterIntake, 'id'>): Promise<WaterIntake> {
    const newIntake: WaterIntake = {
      ...intake,
      id: crypto.randomUUID()
    };
    this.intakes.push(newIntake);
    return newIntake;
  }

  async getByDateRange(userId: string, startDate: Date, endDate: Date): Promise<WaterIntake[]> {
    return this.intakes.filter(intake => 
      intake.userId === userId &&
      intake.timestamp >= startDate &&
      intake.timestamp <= endDate
    );
  }

  async getById(id: string): Promise<WaterIntake | null> {
    const intake = this.intakes.find(i => i.id === id);
    return intake || null;
  }
}