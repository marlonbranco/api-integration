import { container } from 'tsyringe';
import { Request, Response } from 'express';

import PipedriveDealsUseCase from '../../../useCases/PipedriveDealsUseCase';

class PipedriveDealsController {
  public async index(request: Request, response: Response) {
    const listDeals = container.resolve(PipedriveDealsUseCase);

    const data = await listDeals.getDeals();

    return response.status(200).json(data)
  }
}

export default new PipedriveDealsController();
