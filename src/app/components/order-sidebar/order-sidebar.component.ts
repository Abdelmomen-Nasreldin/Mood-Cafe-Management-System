import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  calculateItemTotal,
  calculateOrderTotal,
  IOrder,
  IOrderItem,
} from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-sidebar.component.html',
  styleUrl: './order-sidebar.component.scss',
})
export class OrderSidebarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @Input() updatedOrder : IOrder | undefined;
  @Output() setOrder = new EventEmitter<IOrder>();

  orderedItems: IOrderItem[] = [];
  OrderTotal = 0;
  constructor(private _orderService: OrderService) {}

  ngOnInit(): void {
    this._orderService
      .getOrderedSidebarItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.orderedItems = items;

        this.updateOrderTotal();
      });
  }

  updateQuantity(id: string, change: number): void {
    const itemIndex = this.orderedItems.findIndex((ele) => ele.id == id);
    if (itemIndex == -1) {
      return;
    }

    this.orderedItems[itemIndex].quantity += change;

    // Ensure quantity does not go below zero
    if (this.orderedItems[itemIndex].quantity < 1) {
      this.orderedItems[itemIndex].quantity = 1;
    }

    this.orderedItems[itemIndex].total = calculateItemTotal(
      this.orderedItems[itemIndex]
    );
    this.updateOrderTotal();
  }

  increaseQuantity(id: string): void {
    this.updateQuantity(id, 1);
  }

  decreaseQuantity(id: string): void {
    this.updateQuantity(id, -1);
  }

  deleteItem(id: string) {
    this.orderedItems = this.orderedItems.filter((ele) => ele.id !== id);
    this._orderService.deleteOrderedSidebarItem(id);
    this.updateOrderTotal();
  }

  updateOrderTotal(): void {
    this.OrderTotal = calculateOrderTotal(this.orderedItems);
  }

  saveOrder() {
    if (this.updatedOrder) {
      this.updatedOrder.items = [...this.orderedItems];
      this.updatedOrder.total = this.OrderTotal;
      this.updatedOrder.date = new Date();
      this.setOrder.emit(this.updatedOrder);
    } else {
      const order: IOrder = {
        orderId: `${+new Date()}-${Math.floor(Math.random() * 10000)}`,
        items: [...this.orderedItems],
        total: this.OrderTotal,
        date: new Date(),
      };
      this.setOrder.emit(order);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
