import { Injectable } from "@angular/core";
import { OrderService } from "./order.service";
import { BehaviorSubject, Observable } from "rxjs";
import { IOrder, IOrderStatus } from "../models/order";
import { OrderStatus } from "../defines/defines";

@Injectable({
  providedIn: "root",
})
export class OrderStatusService {
  private _pendingOrders: BehaviorSubject<IOrder[]>;
  private _paidOrders: BehaviorSubject<IOrder[]>;
  private _postponedOrders: BehaviorSubject<IOrder[]>;
  private _cancelledOrders: BehaviorSubject<IOrder[]>;
  private _paidPostponedOrders: BehaviorSubject<IOrder[]> = new BehaviorSubject<IOrder[]>([]);
  private orderStatus = OrderStatus;
  constructor(private _orderService: OrderService) {
    this._pendingOrders = new BehaviorSubject<IOrder[]>(
      this._orderService.getOrders().filter((order) => order.status === this.orderStatus.PENDING)
    );
    this._paidOrders = new BehaviorSubject<IOrder[]>(
      this._orderService.getOrders().filter((order) => order.status === this.orderStatus.PAID)
    );
    this._postponedOrders = new BehaviorSubject<IOrder[]>(
      this._orderService.getOrders().filter((order) => order.status === this.orderStatus.POSTPONED)
    );
    this._cancelledOrders = new BehaviorSubject<IOrder[]>(
      this._orderService.getOrders().filter((order) => order.status === this.orderStatus.CANCELLED)
    );
  }

  public getPendingOrders(): Observable<IOrder[]> {
    return this._pendingOrders.asObservable();
  }

  public getPaidOrders(): Observable<IOrder[]> {
    return this._paidOrders.asObservable();
  }

  public getPostponedOrders(): Observable<IOrder[]> {
    return this._postponedOrders.asObservable();
  }

  public getCancelledOrders(): Observable<IOrder[]> {
    return this._cancelledOrders.asObservable();
  }

  public getPaidPostponedOrders(): Observable<IOrder[]> {
    return this._paidPostponedOrders.asObservable();
  }

  changeOrdersStatus() {
    this._pendingOrders.next(
      this._orderService.getOrders().filter((order) => order.status === this.orderStatus.PENDING)
    );
    this._paidOrders.next(
      this._orderService.getOrders().filter((order) => order.status === this.orderStatus.PAID || !order.status)
    );
    this._postponedOrders.next(
      this._orderService.getOrders().filter((order) => order.status === this.orderStatus.POSTPONED)
    );
    this._cancelledOrders.next(
      this._orderService.getOrders().filter((order) => order.status === this.orderStatus.CANCELLED)
    );
  }

  changeOrderStatus(orderStatusAndId: { orderId: string; newStatus: IOrderStatus }) {
    const wantedOrder = this._orderService.getOrderById(orderStatusAndId.orderId);

    if (!wantedOrder || wantedOrder.status === orderStatusAndId.newStatus || !orderStatusAndId.newStatus) {
      return;
    }

    if (wantedOrder.status === this.orderStatus.POSTPONED && orderStatusAndId.newStatus === this.orderStatus.PAID) {
      wantedOrder.status = this.orderStatus.PAID_POSTPONED;
    } else {
      wantedOrder.status = orderStatusAndId.newStatus;
    }
    // wantedOrder.status = orderStatusAndId.newStatus;
    if (orderStatusAndId.newStatus === this.orderStatus.PAID || orderStatusAndId.newStatus === this.orderStatus.PAID_POSTPONED) {
      wantedOrder.paidDate = new Date();
    }

    this._orderService.updateOrder(wantedOrder);
    this.changeOrdersStatus();
  }
}
