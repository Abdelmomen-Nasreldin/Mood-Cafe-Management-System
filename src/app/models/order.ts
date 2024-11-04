
export interface IOrderItem {
  id: number;
  itemName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IOrder {
  orderId: number;
  items: IOrderItem[];
  totalAmount: number;
  date: Date;
}
