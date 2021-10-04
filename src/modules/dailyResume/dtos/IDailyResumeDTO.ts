import IWonDealsDTO from './IWonDealsDTO';

export default interface IDailyResumeDTO {
  _id?: string;
  totalValue: number;
  totalWonDeals: number;
  resumeDate: Date;
  wonDeals: IWonDealsDTO[]
}
