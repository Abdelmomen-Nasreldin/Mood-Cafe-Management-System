import { Injectable } from "@angular/core";
import { OrderService } from "./order.service";
import { BehaviorSubject, Observable } from "rxjs";
import { IOrder, IOrderStatus } from "../models/order";
import { OrderStatus, TRACKING_PERIODS } from "../defines/defines";

@Injectable({
  providedIn: "root",
})
export class OrderStatusService {
   pendingOrders$: Observable<IOrder[]>;
   paidOrders$: Observable<IOrder[]>;
   postponedOrders$: Observable<IOrder[]>;
   cancelledOrders$: Observable<IOrder[]>;
   paidPostponedOrders$: Observable<IOrder[]> = new BehaviorSubject<IOrder[]>([]);
   orderStatus = OrderStatus;
  constructor(private _orderService: OrderService) {
    this.pendingOrders$ = this._orderService.getOrdersByStatus(this.orderStatus.PENDING)
    this.paidOrders$ = this._orderService.getOrdersByStatus(this.orderStatus.PAID)
    this.postponedOrders$ = this._orderService.getOrdersByStatus(this.orderStatus.POSTPONED)
    this.cancelledOrders$ = this._orderService.getOrdersByStatus(this.orderStatus.CANCELLED)
    this.paidPostponedOrders$ = this._orderService.getOrdersByStatus(this.orderStatus.PAID_POSTPONED)
  }

  async changeOrderStatus(orderStatusAndId: { orderId: string; newStatus: IOrderStatus }) {
    const wantedOrder = await this._orderService.getOrderById(orderStatusAndId.orderId);

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
      wantedOrder.paidDate = new Date().getTime();
    }

    return this._orderService.updateOrder(wantedOrder);
  }

  // getPaidOrdersByDate(date: string) {
  //   this.paidOrders$ = this._orderService.getOrdersByPeriod(this.orderStatus.PAID, date)
  // }

}
