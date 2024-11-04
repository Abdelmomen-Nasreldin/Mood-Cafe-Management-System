import { Injectable } from '@angular/core';
import { subDays, isWithinInterval } from 'date-fns'; // Use date-fns for easy date handling
import { calculateItemTotal, IOrder, IOrderItem } from '../models/order';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersKey = 'cafe_orders';
  private _enableOrdering = new BehaviorSubject(false);

  public get enableOrdering() {
    return this._enableOrdering.asObservable();
  }
  public setEnableOrdering(value: boolean) {
    this._enableOrdering.next(value);
  }

  private _orderedSidebarItems = new BehaviorSubject<IOrderItem[]>([]);

  public getOrderedSidebarItems() {
    return this._orderedSidebarItems.asObservable();
  }
  public addOrderedSidebarItems(orderItem: IOrderItem) {
    const currentOrders = this._orderedSidebarItems.getValue();
    const itemIndex = currentOrders.findIndex(
      (ele) => ele.itemName === orderItem.itemName
    );
    if (itemIndex == -1) {
      currentOrders.push(orderItem);
    } else {
      currentOrders[itemIndex].quantity++;
      currentOrders[itemIndex].total = calculateItemTotal(
        currentOrders[itemIndex]
      );
    }
    this._orderedSidebarItems.next(currentOrders);
  }

  public resetOrderedSidebarItems(){
    this._orderedSidebarItems.next([]);
  }

  // orders ///////////////////////////////////////////////////////////////

  private _allOrders = new BehaviorSubject<IOrder[]>(this.getOrders());

  public getAllOrders(): Observable<IOrder[]> {
    return this._allOrders.asObservable();
  }

  // public setAllOrders(value: IOrder[]) {
  //   this._allOrders.next(value);
  // }

  private updateOrdersSubject() {
    this._allOrders.next(this.getOrders());  // Sync the subject with the latest orders from localStorage
  }

  getOrders(): IOrder[] {
    const orders = localStorage.getItem(this.ordersKey);
    return orders ? JSON.parse(orders) : [];
  }

  saveOrdersToLocalStorage(orders : IOrder[]){
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    this.updateOrdersSubject();
  }

  saveOrder(order: IOrder) {
    const orders = this.getOrders();
    orders.push(order);
    this.saveOrdersToLocalStorage(orders);
  }

  deleteOrder(orderId: number) {
    let orders = this.getOrders();
    orders = orders.filter((order: IOrder) => order.orderId !== orderId);
    this.saveOrdersToLocalStorage(orders);
  }

  // make sure it works fine
  updateOrder(updatedOrder: IOrder): void {
    const orders = this.getOrders().map((order: IOrder) =>
      order.orderId === updatedOrder.orderId ? updatedOrder : order
    );
    this.saveOrdersToLocalStorage(orders);  // Save and notify
  }

  // tracking orders //////////////////////////////////////////////////////
  getWeeklyOrders() {
    const today = new Date();
    const weekAgo = subDays(today, 7);
    const orders = this.getOrders();
    return orders.filter((order) =>
      isWithinInterval(new Date(order.date), { start: weekAgo, end: today })
    );
  }

  getMonthlyOrders() {
    const today = new Date();
    const monthAgo = subDays(today, 30);
    const orders = this.getOrders();
    return orders.filter((order) =>
      isWithinInterval(new Date(order.date), { start: monthAgo, end: today })
    );
  }
}
