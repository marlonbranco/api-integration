import { AxiosResponse } from 'axios';
import { parseISO } from 'date-fns';
import ErrorsApp from '@errors/ErrorsApp';
import IDealDTO from '../dtos/IDealDTO';
import IPipedrive, { IPipedriveResponse } from '../models/IPipedriveDealsUseCase';
import { pipedriveApi } from '../infra/http/apiConnection';

class PipedriveDealsUseCase implements IPipedrive {
  public async getDeals(): Promise<IPipedriveResponse[]> {
    const pipedriveToken = process.env.PIPEDRIVE_API_TOKEN;

    try {
      const response: AxiosResponse = await pipedriveApi.get('/deals', {
        params: {
          status: 'won',
          api_token: pipedriveToken
        }
      });
      const { data }: IDealDTO = response.data;
      const deals: IPipedriveResponse[] = [];

      data.forEach((deal) => {
        const newDeal = {
          dealId: deal.id,
          personId: deal.person_id.value,
          personName: deal.person_name,
          orgId: deal.org_id.value,
          dealTitle: deal.title,
          weightedValue: deal.weighted_value,
          productsCount: deal.products_count,
          dealWonTime: deal.won_time
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
