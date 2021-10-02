export default interface IDealDTO {
  success: boolean;
  data: {
    person_name: string;
    weighted_value: number;
    products_count: number;
  }[];
}
