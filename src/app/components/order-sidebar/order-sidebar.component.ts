import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { calculateItemTotal, calculateOrderTotal, IOrder, IOrderItem } from '../../models/order';
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

      this.updateOrderTotal();
      // console.log(this._orderService.getOrders());
    }))
  }

  updateQuantity(id: string, change: number): void {
    const itemIndex = this.orderedItems.findIndex(ele => ele.id == id);
    if (itemIndex == -1) {
      return;
    }

    this.orderedItems[itemIndex].quantity += change;

    // Ensure quantity does not go below zero
    if (this.orderedItems[itemIndex].quantity < 1) {
      this.orderedItems[itemIndex].quantity = 1;
    }

    this.orderedItems[itemIndex].total = calculateItemTotal(this.orderedItems[itemIndex]);
    this.updateOrderTotal();
  }

  increaseQuantity(id: string): void {
    this.updateQuantity(id, 1);
  }

  decreaseQuantity(id: string): void {
    this.updateQuantity(id, -1);
  }


  updateOrderTotal(): void {
    this.OrderTotal = calculateOrderTotal(this.orderedItems);
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
