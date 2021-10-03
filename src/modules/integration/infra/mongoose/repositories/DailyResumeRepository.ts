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

    console.log(notRegisteredDeals);

    return notRegisteredDeals;
  }
}

export default DailyResumeRepository;
