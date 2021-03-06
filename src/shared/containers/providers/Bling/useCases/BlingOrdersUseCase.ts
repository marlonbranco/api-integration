import { injectable, inject } from 'tsyringe';
import ErrorsApp from '@errors/ErrorsApp';
import delayBetweenRequests from '@shared/utils/delayBetweenRequests';
import IOrderDTO from '../dtos/IOrderDTO';
import IBling from '../models/IBlingOrdersUseCase';
import { blingApi } from '../infra/http/apiConnection';
import { IPipedriveResponse } from '../../Pipedrive/models/IPipedriveDealsUseCase';
import IXmlProvider from '../../XmlProvider/models/IXmlProvider';

@injectable()
class BlingOrdersUseCase implements IBling {
  constructor(
    @inject('XmlProvider')
    private xmlProvider: IXmlProvider
  ) {}

  public async dismemberOrdersBatch(batch: IPipedriveResponse[]): Promise<IOrderDTO[]> {
    const orders: IOrderDTO[] = []
    batch.forEach((order) => {
      const newOrder: IOrderDTO = {
        orderId: order.dealId,
        clientId: order.personId,
        clientName: order.personName,
        itemCode: order.orgId,
        itemDescription: order.dealTitle,
        itemQuantity: order.productsCount,
        itemUnitaryValue: order.weightedValue,
        parcelValue: order.weightedValue,
        volumeService: 'SEDEX - CONTRATO'
      };

      orders.push(newOrder);
    });

    return orders;
  }

  public formatXmlToBlingPattern(order: IOrderDTO): string {
    const formattedOrder = {
      pedido: {
        numero: order.orderId,
        cliente: {
          id: order.clientId,
          nome: order.clientName,
        },
        volume: {
          service: order.volumeService
        },
        item: {
          codigo: order.itemCode,
          descricao: order.itemDescription,
          qtde: order.itemQuantity || 1,
          vlr_unit: order.itemUnitaryValue
        },
        parcela: {
          vlr: order.parcelValue
        }
      }
    };

    return this.xmlProvider.generate(formattedOrder);
  }

  public async registerSingleOrder(order: IOrderDTO): Promise<any> {
    const xml = this.formatXmlToBlingPattern(order);

    try {
      const blingKey = process.env.BLING_API_KEY!;
      await blingApi.post('/pedido/json', null, {
        params: {
          apikey: blingKey,
          xml
        }
      });
      return { message: 'DATA WAS SENT' };
    } catch (error: any) {
      throw new ErrorsApp(error);
    }
  }

  public async registerOrders(batch: IPipedriveResponse[]): Promise<void> {
    const orders = await this.dismemberOrdersBatch(batch);

    for await (const order of orders) {
      await delayBetweenRequests(334);
      await this.registerSingleOrder(order);
    }
  }
}

export default BlingOrdersUseCase;
