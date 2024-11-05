import { Injectable } from '@angular/core';
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

  public setOrderedSidebarItems(orders :IOrderItem[]) {
    this._orderedSidebarItems.next(orders);
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

  public deleteOrderedSidebarItem(itemId: string): void {
    const currentOrders = this._orderedSidebarItems.getValue();
    const filtered = currentOrders.filter(ele => ele.id !== itemId);
    this._orderedSidebarItems.next(filtered);
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

  saveOrdersToLocalStorage(orders : IOrder[]){
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    this.updateOrdersSubject();
  }

  getOrders(): IOrder[] {
    const orders = localStorage.getItem(this.ordersKey);
    return orders ? JSON.parse(orders) : [];
  }

  getOrderById(orderId : string){
    const orders = this.getOrders();
    const wantedOrder = orders.find(ele=>ele.orderId == orderId);
    return wantedOrder
  }

  saveOrder(order: IOrder) {
    const orders = this.getOrders();
    orders.push(order);
    this.saveOrdersToLocalStorage(orders);
  }

  deleteOrder(orderId: string) {
    let orders = this.getOrders();
    orders = orders.filter((order: IOrder) => order.orderId !== orderId);
    this.saveOrdersToLocalStorage(orders);
  }

  // make sure it works fine
  updateOrder(updatedOrder: IOrder): void {
    const orders = this.getOrders().map((order: IOrder) =>
      order.orderId === updatedOrder.orderId ? updatedOrder : order
    );
    this.saveOrdersToLocalStorage(orders);
    console.log(updatedOrder,orders);
     // Save and notify
  }


}
