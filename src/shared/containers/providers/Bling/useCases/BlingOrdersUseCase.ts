import { injectable, inject } from 'tsyringe';
import ErrorsApp from '@errors/ErrorsApp';
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

  public async formatAndRegisterOrder(order: IOrderDTO): Promise<any> {
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

    const xml = this.xmlProvider.generate(formattedOrder);
    console.log(typeof xml)
    try {
      const blingKey = process.env.BLING_API_KEY!;
      const response = await blingApi.post('/pedido/json', null, {
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded',
        // },
        params: {
          apikey: blingKey,
          xml
        }
      });
      console.log('RESPONSE DATA:', response.data.retorno.erros);
      return response.data;
    } catch (error: any) {
      throw new ErrorsApp(error);
    }
  }

  public async registerOrders(batch: IPipedriveResponse[]): Promise<any> {
    const orders = await this.dismemberOrdersBatch(batch);
    const registeredOrders = []
    for await (const order of orders) {
      const { response } = await this.formatAndRegisterOrder(order);
      registeredOrders.push(response);
      console.log('RESPONSE:', response);
    }
    return registeredOrders;
  }
}

export default BlingOrdersUseCase;
