import { OrderStatus } from "../defines/defines";

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
  paidDate: Date | null;
  orderNo : number;
  customerName: string,
  status: IOrderStatus;
  synced: boolean; // Indicates whether the order is synced with the backend
  lastUpdated: Date; // Tracks the last time the order was modified
}

export type IOrderStatus =  OrderStatus.PENDING | OrderStatus.PAID | OrderStatus.POSTPONED | OrderStatus.CANCELLED | OrderStatus.PAID_POSTPONED;
