import { Router } from 'express';
import pipedriveRouter from '@shared/containers/providers/Pipedrive/infra/http/routes/pipedriveRouter';
import integrationRouter from '@modules/integration/infra/http/routes/integration.routes';

const routes = Router();

routes.use('/api/', pipedriveRouter);
routes.use('/api/', integrationRouter);

export default routes;
