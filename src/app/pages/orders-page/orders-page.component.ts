import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IOrder } from '../../models/order';
import { debounceTime, of, Subject, switchMap, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';    // Import FormsModule for ngModel
import { Router } from '@angular/router';
import { PAGES } from '../../defines/defines';
import { TrackingService } from '../../services/tracking.service';
import { calculateOrderTotal, filterOrders, sortOrders } from '../../utils';
// import { OrderPrintComponent } from "../../components/order-print/order-print.component";
import { OrderService } from '../../services/order.service';
import { ModalService } from '../../services/modal.service';
// import { OrderBoxComponent } from "../../components/order-box/order-box.component";
import { OrdersWrapperComponent } from "../../components/orders-wrapper/orders-wrapper.component";
import { OrderStatusService } from '../../services/order-status.service';
@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule, OrdersWrapperComponent],
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
  printedOrder: IOrder | undefined;
  isLoading = false;
  private readonly customerNameInput$ = new Subject<string>();
  constructor(
    private _trackingService: TrackingService,
    private _orderService: OrderService,
    private _router: Router,
    private _modalService: ModalService,
    private _orderStatusService: OrderStatusService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.setupCustomerNameSearch();
  }

  loadOrders() {
    this.isLoading = true;

    this._orderStatusService.pendingOrders$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (orders) => {
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
      this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
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

  private setupCustomerNameSearch(): void {
    this.customerNameInput$.pipe(
      debounceTime(1000),
      switchMap((value) => {
        this.filteredOrders = filterOrders(this.allOrders, value);
        return of(value);
      }),
      takeUntil(this.destroy$) // <-- Important!
    )
    .subscribe({
      next: (value) => {
        console.log('Final emitted value after filtering:', value);
      },
      error: (error) => {
        console.error('Error during customer name search:', error);
      }
    });
  }

  searchByCustomerName(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.customerNameInput$.next(input.value);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
