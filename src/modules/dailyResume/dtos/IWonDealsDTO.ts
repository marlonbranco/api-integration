export default interface IWonDealsDTO {
    dealId: number;
    personId: number;
    personName: string;
    title: string;
    productsCount: number;
    weightedValue: number;
    dealWonTime: Date;
}
