import { Router } from 'express';

import integrationController from '../controllers/IntegrationController';

const integrationRouter = Router();

// Integration
integrationRouter.get('/integration', integrationController.index);

export default integrationRouter;
