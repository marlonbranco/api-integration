export default interface IDailyResumeDTO {
  totalValue: number;
  totalWonDeals: number;
  wonTime: Date;
  wonDeals: {
    dealId: number;
    personId: number;
    personName: string;
    title: string;
    productsCount: number;
    weightedValue: number;
  }[]
}
