import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  IOrder,
  IOrderItem,
} from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { calculateItemTotal, calculateOrderTotal } from '../../utils';
import { TrackingService } from '../../services/tracking.service';
import { MenuService } from '../../services/menu.service';
import { OrderStatus } from '../../defines/defines';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-sidebar.component.html',
  styleUrl: './order-sidebar.component.scss',
})
export class OrderSidebarComponent implements OnInit, AfterViewInit , OnDestroy {
  private destroy$ = new Subject<void>();
  @Input() updatedOrder : IOrder | undefined;
  @Output() setOrder = new EventEmitter<IOrder>();
  @ViewChild('customerName') customerName! : ElementRef<HTMLInputElement>;

  userRole : string | null = null;

  orderedItems: IOrderItem[] = [];
  orders: IOrder[] = [];
  OrderTotal = 0;
  showOrderDetails = false;
  orderStatus = OrderStatus
  constructor(
    private _orderService: OrderService,
    private _trackingService: TrackingService,
    private _menuService:MenuService,
    private _authService: AuthService
  ) {
    this.userRole = this._authService.getCurrentUserRole();
  }

  ngOnInit(): void {
    this._orderService
      .getOrderedSidebarItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.orderedItems = items;
        this.updateOrderTotal();
      });
      this.orders = this._trackingService.getTodayOrdersFrom7AM(this.orders);
  }

  ngAfterViewInit(): void {
    if (this.updatedOrder) {
      this.customerName.nativeElement.value = this.updatedOrder.customerName || '';
    }
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

if(this.orderedItems[itemIndex]){
  this.orderedItems[itemIndex].total = calculateItemTotal(
    this.orderedItems[itemIndex]
  );
  this.updateOrderTotal();
}
  }

  increaseQuantity(id: string): void {
    this.updateQuantity(id, 1);
  }

  decreaseQuantity(id: string): void {
    this.updateQuantity(id, -1);
  }

  deleteItem(id: string) {
    let itemIndex =  this.orderedItems.findIndex((ele) => ele.id == id);
    this._menuService.setSelectedItems(this.orderedItems[itemIndex].itemEnglishName,false);
    this.orderedItems = this.orderedItems.filter((ele) => ele.id !== id);
    this._orderService.deleteOrderedSidebarItem(id);
    this.updateOrderTotal();
  }

  updateOrderTotal(): void {
    this.OrderTotal = calculateOrderTotal(this.orderedItems)
  }

  saveOrder() {
    if (this.updatedOrder) {
      this.updatedOrder.items = [...this.orderedItems];
      this.updatedOrder.total = this.OrderTotal;
      this.updatedOrder.customerName = this.customerName.nativeElement.value.trim() || this.updatedOrder.customerName;
      this.setOrder.emit(this.updatedOrder);
    } else {
      const order: IOrder = {
        orderId: uuidv4(),
        items: [...this.orderedItems],
        total: this.OrderTotal,
        date: new Date().toISOString(), // For old orders
        timestamp: new Date().getTime(), // Efficient queries
        paidDate: null,
        orderNo: this.orders.length + 1,
        customerName: this.customerName.nativeElement.value || '',
        status: this.orderStatus.PENDING,
        synced: false,
        lastUpdated: new Date().getTime(),
        createdBy: this.userRole ?? 'user',
      };
      this.setOrder.emit(order);
    }
    this._menuService.resetSelectedItems()
  }

  toggleOrderDetails() {
    this.showOrderDetails = !this.showOrderDetails;
  }

  closeOrderDetails() {
    this.showOrderDetails = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
