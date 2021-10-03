export interface IDealDTO {
  success: boolean;
  data: {
    id: number;
    person_id: {
      value: number;
    };
    org_id: {
      value: number;
    };
    person_name: string;
    title: string;
    products_count: number;
    weighted_value: number;
    won_time: Date;
  }[];
}

export interface IPipedriveResponse {
    dealId: number;
    personId: number;
    personName: string;
    orgId: number;
    dealTitle: string;
    weightedValue: number;
    productsCount: number;
    dealWonTime: string;
}

export default interface IPipedrive {
  getDeals(): Promise<IPipedriveResponse[]>;
}
