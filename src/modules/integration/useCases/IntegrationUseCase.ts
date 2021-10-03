import { injectable, inject } from 'tsyringe';
import {
  format, parseISO, startOfDay, isAfter, isBefore, addHours
} from 'date-fns';
import IDailyResumeRepository from '@modules/integration/repositories/IDailyResumeRepository';
import IPipedriveDealsUseCase from '@shared/containers/providers/Pipedrive/models/IPipedriveDealsUseCase';
import IBlingOrdersUseCase from '@shared/containers/providers/Bling/models/IBlingOrdersUseCase'
import IPipedriveResponseDTO from '../dtos/IPipedriveResponseDTO';
import IWonDealsDTO from '../dtos/IWonDealsDTO';
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

  public async generateDailyResume(deals: IPipedriveResponseDTO[], date: string): Promise<any> {
    const providedDate = parseISO(date);
    const dailyResume: IDailyResumeDTO = {
      totalValue: 0,
      totalWonDeals: 0,
      resumeDate: providedDate,
      wonDeals: []
    };
    let totalValueAccumulator = 0;
    let totalWonDealsCount = 0;
    deals.forEach((deal) => {
      const parsedDealDate = parseISO(deal.dealWonTime);
      const providedDatePlus24h = addHours(providedDate, 24);
      console.log(parsedDealDate);
      if (isAfter(parsedDealDate, providedDate) && isBefore(parsedDealDate, providedDatePlus24h)) {
        const newDailyResume: IWonDealsDTO = {
          dealId: deal.dealId,
          personId: deal.personId,
          personName: deal.personName,
          title: deal.dealTitle,
          productsCount: deal.productsCount,
          weightedValue: deal.weightedValue,
          dealWonTime: parsedDealDate
        }
        dailyResume.wonDeals.push(newDailyResume);
        totalValueAccumulator += deal.weightedValue;
        totalWonDealsCount += 1;
      }
    });

    dailyResume.totalValue = totalValueAccumulator;
    dailyResume.totalWonDeals = totalWonDealsCount;

    console.log('DAILY RESUME: ', dailyResume);

    return dailyResume;
  }

  public async registerWonDealsOnMongo(): Promise<void> {
    const deals = await this.pipedriveDealsUseCase.getDeals();

    const dealWonDates = deals.map((deal) => {
      const parsedDate = parseISO(deal.dealWonTime);

      const stringDate = startOfDay(parsedDate).toISOString()

      return stringDate;
    });

    const uniqueDates = [...new Set(dealWonDates)];

    console.log('MOM GET BETTER SOON! 🙏 ', uniqueDates);

    const dailyResumesBatch: IDailyResumeDTO[] = []

    for await (const date of uniqueDates) {
      console.log(date);
      const newDailyResume = await this.generateDailyResume(deals, date);
      dailyResumesBatch.push(newDailyResume);
    }
    const newDailyResumes = await this.dailyResumeRepository.insertMany(dailyResumesBatch);

    console.log(newDailyResumes)
  }

  public async registerWonDealsOnBling(): Promise<any> {
    // const deals = await this.pipedriveDealsUseCase.getDeals();

    // const orders = await this.blingOrdersUseCase.registerOrders(deals);

    const dailyResume = await this.registerWonDealsOnMongo();

    console.log(dailyResume);
    return { message: 'REGISTERED' };
  }
}

export default IntegrationUseCase;
