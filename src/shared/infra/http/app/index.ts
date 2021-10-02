import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import errorHandling from '@sharedInfra/http/middlewares/errorHandling';
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
  }
}

export default new App().express;
