export interface IResponse {
    personName: string;
    weightedValue: number;
    productsCount: number;
}
export default interface IPipedrive {
  getDeals(): Promise<IResponse[]>;
}
