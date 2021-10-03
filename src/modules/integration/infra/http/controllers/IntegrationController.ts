import { container } from 'tsyringe';
import { Request, Response } from 'express';

import IntegrationUseCase from '@modules/integration/useCases/IntegrationUseCase';

class IntegrationController {
  public async index(request: Request, response: Response) {
    const integration = container.resolve(IntegrationUseCase);

    await integration.registerWonDealsOnBling();

    return response.status(200).json({ message: 'PIPEDRIVE_DEALS_MIGRATED_TO_BLING' });
  }
}

export default new IntegrationController();
