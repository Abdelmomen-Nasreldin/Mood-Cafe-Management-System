import { Component, OnInit } from '@angular/core';
import { IOrder, IOrderItem } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent implements OnInit {
  private destroy$ = new Subject<void>();

  allOrders : IOrder[]= [];

  constructor(private _orderService : OrderService){}

  ngOnInit(): void {
    this._orderService.getAllOrders().pipe(takeUntil(this.destroy$)).subscribe((orders => {
      this.allOrders = orders;
    }))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
