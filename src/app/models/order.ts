
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
  totalAmount: number;
  date: Date;
}

export function calculateItemTotal(item: IOrderItem): number {
  return item.price * item.quantity;
}

export function calculateOrderTotal(items: IOrderItem[]): number {
  return items.reduce((total, item) => total + item.total, 0);
}
