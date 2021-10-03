import IDailyResumeDTO from '@modules/integration/dtos/IDailyResumeDTO';
import IDealIdsDTO from '@modules/integration/dtos/IDealIdsDTO';
// import IWonDealsDTO from '@modules/integration/dtos/IWonDealsDTO';
import IDailyResumeRepository from '@modules/integration/repositories/IDailyResumeRepository';
import { DailyResume } from '../entities/DailyResume';

class DailyResumeRepository implements IDailyResumeRepository {
  public async insertMany(data: IDailyResumeDTO[]): Promise<IDailyResumeDTO[]> {
    return DailyResume.insertMany(data);
  }

  public async filterRegisteredDeals(dealIds: IDealIdsDTO): Promise<any> {
    const notRegisteredDeals = await DailyResume.find({ 'wonDeals.dealId': { $nin: dealIds } });

    return notRegisteredDeals;
  }

  public async deleteOldDailyResume(date: Date): Promise<void> {
    await DailyResume.deleteOne({ resumeDate: { $eq: date } }).exec();
  }
}

export default DailyResumeRepository;
