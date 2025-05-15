import { WaterIntake } from '../types/water.js';

export interface WaterRepository {
  add(intake: Omit<WaterIntake, 'id'>): Promise<WaterIntake>;
  getByDateRange(userId: string, startDate: Date, endDate: Date): Promise<WaterIntake[]>;
  getById(id: string): Promise<WaterIntake | null>;
  getLastIntake(userId: string): Promise<WaterIntake | null>;

}