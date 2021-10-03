export default interface IOrderDTO {
  orderId: number,
  clientId: number,
  clientName: string,
  volumeService: string,
  itemCode: number,
  itemDescription: string,
  itemQuantity: number,
  itemUnitaryValue: number,
  parcelValue: number,
}
