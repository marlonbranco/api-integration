import { injectable, inject } from 'tsyringe';
import IDailyResumeRepository from '@modules/integration/repositories/IDailyResumeRepository';
import IPipedriveDealsUseCase from '@shared/containers/providers/Pipedrive/models/IPipedriveDealsUseCase';
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

  public async registerWonDealsOnBling() {
    const deals = await this.pipedriveDealsUseCase.getDeals();

    const orders = await this.blingOrdersUseCase.registerOrders(deals);

    // const dailyResume: IDailyResumeDTO[] = [];

    // deals.forEach((deal) => {
    //   const newDailyResume = {

    //   }
    // })
    return orders;
  }
}

export default IntegrationUseCase;
