import { Injectable } from "@angular/core";
import { IOrder, IOrderItem, IOrderStatus } from "../models/order";
import { BehaviorSubject, from, Observable } from "rxjs";
import { calculateItemTotal } from "../utils";
import { db } from "../indexedDB/order-database";
import { liveQuery } from "dexie";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private ordersKey = "cafe_orders";
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

  public setOrderedSidebarItems(orders: IOrderItem[]) {
    this._orderedSidebarItems.next(orders);
  }

  public addOrderedSidebarItems(orderItem: IOrderItem) {
    const currentOrders = this._orderedSidebarItems.getValue();
    const itemIndex = currentOrders.findIndex((ele) => ele.itemName === orderItem.itemName);
    if (itemIndex == -1) {
      currentOrders.push(orderItem);
    } else {
      currentOrders[itemIndex].quantity++;
      currentOrders[itemIndex].total = calculateItemTotal(currentOrders[itemIndex]);
    }
    this._orderedSidebarItems.next(currentOrders);
  }

  public deleteOrderedSidebarItem(itemId: string): void {
    const currentOrders = this._orderedSidebarItems.getValue();
    const filtered = currentOrders.filter((ele) => ele.id !== itemId);
    this._orderedSidebarItems.next(filtered);
  }

  public resetOrderedSidebarItems() {
    this._orderedSidebarItems.next([]);
  }

  // orders ///////////////////////////////////////////////////////////////

  getAllOrders(): Observable<IOrder[]> {
    return from(liveQuery(() => db.orders.toArray()));
  }

  async getOrderById(orderId: string): Promise<IOrder | undefined> {
    const order = await db.orders.get(orderId);
    return order
  }

  async saveOrder(order: IOrder): Promise<void> {
    await db.orders.add(order);
  }

  async updateOrder(updatedOrder: IOrder): Promise<void> {
    await db.orders.put(updatedOrder);
  }

  async deleteOrder(orderId: string) {
    try {
      await db.orders.delete(orderId);
      console.log('Order deleted successfully!');
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  }

  // Query orders by status (e.g., "pending")
  getOrdersByStatus(status: IOrderStatus): Observable<IOrder[]> {
    return from(liveQuery(() => db.orders.where('status').equals(status).toArray()));
  }

  // addOrders(orders: IOrder[]): Observable<void> {
  //   return defer(() => db.orders.bulkAdd(orders)).pipe(
  //     map(() => {}),
  //     catchError(error => {
  //       console.error('Failed to add orders:', error);
  //       throw error; // Re-throw the error for higher-level handling
  //     })
  //   );
  // }

}
