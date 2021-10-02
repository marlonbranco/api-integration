import { AxiosResponse } from 'axios';
import ErrorsApp from '@errors/ErrorsApp';
import IDealDTO from '@sharedProviders/Pipedrive/dtos/IDealDTO';
import IPipedrive, { IResponse } from '../interfaces/IPipedriveDealsUseCase';
import { pipedriveApi } from '../infra/http/apiConnection';

class PipedriveDealsUseCase implements IPipedrive {
  public async getDeals(): Promise<IResponse[]> {
    const pipedriveToken = process.env.PIPEDRIVE_API_TOKEN;

    try {
      const response: AxiosResponse = await pipedriveApi.get('/deals', {
        params: {
          status: 'won',
          api_token: pipedriveToken
        }
      });
      const { data }: IDealDTO = response.data;
      const deals: IResponse[] = [];

      data.forEach((deal, i) => {
        const newDeal = {
          personName: deal.person_name,
          weightedValue: deal.weighted_value,
          productsCount: deal.products_count
        }
        deals.push(newDeal);
      });

      return deals;
    } catch (error: any) {
      throw new ErrorsApp(error.message);
    }
  }
}

export default PipedriveDealsUseCase;
