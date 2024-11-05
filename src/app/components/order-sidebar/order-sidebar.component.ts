import { Component, OnDestroy, OnInit } from '@angular/core';
import { calculateOrderTotal, IOrder, IOrderItem } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-order-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './order-sidebar.component.html',
  styleUrl: './order-sidebar.component.scss'
})
export class OrderSidebarComponent implements OnInit, OnDestroy {
private destroy$ = new Subject<void>();

orderedItems : IOrderItem[] = []
OrderTotal = 0;
constructor(private _orderService : OrderService){}

  ngOnInit(): void {
    this._orderService.getOrderedSidebarItems().pipe(takeUntil(this.destroy$)).subscribe((items => {
      this.orderedItems = items;
      this.OrderTotal = calculateOrderTotal(this.orderedItems);
      // console.log(this._orderService.getOrders());
    }))
  }
  saveOrder(){
    const order : IOrder = {
      orderId: `${+new Date()}-${Math.floor(Math.random() * 10000)}`,
      items: [...this.orderedItems],
      total: this.OrderTotal,
      date: new Date()
    }
    // console.log(order);
    this._orderService.saveOrder(order);
    this._orderService.resetOrderedSidebarItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
