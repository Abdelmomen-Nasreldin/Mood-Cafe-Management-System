import Dexie, { Table } from 'dexie';
import { Injectable } from '@angular/core';
import { IOrder, IOrderStatus } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderDatabase extends Dexie {
  // Define tables for your orders
  orders!: Table<IOrder, string>; // `orderId` is the key

  constructor() {
    super('OrderDatabase'); // Name of the database
    this.version(1).stores({
      orders: 'orderId, date, status, customerName', // Indexes for faster querying
    });
  }

    // Add multiple orders at once
  async addOrders(orders: IOrder[]): Promise<void> {
      await this.orders.bulkAdd(orders); // Add an array of orders at once
  }

  // Add an order to IndexedDB
  async addOrder(order: IOrder): Promise<void> {
    await this.orders.add(order);
  }

  // Get a specific order by orderId
  async getOrder(orderId: string): Promise<IOrder | undefined> {
    return this.orders.get(orderId);
  }

  // Get all orders
  async getAllOrders(): Promise<IOrder[]> {
    return this.orders.toArray();
  }

  // Delete an order
  async deleteOrder(orderId: string): Promise<void> {
    await this.orders.delete(orderId);
  }

  // Clear all orders
  async clearOrders(): Promise<void> {
    await this.orders.clear();
  }

  // Query orders by status (e.g., "pending")
  async getOrdersByStatus(status: IOrderStatus): Promise<IOrder[]> {
    return this.orders.where('status').equals(status).toArray();
  }

  // Query orders by customer name
  async getOrdersByCustomerName(customerName: string): Promise<IOrder[]> {
    return this.orders.where('customerName').equalsIgnoreCase(customerName).toArray();
  }

  // Query orders within a date range
  async getOrdersByDateRange(startDate: Date, endDate: Date): Promise<IOrder[]> {
    return this.orders
      .where('date')
      .between(startDate.toISOString(), endDate.toISOString(), true, true)
      .toArray();
  }
}
