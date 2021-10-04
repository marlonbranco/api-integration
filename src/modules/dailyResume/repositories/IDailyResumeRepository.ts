import IDailyResumeDTO from '@modules/integration/dtos/IDailyResumeDTO';
import IWonDealsDTO from '@modules/dailyResume/dtos/IWonDealsDTO';

export default interface IDailyResumeRepository {
  insertMany(data: IDailyResumeDTO[]): Promise<IDailyResumeDTO[]>;
  findResumeByDate(date: Date): Promise<any>;
  findDealById(dealId: number): Promise<any>;
  updateResumeById(data: IDailyResumeDTO, deals: IWonDealsDTO[]): Promise<IDailyResumeDTO>
  deleteOldDailyResume(date: Date): void;

}
