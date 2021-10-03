import { injectable, inject } from 'tsyringe';
import IDailyResumeRepository from '@modules/integration/repositories/IDailyResumeRepository';
import IPipedriveDealsUseCase, { IDealDTO } from '@shared/containers/providers/Pipedrive/models/IPipedriveDealsUseCase';
import IBlingOrdersUseCase from '@shared/containers/providers/Bling/models/IBlingOrdersUseCase'
import IDailyResumeDTO from '../dtos/IDailyResumeDTO';

@injectable()
class IntegrationUseCase {
  constructor(
    @inject('DailyResumeRepository')
    private dailyResumeRepository: IDailyResumeRepository,
    @inject('PipedriveDealsUseCase')
    private pipedriveDealsUseCase: IPipedriveDealsUseCase,
    @inject('BlingOrdersUseCase')
    private blingOrdersUseCase: IBlingOrdersUseCase
  ) {}

  public async registerDailyResume(deals: IDealDTO[]): Promise<void> {
    const dailyResume: IDailyResumeDTO[] = [];

    deals.forEach((deal) => {
      const newDailyResume = {

      }
    })
  }

  public async registerWonDealsOnBling(): Promise<void> {
    const deals = await this.pipedriveDealsUseCase.getDeals();

    const orders = await this.blingOrdersUseCase.registerOrders(deals);

    return orders;
  }
}

export default IntegrationUseCase;
