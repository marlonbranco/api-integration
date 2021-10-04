import { Router } from 'express';

import dailyResumeController from '../controllers/DailyResumeController';

const dailyResumesRouter = Router();

// Integration
dailyResumesRouter.get('/integration/resume', dailyResumeController.index);

export default dailyResumesRouter;
