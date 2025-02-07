import Dexie, { Table } from 'dexie';
import { IOrder, IOrderItem } from '../models/order';
import { IMenuItem } from './../models/menu-item';

export class CafeDatabase extends Dexie {
  orders!: Table<IOrder, string>; // Table with `IOrder` interface and `orderId` as the primary key
  orderItems!: Table<IOrderItem, string>; // Table with `IOrderItem` interface and `id` as the primary key
  menuItems!: Table<IMenuItem, string>; // Table with `IMenuItem` interface and `id` as the primary key

  constructor() {
    super('CafeDatabase');

    // Define tables and indexes
    this.version(3).stores({
      orders: 'orderId, date, timestamp, paidDate, status, orderNo, customerName, lastUpdated, synced, createdBy, [timestamp+status], [date+status], [date+status+customerName], [timestamp+status+customerName], [status+customerName], [date+customerName]', //indexing for faster queries
      orderItems: 'id, itemName, itemEnglishName, price, total',
      menuItems: 'id, name, english_name, price, isSelected, category',
    });
  }
}

// Initialize database instance
export const db = new CafeDatabase();
