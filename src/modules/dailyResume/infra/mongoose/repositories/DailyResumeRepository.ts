import IDailyResumeDTO from '@modules/dailyResume/dtos/IDailyResumeDTO';
import IWonDealsDTO from '@modules/dailyResume/dtos/IWonDealsDTO';
import IDailyResumeRepository from '@modules/dailyResume/repositories/IDailyResumeRepository';
import { DailyResume } from '../entities/DailyResume';

class DailyResumeRepository implements IDailyResumeRepository {
  public async insertMany(data: IDailyResumeDTO[]): Promise<IDailyResumeDTO[]> {
    return DailyResume.insertMany(data);
  }

  public async findResumeByDate(date: Date): Promise<any> {
    return DailyResume.findOne({ resumeDate: { $eq: date } });
  }

  public async findDealById(dealId: number): Promise<any> {
    return DailyResume.findOne({ 'wonDeals.dealId': dealId }).exec();
  }

  public async updateResumeById(data: IDailyResumeDTO, deals: IWonDealsDTO[]):
  Promise<IDailyResumeDTO> {
    return DailyResume.findOneAndUpdate({ _id: data._id },
      {
        totalValue: data.totalValue,
        totalWonDeals: data.totalWonDeals,
        $addToSet: { wonDeals: deals },
      }).exec();
  }

  public deleteOldDailyResume(date: Date): void {
    DailyResume.deleteOne({ resumeDate: { $eq: date } }).exec();
  }
}

export default DailyResumeRepository;
