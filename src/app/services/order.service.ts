import { Injectable } from '@angular/core';
import { subDays, isWithinInterval } from 'date-fns'; // Use date-fns for easy date handling
import { IOrder } from '../models/order';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersKey = 'cafe_orders';
  private _enableOrdering = new BehaviorSubject(false);

  public get enableOrdering() {
    return this._enableOrdering.asObservable();
  }
  public setEnableOrdering(value : boolean) {
    this._enableOrdering.next(value);
  }

  getOrders() : IOrder[] {
    const orders = localStorage.getItem(this.ordersKey);
    return orders ? JSON.parse(orders) : [];
  }

  saveOrder(order: IOrder) {
    const orders = this.getOrders();
    orders.push(order);
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));
  }

  deleteOrder(orderId: number) {
    let orders = this.getOrders();
    orders = orders.filter((order: IOrder) => order.orderId !== orderId);
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));
  }

  updateOrder(updatedOrder: IOrder) {
    let orders = this.getOrders();
    const index = orders.findIndex((order: IOrder) => order.orderId === updatedOrder.orderId);
    if (index > -1) {
      orders[index] = updatedOrder;
      localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    }
  }


  // tracking orders
  getWeeklyOrders() {
    const today = new Date();
    const weekAgo = subDays(today, 7);
    const orders = this.getOrders();
    return orders.filter(order =>
      isWithinInterval(new Date(order.date), { start: weekAgo, end: today })
    );
  }

  getMonthlyOrders() {
    const today = new Date();
    const monthAgo = subDays(today, 30);
    const orders = this.getOrders();
    return orders.filter(order =>
      isWithinInterval(new Date(order.date), { start: monthAgo, end: today })
    );
  }
}
