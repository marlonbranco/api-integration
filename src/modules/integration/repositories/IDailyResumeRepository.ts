import IDailyResumeDTO from '@modules/integration/dtos/IDailyResumeDTO';
import IDealIdsDTO from '@modules/integration/dtos/IDealIdsDTO';

export default interface IDailyResumeRepository {
  insertMany(data: IDailyResumeDTO[]): Promise<IDailyResumeDTO[]>;
  filterRegisteredDeals(dealIds: IDealIdsDTO): Promise<any>;
  deleteOldDailyResume(date: Date): Promise<void>;
}
