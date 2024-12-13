import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IOrder } from '../../models/order';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';    // Import FormsModule for ngModel
import { Router } from '@angular/router';
import { OrderStatus, PAGES } from '../../defines/defines';
import { TrackingService } from '../../services/tracking.service';
import { calculateOrderTotal, filterOrders, sortOrders } from '../../utils';
import { OrderPrintComponent } from "../../components/order-print/order-print.component";
import { OrderService } from '../../services/order.service';
import { ModalService } from '../../services/modal.service';
import { OrderBoxComponent } from "../../components/order-box/order-box.component";
import { OrdersWrapperComponent } from "../../components/orders-wrapper/orders-wrapper.component";
import { OrderStatusService } from '../../services/order-status.service';
@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule, OrderPrintComponent, OrderBoxComponent, OrdersWrapperComponent],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
})
export class OrdersPageComponent implements OnInit {
  private destroy$ = new Subject<void>();
  @ViewChild('customerNameInput') customerNameInput! : ElementRef<HTMLInputElement>

  allOrders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  total = 0;
  timeArr = Array.from({ length: 24 - 7 + 1 }, (_, i) => i + 7); // Dynamic array from 1 to 24
  selectedTime = 7;  // Default selected time
  selectedOrder = 'old'
  printedOrder : IOrder | undefined;
  constructor(
    private _trackingService: TrackingService,
    private _orderService: OrderService,
    private _router: Router,
    private _modalService: ModalService,
    private _orderStatusService: OrderStatusService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this._orderStatusService.pendingOrders$.pipe(takeUntil(this.destroy$)).subscribe(orders => {
      // const isCustomDay = period === TRACKING_PERIODS.CUSTOM_DAY;
      this.allOrders = this._trackingService.getTodayOrdersFromCustomTime(orders, this.selectedTime);
      // this.allOrders = this.allOrders.filter(order => order.status === OrderStatus.PENDING);
      this.total = calculateOrderTotal(this.allOrders);
      this.filteredOrders = [...this.allOrders];
      // this.calcQuantities();
      this.sortOrders();
      if (this.customerNameInput) {
        this.customerNameInput.nativeElement.value = "";
      }
    });
  }
  onTimeChange(){
    this.loadOrders();
  }

  sortOrders() {
    this.filteredOrders = sortOrders(this.filteredOrders, this.selectedOrder);
  }

  onOrderChange(){
    this.sortOrders();
  }

  editOrder(orderId: string) {
    // navigate to the edit page with the id;
    // in the edit page get the order (id from the url) and update it
    this._router.navigate([PAGES.EDIT, orderId]);
  }

  printReceipt(orderId : string){
    // open modal that has the order-print component
    this._orderService.getOrderById(orderId).then((order) => {
      this.printedOrder = order
      this._modalService.openModal();
    });
  }

  searchByCustomerName(event: Event) {
    const input = event.target as HTMLInputElement; // Type assertion
    this.filteredOrders = filterOrders(this.allOrders, input.value);
    // this.calcQuantities();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
