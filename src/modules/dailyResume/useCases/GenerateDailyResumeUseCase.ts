import { injectable, inject } from 'tsyringe';
import {
  parseISO, isAfter, isBefore, addHours
} from 'date-fns';

import IWonDealsDTO from '../dtos/IWonDealsDTO';
import IDailyResumeDTO from '../dtos/IDailyResumeDTO';
import IPipedriveResponseDTO from '../dtos/IPipedriveResponseDTO';
import generateWonDeal from '../utils/generateWonDeal';

class GenerateDailyResumeUseCase {
  public generate(deals: IPipedriveResponseDTO[], date: Date): any {
    const dailyResume: IDailyResumeDTO = {
      totalValue: 0,
      totalWonDeals: 0,
      resumeDate: date,
      wonDeals: []
    };

    let totalValueAccumulator = 0;
    let totalWonDealsCount = 0;

    deals.forEach((deal) => {
      const parsedDealDate = parseISO(deal.dealWonTime);
      const providedDatePlus24h = addHours(date, 24);

      if (isAfter(parsedDealDate, date) && isBefore(parsedDealDate, providedDatePlus24h)) {
        const newWonDeal: IWonDealsDTO = generateWonDeal(deal, parsedDealDate);

        dailyResume.wonDeals.push(newWonDeal);

        totalValueAccumulator += deal.weightedValue;
        totalWonDealsCount += 1;
      }
    });

    dailyResume.totalValue = totalValueAccumulator;
    dailyResume.totalWonDeals = totalWonDealsCount;

    return dailyResume;
  }
}

export default GenerateDailyResumeUseCase;
