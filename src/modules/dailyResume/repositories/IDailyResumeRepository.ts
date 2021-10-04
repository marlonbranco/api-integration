import IDailyResumeDTO from '@modules/dailyResume/dtos/IDailyResumeDTO';
import IWonDealsDTO from '@modules/dailyResume/dtos/IWonDealsDTO';

export default interface IDailyResumeRepository {
  insertMany(data: IDailyResumeDTO[]): Promise<IDailyResumeDTO[]>;
  listAllDailyResumes(): Promise<IDailyResumeDTO[]>;
  findResumeByDate(date: Date): Promise<any>;
  findDealById(dealId: number): Promise<any>;
  updateResumeById(data: IDailyResumeDTO, deals: IWonDealsDTO[]): Promise<IDailyResumeDTO | null>
  deleteOldDailyResume(date: Date): void;
}
