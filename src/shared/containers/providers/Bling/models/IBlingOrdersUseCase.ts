import IOrderDTO from '../dtos/IOrderDTO';
import { IPipedriveResponse } from '../../Pipedrive/models/IPipedriveDealsUseCase';

export interface IBlingResponse {
    retorno: {
      pedidos: {
        pedido: {
          numero: string,
          idPedido: number,
        }
      }[]
    }
}

export default interface IBling {
  dismemberOrdersBatch(batch: IPipedriveResponse[]): Promise<IOrderDTO[]>;
  formatXmlToBlingPattern(order: IOrderDTO): string;
  registerSingleOrder(order: IOrderDTO): Promise<any>;
  registerOrders(batch: IPipedriveResponse[]): Promise<any>;
}
