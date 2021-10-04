import IWonDealsDTO from '../dtos/IWonDealsDTO';
import IPipedriveResponseDTO from '../dtos/IPipedriveResponseDTO';

export default function generateWonDeal(deal: IPipedriveResponseDTO, date: Date): IWonDealsDTO {
  const newDeal: IWonDealsDTO = {
    dealId: deal.dealId,
    personId: deal.personId,
    personName: deal.personName,
    title: deal.dealTitle,
    productsCount: deal.productsCount || 1,
    weightedValue: deal.weightedValue,
    dealWonTime: date
  }
  return newDeal;
}
