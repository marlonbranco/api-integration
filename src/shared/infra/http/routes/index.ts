import { Router } from 'express';
import dailyResumesRouter from '@modules/dailyResume/infra/http/routes/dailyResume.routes';

const routes = Router();

routes.use('/api/', dailyResumesRouter);

export default routes;
