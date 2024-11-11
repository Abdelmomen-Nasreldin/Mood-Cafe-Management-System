export interface IOrderItem {
  id: string;
  itemName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IOrder {
  orderId: string;
  items: IOrderItem[];
  total: number;
  date: Date;
}


