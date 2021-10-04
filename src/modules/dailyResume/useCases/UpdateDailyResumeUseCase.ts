import { injectable, inject } from 'tsyringe';
import {
  parseISO
} from 'date-fns';

import IDailyResumeRepository from '@modules/dailyResume/repositories/IDailyResumeRepository';
import IWonDealsDTO from '../dtos/IWonDealsDTO';
import IDailyResumeDTO from '../dtos/IDailyResumeDTO';
import IPipedriveResponseDTO from '../dtos/IPipedriveResponseDTO';
import generateWonDeal from '../utils/generateWonDeal';

interface IDailyResumeUpdate {
  _id: string;
  totalValue: number;
  totalWonDeals: number;
}

@injectable()
class UpdateDailyResumeUseCase {
  constructor(
    @inject('DailyResumeRepository')
    private dailyResumeRepository: IDailyResumeRepository
  ) {}

  public async update(deals: IPipedriveResponseDTO[], date: Date): Promise<any> {
    const dailyResume:IDailyResumeDTO = await this.dailyResumeRepository.findResumeByDate(date);

    if (dailyResume) {
      const newWonDeals: IWonDealsDTO[] = [];
      const dailyResumeToBeUpdated: IDailyResumeUpdate = {
        _id: dailyResume._id!,
        totalValue: dailyResume.totalValue!,
        totalWonDeals: dailyResume.totalWonDeals!
      }

      let totalValueAccumulator = 0;
      let totalWonDealsCount = 0;

      deals.forEach((deal) => {
        const parsedDealDate = parseISO(deal.dealWonTime);
        const newWonDeal: IWonDealsDTO = generateWonDeal(deal, parsedDealDate);
        newWonDeals.push(newWonDeal);
        totalValueAccumulator += deal.weightedValue;
        totalWonDealsCount += 1;
      });

      dailyResumeToBeUpdated.totalValue += totalValueAccumulator;
      dailyResumeToBeUpdated.totalWonDeals += totalWonDealsCount;

      const updatedDailyResume = await this.dailyResumeRepository
        .updateResumeById(dailyResumeToBeUpdated, newWonDeals);

      return updatedDailyResume;
    }
    return dailyResume;
  }
}

export default UpdateDailyResumeUseCase;
