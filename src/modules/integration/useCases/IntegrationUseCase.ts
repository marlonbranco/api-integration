import { container, injectable, inject } from 'tsyringe';

import IPipedriveDealsUseCase from '@shared/containers/providers/Pipedrive/models/IPipedriveDealsUseCase';
import IBlingOrdersUseCase from '@shared/containers/providers/Bling/models/IBlingOrdersUseCase'
import IDailyResumeRepository from '@modules/dailyResume/repositories/IDailyResumeRepository'
import DailyResumeUseCase from '@modules/dailyResume/useCases/DailyResumeUseCase'
import IPipedriveResponseDTO from '@modules/dailyResume/dtos/IPipedriveResponseDTO';

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

  public async filterMigratedDeals(deals: IPipedriveResponseDTO[]):
  Promise<IPipedriveResponseDTO[]> {
    const filteredDeals: IPipedriveResponseDTO[] = [];

    for await (const deal of deals) {
      const dealWasMigrated = await this.dailyResumeRepository.findDealById(deal.dealId);
      if (!dealWasMigrated) {
        filteredDeals.push(deal);
      }
    }
    return filteredDeals;
  }

  public async registerWonDealsOnBling(): Promise<any> {
    const registerDealsResume = container.resolve(DailyResumeUseCase);

    const deals = await this.pipedriveDealsUseCase.getDeals();

    const hasDealsToBeMigrated = await this.filterMigratedDeals(deals);

    if (hasDealsToBeMigrated.length) {
      await registerDealsResume.registerWonDealsOnMongo(hasDealsToBeMigrated);

      await this.blingOrdersUseCase.registerOrders(hasDealsToBeMigrated);

      return hasDealsToBeMigrated;
    }
    console.log('NO DATA WAS MIGRATED')
    return deals;
  }
}

export default IntegrationUseCase;
