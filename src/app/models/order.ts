
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

export function calculateItemTotal(item: IOrderItem): number {
  return item.price * item.quantity;
}

export function calculateOrderTotal(items: IOrderItem[]): number {
  return items.reduce((total, item) => total + item.total, 0);
}
