import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import errorHandling from '@sharedInfra/http/middlewares/errorHandling';
// import agenda from '@shared/containers/providers/Agenda/agendaWorker';
import scheduledJob from '@shared/containers/providers/NodeSchedule/integrateAndMigrateJob';
import routes from '../routes/index';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.app();
  }

  app() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(routes);
    this.express.use(errors());
    this.express.use(errorHandling);
    this.express.use((request: Request, response: Response, _: NextFunction) => {
      scheduledJob;
    });
  }
}

export default new App().express;
