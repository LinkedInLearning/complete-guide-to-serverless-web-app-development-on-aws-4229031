import express from 'express';
import cors from 'cors';
import { WaterController } from './controllers/water-controller.js';
import { WaterService } from './services/water-service.js';
import { MockWaterRepository } from './repositories/mock-water-repository.js';

const app = express();
app.use(cors());
app.use(express.json());

// Use MockWaterRepository by default
const repository = new MockWaterRepository();
const waterService = new WaterService(repository);
const waterController = new WaterController(waterService);

app.post('/water', waterController.addIntake);
app.get('/water/user/:userId/last-30-days', waterController.getLast30Days);
app.get('/water/:id', waterController.getById);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});