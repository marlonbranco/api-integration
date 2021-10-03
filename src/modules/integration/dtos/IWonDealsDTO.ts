export default interface IWonDealsDTO {
  wonDeals?: {
    dealId: number;
    personId: number;
    personName: string;
    title: string;
    productsCount: number;
    weightedValue: number;
}[]
}
