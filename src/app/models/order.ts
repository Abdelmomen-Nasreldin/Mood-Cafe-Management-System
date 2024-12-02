export interface IOrderItem {
  id: string;
  itemName: string;
  itemEnglishName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IOrder {
  orderId: string;
  items: IOrderItem[];
  total: number;
  date: Date;
  orderNo : number;
  customerName: string,
  status: 'pending' | 'paid' | 'postponed' | 'cancelled';
}


