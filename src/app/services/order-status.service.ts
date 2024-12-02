import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrder } from '../models/order';
import { OrderStatus } from '../defines/defines';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  private _pendingOrders: BehaviorSubject<IOrder[]>;
  private _paidOrders : BehaviorSubject<IOrder[]>;
  private _postponedOrders : BehaviorSubject<IOrder[]>;
  private _cancelledOrders: BehaviorSubject<IOrder[]>;
  private orderStatus = OrderStatus;
  constructor(private _orderService: OrderService) {
    this._pendingOrders = new BehaviorSubject<IOrder[]>(this._orderService.getOrders().filter((order) => order.status === this.orderStatus.PENDING));
    this._paidOrders = new BehaviorSubject<IOrder[]>(this._orderService.getOrders().filter((order) => order.status === this.orderStatus.PAID));
    this._postponedOrders = new BehaviorSubject<IOrder[]>(this._orderService.getOrders().filter((order) => order.status === this.orderStatus.POSTPONED));
    this._cancelledOrders = new BehaviorSubject<IOrder[]>(this._orderService.getOrders().filter((order) => order.status === this.orderStatus.CANCELLED));
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

  

}
