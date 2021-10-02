import { Router } from 'express';

import pipedriveDealsController from '../controllers/PipedriveDealsController';

const pipedriveRouter = Router();

// Deals
pipedriveRouter.get('/deals', pipedriveDealsController.index);

export default pipedriveRouter;
