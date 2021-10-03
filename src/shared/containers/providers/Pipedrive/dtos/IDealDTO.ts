export default interface IDealDTO {
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
