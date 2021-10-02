import { Router } from 'express';
import pipedriveRouter from '@sharedProviders/Pipedrive/infra/http/routes/pipedriveRouter';

const routes = Router();

routes.use('/api/', pipedriveRouter);

export default routes;
