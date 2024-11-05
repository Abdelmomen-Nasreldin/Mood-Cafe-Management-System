import { Component, OnInit } from '@angular/core';
import { IOrder, IOrderItem } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OrderEditComponent } from "../../components/order-edit/order-edit.component";
import { Router } from '@angular/router';
import { PAGES } from '../../defines/defines';



@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, OrderEditComponent],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent implements OnInit {
  private destroy$ = new Subject<void>();

  allOrders : IOrder[]= [];

  constructor(private _orderService : OrderService, private _router : Router){}

  ngOnInit(): void {
    this._orderService.getAllOrders().pipe(takeUntil(this.destroy$)).subscribe((orders => {
      this.allOrders = orders;
    }))
  }

  editOrder(orderId : string){
    // navigate to the edit page with the id;
    // in the edit page get the order (id from the url) and update it
    this._router.navigate([PAGES.EDIT, orderId]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
