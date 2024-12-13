import Dexie, { Table } from 'dexie';
import { IOrder, IOrderItem } from '../models/order';

export class CafeDatabase extends Dexie {
  orders!: Table<IOrder, string>; // Table with `IOrder` interface and `orderId` as the primary key
  orderItems!: Table<IOrderItem, string>; // Table with `IOrderItem` interface and `id` as the primary key

  constructor() {
    super('CafeDatabase');

    // Define tables and indexes
    this.version(1).stores({
      orders: 'orderId, date, paidDate, status, orderNo, customerName', // Indexing for faster queries
      orderItems: 'id, itemName, itemEnglishName, price, total',
    });
  }
}

// Initialize database instance
export const db = new CafeDatabase();


  // // Delete an order
  // async deleteOrder(orderId: string): Promise<void> {
  //   await this.orders.delete(orderId);
  // }

  // // Clear all orders
  // async clearOrders(): Promise<void> {
  //   await this.orders.clear();
  // }

  // // Query orders by status (e.g., "pending")
  // async getOrdersByStatus(status: IOrderStatus): Promise<IOrder[]> {
  //   return this.orders.where('status').equals(status).toArray();
  // }

  // // Query orders by customer name
  // async getOrdersByCustomerName(customerName: string): Promise<IOrder[]> {
  //   return this.orders.where('customerName').equalsIgnoreCase(customerName).toArray();
  // }

  // // Query orders within a date range
  // async getOrdersByDateRange(startDate: Date, endDate: Date): Promise<IOrder[]> {
  //   return this.orders
  //     .where('date')
  //     .between(startDate.toISOString(), endDate.toISOString(), true, true)
  //     .toArray();
  // }
